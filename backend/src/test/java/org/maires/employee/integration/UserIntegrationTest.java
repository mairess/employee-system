package org.maires.employee.integration;

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
import org.maires.employee.repository.EmployeeRepository;
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
      .withDatabaseName("wnetdb");

  @Autowired
  EmployeeRepository employeeRepository;
  @Autowired
  UserRepository userRepository;

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

    User admin = new User("Evangevaldo de Lima Soares", "vange", "vange@example.com", "123456",
        Role.ADMIN);
    userAdmin = userRepository.save(admin);
    tokenAdmin = tokenService.generateToken(userAdmin.getUsername());
  }

  @Test
  @DisplayName("Retrieval all users")
  public void testRetrievalAll() throws Exception {
    User Ermenegildo = new User("Ermenegildo Fagundes", "gildo", "gildo@example.com", "123456",
        Role.USER);
    User Gilmar = new User("Gilmar de Castro", "gilmar", "gilmar@example.com", "123456", Role.USER);

    userRepository.save(Ermenegildo);
    userRepository.save(Gilmar);
    String userUrl = "/users";

    mockMvc.perform(get(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(3))
        .andExpect(jsonPath("$[0].id").exists())
        .andExpect(jsonPath("$[0].username").value("vange"))
        .andExpect(jsonPath("$[1].id").exists())
        .andExpect(jsonPath("$[1].username").value("gildo"))
        .andExpect(jsonPath("$[2].id").exists())
        .andExpect(jsonPath("$[2].username").value("gilmar"));
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

    User newUser = new User("Gilmar de Castro", "gilmar", "gilmar@example.com", "123456",
        Role.USER);

    ObjectMapper objectMapper = new ObjectMapper();
    String newUserJson = objectMapper.writeValueAsString(newUser);
    String userUrl = "/users";

    mockMvc.perform(post(userUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newUserJson))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.username").value("gilmar"))
        .andExpect(jsonPath("$.role").value("USER"));
  }

  @Test
  @DisplayName("Email in use exception")
  public void testEmailAlreadyInUse() throws Exception {

    User newUser = new User("Vange Carlos Aguiar", "vange", "vange@example.com", "123456",
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

    User newUser = new User("Vange Carlos Aguiar", "vange", "vangecarlos@example.com", "123456",
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
  @DisplayName("Update user")
  public void testUpdate() throws Exception {

    User updatedUser = new User("Gilmar de Castro", "gilmar", "gilmar@example.com", "123456",
        Role.USER);

    ObjectMapper objectMapper = new ObjectMapper();
    String updatedUserJson = objectMapper.writeValueAsString(updatedUser);
    String userUrl = "/users/%s".formatted(userAdmin.getId());

    mockMvc.perform(put(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin)
            .contentType(MediaType.APPLICATION_JSON)
            .content(updatedUserJson))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value("gilmar"))
        .andExpect(jsonPath("$.role").value("USER"));
  }

  @Test
  @DisplayName("Delete user")
  public void testDelete() throws Exception {

    User userToDelete = new User("Gilmar de Castro", "gilmar", "gilmar@example.com", "123456",
        Role.USER);

    userRepository.save(userToDelete);
    String userUrl = "/users/%s".formatted(userToDelete.getId());

    mockMvc.perform(delete(userUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isNoContent());
  }


}