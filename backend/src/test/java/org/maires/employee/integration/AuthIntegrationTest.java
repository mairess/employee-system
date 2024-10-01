package org.maires.employee.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.maires.employee.entity.User;
import org.maires.employee.repository.DenyListRepository;
import org.maires.employee.repository.EmployeeRepository;
import org.maires.employee.repository.UserRepository;
import org.maires.employee.security.Role;
import org.maires.employee.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@DisplayName("Auth integration tests")
public class AuthIntegrationTest {

  @Container
  public static PostgreSQLContainer POSTGRES_CONTAINER = new PostgreSQLContainer<>(
      "postgres").withDatabaseName("employee-db");

  @Autowired
  EmployeeRepository employeeRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  DenyListRepository denyListRepository;

  @Autowired
  MockMvc mockMvc;
  String tokenAdmin;
  @Autowired
  private TokenService tokenService;

  @DynamicPropertySource
  public static void overrideProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", POSTGRES_CONTAINER::getJdbcUrl);
    registry.add("spring.datasource.username", POSTGRES_CONTAINER::getUsername);
    registry.add("spring.datasource.password", POSTGRES_CONTAINER::getPassword);
  }

  @BeforeEach
  public void cleanUp() {
    userRepository.deleteAll();
    employeeRepository.deleteAll();
    denyListRepository.deleteAll();

    String hashedPassword = new BCryptPasswordEncoder().encode("123456");

    User admin = new User("https://robohash.org/179.106.168.54.png", "Gilmar de Castro", "gilmar",
        "gilmar@example.com", hashedPassword,
        Role.ADMIN);
    userRepository.save(admin);
    tokenAdmin = tokenService.generateToken(admin.getUsername());
  }

  @Test
  @DisplayName("Login")
  public void testLogin() throws Exception {

    String loginPayload = """
        {
            "username": "gilmar",
            "password": "123456"
        }
        """;

    String authUrl = "/auth/login";

    mockMvc.perform(post(authUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(loginPayload))
        .andExpect(status().isOk());
  }

  @Test
  @DisplayName("Logout")
  public void testLogout() throws Exception {

    String authUrl = "/auth/logout";

    mockMvc.perform(post(authUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Logout successfully!"));
  }


  @Test
  @DisplayName("Invalid credentials")
  public void testInvalidCredentials() throws Exception {

    String loginPayload = """
        {
            "username": "gilvan",
            "password": "999999"
        }
        """;

    String authUrl = "/auth/login";

    mockMvc.perform(post(authUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(loginPayload))
        .andExpect(status().isUnauthorized());
  }
}