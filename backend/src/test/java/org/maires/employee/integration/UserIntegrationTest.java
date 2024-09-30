package org.maires.employee.integration;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.maires.employee.entity.User;
import org.maires.employee.repository.DenyListRepository;
import org.maires.employee.repository.UserRepository;
import org.maires.employee.security.Role;
import org.maires.employee.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@DisplayName("User integration tests")
public class UserIntegrationTest {

  @Container
  public static PostgreSQLContainer POSTGRES_CONTAINER = new PostgreSQLContainer("postgres")
      .withDatabaseName("employee-db");

  @Autowired
  UserRepository userRepository;

  @Autowired
  DenyListRepository denyListRepository;

  @Autowired
  MockMvc mockMvc;
  @Autowired
  private TokenService tokenService;
  private User userAdmin;
  private String tokenAdmin;


  @DynamicPropertySource
  public static void overrideProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", POSTGRES_CONTAINER::getJdbcUrl);
    registry.add("spring.datasource.username", POSTGRES_CONTAINER::getUsername);
    registry.add("spring.datasource.password", POSTGRES_CONTAINER::getPassword);
  }

  @BeforeEach
  public void cleanUp() {
    userRepository.deleteAll();
    denyListRepository.deleteAll();

    User admin = new User("https://robohash.org/179.106.168.58.png", "Evangevaldo de Lima Soares",
        "vange", "vange@example.com", "123456",
        Role.ADMIN);
    userAdmin = userRepository.save(admin);
    tokenAdmin = tokenService.generateToken(userAdmin.getUsername());
  }

  @Test
  @DisplayName("Retrieval all users")
  public void testRetrievalAll() throws Exception {
    User Ermenegildo = new User("https://robohash.org/179.106.168.38.png", "Ermenegildo Fagundes",
        "gildo", "gildo@example.com", "123456",
        Role.USER);
    User Gilmar = new User("https://robohash.org/179.106.168.48.png", "Gilmar de Castro", "gilmar",
        "gilmar@example.com", "123456", Role.USER);

    userRepository.save(Ermenegildo);
    userRepository.save(Gilmar);
    String userUrl = "/users";

    mockMvc.perform(get(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isMap())
        .andExpect(jsonPath("$.pagination").isMap())
        .andExpect(jsonPath("$.pagination.length()").value(4))
        .andExpect(jsonPath("$.pagination.currentPage").value(0))
        .andExpect(jsonPath("$.pagination.totalItems").value(3))
        .andExpect(jsonPath("$.pagination.pageSize").value(20))
        .andExpect(jsonPath("$.pagination.totalPages").value(1))
        .andExpect(jsonPath("$.users").isArray())
        .andExpect(jsonPath("$.users.length()").value(3))
        .andExpect(jsonPath("$.users[1].id").exists())
        .andExpect(jsonPath("$.users[1].photo").value("https://robohash.org/179.106.168.38.png"))
        .andExpect(jsonPath("$.users[1].fullName").value("Ermenegildo Fagundes"))
        .andExpect(jsonPath("$.users[1].username").value("gildo"))
        .andExpect(jsonPath("$.users[1].email").value("gildo@example.com"))
        .andExpect(jsonPath("$.users[1].role").value("USER"))
        .andExpect(jsonPath("$.users[2].id").exists())
        .andExpect(jsonPath("$.users[2].photo").value("https://robohash.org/179.106.168.48.png"))
        .andExpect(jsonPath("$.users[2].fullName").value("Gilmar de Castro"))
        .andExpect(jsonPath("$.users[2].username").value("gilmar"))
        .andExpect(jsonPath("$.users[2].email").value("gilmar@example.com"))
        .andExpect(jsonPath("$.users[2].role").value("USER"));
  }

  @Test
  @DisplayName("Redirects to page forbidden")
  public void testRedirectionToForbiddenPage() throws Exception {
    User Ermenegildo = new User("https://robohash.org/179.106.168.38.png", "Ermenegildo Fagundes",
        "gildo", "gildo@example.com", "123456",
        Role.USER);
    User Gilmar = new User("https://robohash.org/179.106.168.48.png", "Gilmar de Castro", "gilmar",
        "gilmar@example.com", "123456", Role.USER);

    User notAdminUser = new User("https://robohash.org/179877.106.168.58.png",
        "Not Admin Silva",
        "notAdmin", "notAdminSilva@example.com", "123456",
        Role.USER);

    User userNotAdmin = userRepository.save(notAdminUser);

    String tokenNotAdmin = tokenService.generateToken(userNotAdmin.getUsername());

    userRepository.save(Ermenegildo);
    userRepository.save(Gilmar);
    String userUrl = "/users";

    mockMvc.perform(get(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenNotAdmin))
        .andExpect(status().isForbidden())
        .andExpect(jsonPath("$.message").value("Access Denied"));
  }

  @Test
  @DisplayName("Retrieval users by search term")
  public void testRetrievalBySearchTerm() throws Exception {
    User Ermenegildo = new User("https://robohash.org/179.106.168.38.png", "Ermenegildo Fagundes",
        "gildo", "gildo@example.com", "123456",
        Role.USER);

    User Gilmar = new User("https://robohash.org/179.106.168.48.png", "Gilmar de Castro", "gilmar",
        "gilmar@example.com", "123456", Role.USER);

    User GilmarDoBar = new User("https://robohash.org/181.106.168.48.png", "Gilmar do Bar",
        "gilmarBar",
        "gilmarbar@example.com", "123456", Role.USER);

    userRepository.save(Ermenegildo);
    userRepository.save(Gilmar);
    userRepository.save(GilmarDoBar);
    String userUrl = "/users?term=Gilmar";

    mockMvc.perform(get(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isMap())
        .andExpect(jsonPath("$.pagination").isMap())
        .andExpect(jsonPath("$.pagination.length()").value(4))
        .andExpect(jsonPath("$.pagination.currentPage").value(0))
        .andExpect(jsonPath("$.pagination.totalItems").value(2))
        .andExpect(jsonPath("$.pagination.pageSize").value(20))
        .andExpect(jsonPath("$.pagination.totalPages").value(1))
        .andExpect(jsonPath("$.users").isArray())
        .andExpect(jsonPath("$.users.length()").value(2))
        .andExpect(jsonPath("$.users[0].id").exists())
        .andExpect(jsonPath("$.users[0].photo").value("https://robohash.org/179.106.168.48.png"))
        .andExpect(jsonPath("$.users[0].fullName").value("Gilmar de Castro"))
        .andExpect(jsonPath("$.users[0].username").value("gilmar"))
        .andExpect(jsonPath("$.users[0].email").value("gilmar@example.com"))
        .andExpect(jsonPath("$.users[0].role").value("USER"))
        .andExpect(jsonPath("$.users[1].id").exists())
        .andExpect(jsonPath("$.users[1].photo").value("https://robohash.org/181.106.168.48.png"))
        .andExpect(jsonPath("$.users[1].fullName").value("Gilmar do Bar"))
        .andExpect(jsonPath("$.users[1].username").value("gilmarBar"))
        .andExpect(jsonPath("$.users[1].email").value("gilmarbar@example.com"))
        .andExpect(jsonPath("$.users[1].role").value("USER"));
  }

  @Test
  @DisplayName("Retrieval user by id")
  public void testRetrievalById() throws Exception {

    String userUrl = "/users/%s".formatted(userAdmin.getId());

    mockMvc.perform(get(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value("vange"))
        .andExpect(jsonPath("$.role").value("ADMIN"));
  }

  @Test
  @DisplayName("Not found exception")
  public void testNotFoundExceptionById() throws Exception {

    String userUrl = "/users/666";

    mockMvc.perform(get(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("User not found with id 666!"));
  }

  @Test
  @DisplayName("Retrieval user by username")
  public void testRetrievalByUsername() throws Exception {

    String userUrl = "/users/find?username=%s".formatted("vange");

    mockMvc.perform(get(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value("vange"))
        .andExpect(jsonPath("$.role").value("ADMIN"));
  }

  @Test
  @DisplayName("Not found exception by username")
  public void testNotFoundExceptionByUsername() throws Exception {

    String userUrl = "/users/find?username=doesNotExists";

    mockMvc.perform(get(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("User not found with id doesNotExists!"));
  }

  @Test
  @DisplayName("Create user")
  public void testCreate() throws Exception {

    User newUser = new User("https://robohash.org/179.106.168.88.png", "Gilmar de Castro", "gilmar",
        "gilmar@example.com", "123456",
        Role.USER);

    ObjectMapper objectMapper = new ObjectMapper();
    String newUserJson = objectMapper.writeValueAsString(newUser);
    String userUrl = "/users";

    mockMvc.perform(post(userUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newUserJson))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.photo").value("https://robohash.org/179.106.168.88.png"))
        .andExpect(jsonPath("$.fullName").value("Gilmar de Castro"))
        .andExpect(jsonPath("$.username").value("gilmar"))
        .andExpect(jsonPath("$.role").value("USER"));
  }

  @Test
  @DisplayName("Email in use exception")
  public void testEmailAlreadyInUse() throws Exception {

    User newUser = new User("https://robohash.org/179.106.168.18.png", "Vange Carlos Aguiar",
        "vange", "vange@example.com", "123456",
        Role.ADMIN);

    ObjectMapper objectMapper = new ObjectMapper();
    String newUserJson = objectMapper.writeValueAsString(newUser);
    String userUrl = "/users";

    mockMvc.perform(post(userUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newUserJson))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Email already in use!"));
  }

  @Test
  @DisplayName("Username in use exception")
  public void testUsernameAlreadyInUse() throws Exception {

    User newUser = new User("https://robohash.org/179.106.168.32.png", "Vange Carlos Aguiar",
        "vange", "vangecarlos@example.com", "123456",
        Role.ADMIN);

    ObjectMapper objectMapper = new ObjectMapper();
    String newUserJson = objectMapper.writeValueAsString(newUser);
    String userUrl = "/users";

    mockMvc.perform(post(userUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newUserJson))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Username"));
  }

  @Test
  @DisplayName("User validation errors")
  public void testUserValidationErrors() throws Exception {

    String invalidUserJson = """
        {
            "photo": "invalid url",
            "WrongKey": "David Gahan",
            "WrongKey": "david",
            "WrongKey": "david@example.com",
            "WrongKey": "1234567890",
            "WrongKey": "ADMIN"
        }
        """;

    String userUrl = "/users";

    ResultActions resultActions = mockMvc.perform(post(userUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(invalidUserJson))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").isArray());

    String[] expectedMessages = {
        "Invalid URL format",
        "Username cannot be blank!",
        "Username cannot be null!",
        "Role cannot be null! Try ADMIN or USER",
        "Role must be ADMIN or USER",
        "Password cannot be null!",
        "Password cannot be blank!",
        "Full name cannot be blank!",
        "Full name cannot be null!",
        "Email cannot be null!",
        "Email cannot be blank!"
    };

    for (String expectedMessage : expectedMessages) {
      resultActions.andExpect(jsonPath("$.message").value(hasItem(expectedMessage)));
    }
  }

  @Test
  @DisplayName("Update user")
  public void testUpdate() throws Exception {

    User admin = new User("https://robohash.org/179.106.168.58.png", "Evangevaldo de Lima Soares",
        "vange", "vange@example.com", "123456",
        Role.ADMIN);

    User updatedUser = new User("https://robohash.org/179.106.168.66.png", "Gilmar de Castro",
        "gilmar", "gilmar@example.com", "123456",
        Role.USER);

    ObjectMapper objectMapper = new ObjectMapper();
    String updatedUserJson = objectMapper.writeValueAsString(updatedUser);
    String userUrl = "/users/%s".formatted(userAdmin.getId());

    mockMvc.perform(put(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin)
            .contentType(MediaType.APPLICATION_JSON)
            .content(updatedUserJson))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.photo").value("https://robohash.org/179.106.168.66.png"))
        .andExpect(jsonPath("$.fullName").value("Gilmar de Castro"))
        .andExpect(jsonPath("$.username").value("gilmar"))
        .andExpect(jsonPath("$.email").value("gilmar@example.com"))
        .andExpect(jsonPath("$.role").value("USER"));
  }

  @Test
  @DisplayName("Delete user")
  public void testDelete() throws Exception {

    User userToDelete = new User("https://robohash.org/179.106.168.22.png", "Gilmar de Castro",
        "gilmar", "gilmar@example.com", "123456",
        Role.USER);

    userRepository.save(userToDelete);
    String userUrl = "/users/%s".formatted(userToDelete.getId());

    mockMvc.perform(delete(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isNoContent());
  }

  @Test
  @DisplayName("Token denied")
  public void testTokenDenied() throws Exception {

    String authUrl = "/auth/logout";

    mockMvc.perform(post(authUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Logout successfully!"));

    String userUrl = "/users";

    mockMvc.perform(post(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.message").value("Token is denied!"));


  }


}