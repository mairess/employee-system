package org.maires.employee.integration;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.maires.employee.controller.dto.PasswordResetDto;
import org.maires.employee.controller.dto.PasswordResetRequestDto;
import org.maires.employee.entity.User;
import org.maires.employee.repository.UserRepository;
import org.maires.employee.security.Role;
import org.maires.employee.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.kafka.KafkaContainer;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@DisplayName("Password reset integration tests")
public class PasswordResetIntegrationTest {

  @Container
  public static PostgreSQLContainer POSTGRES_CONTAINER = new PostgreSQLContainer("postgres")
      .withDatabaseName("employee-db");

  @Container
  public static KafkaContainer KAFKA_CONTAINER = new KafkaContainer("apache/kafka:3.8.0");

  @Autowired
  UserRepository userRepository;

  @Autowired
  MockMvc mockMvc;
  @Autowired
  private TokenService tokenService;
  private User userAdmin;

  @DynamicPropertySource
  public static void overrideProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", POSTGRES_CONTAINER::getJdbcUrl);
    registry.add("spring.datasource.username", POSTGRES_CONTAINER::getUsername);
    registry.add("spring.datasource.password", POSTGRES_CONTAINER::getPassword);
  }

  @DynamicPropertySource
  public static void overrideKafkaProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.kafka.bootstrap-servers", KAFKA_CONTAINER::getBootstrapServers);
  }

  @BeforeEach
  public void cleanUp() {
    userRepository.deleteAll();

    User admin = new User("https://robohash.org/179.106.168.35.png", "Evangevaldo de Lima Soares",
        "vange", "vange@example.com", "123456",
        Role.ADMIN);
    userAdmin = userRepository.save(admin);
  }

  @Test
  @DisplayName("Update password")
  public void testUpdatePassword() throws Exception {

    PasswordResetDto passwordResetDto = new PasswordResetDto("segredo123");

    String token = tokenService.generateToken(userAdmin.getEmail());

    ObjectMapper objectMapper = new ObjectMapper();
    String newPassword = objectMapper.writeValueAsString(passwordResetDto);

    String passwordUrl = "/password/reset?token=%s".formatted(token);

    mockMvc.perform(post(passwordUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newPassword))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Password successfully changed!"));

  }

  @Test
  @DisplayName("User not found on update password")
  public void testUserNotFoundExceptionOnUpdatePassword() throws Exception {

    PasswordResetDto passwordResetDto = new PasswordResetDto("segredo123");

    String token = tokenService.generateToken("issoNonEcziste@example.com");

    ObjectMapper objectMapper = new ObjectMapper();
    String newPassword = objectMapper.writeValueAsString(passwordResetDto);

    String passwordUrl = "/password/reset?token=%s".formatted(token);

    mockMvc.perform(post(passwordUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newPassword))
        .andExpect(status().isNotFound())
        .andExpect(
            jsonPath("$.message").value("User not found with email issoNonEcziste@example.com!"));

  }

  @Test
  @DisplayName("Token signature exception")
  public void testTokenSignatureVerificationException() throws Exception {

    PasswordResetDto passwordResetDto = new PasswordResetDto("segredo123");

    String token = tokenService.generateToken(userAdmin.getEmail());

    String invalidToken = token + "a";

    ObjectMapper objectMapper = new ObjectMapper();
    String newPassword = objectMapper.writeValueAsString(passwordResetDto);

    String passwordUrl = "/password/reset?token=%s".formatted(invalidToken);

    mockMvc.perform(post(passwordUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newPassword))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.message").value(
            "The Token's Signature resulted invalid when verified using the Algorithm: HmacSHA256"));

  }

  @Test
  @DisplayName("Empty body exception")
  public void testEmptyBodyException() throws Exception {

    String token = tokenService.generateToken(userAdmin.getEmail());

    String passwordUrl = "/password/reset?token=%s".formatted(token);

    mockMvc.perform(post(passwordUrl)
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isInternalServerError())
        .andExpect(
            jsonPath("$.message").value(containsString("Required request body is missing:")));

  }

  @Test
  @DisplayName("Expired token exception")
  public void testExpiredTokenException() throws Exception {

    String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWlyZXN0QGdtYWlsLmNvbSIsImV4cCI6MTcyNDU4MjY2NX0.sP_5v6CSYR9bnaIXGjA4qYyZSPfit5rIiIeLEfssERA";

    PasswordResetDto passwordResetDto = new PasswordResetDto("segredo123");

    ObjectMapper objectMapper = new ObjectMapper();
    String newPassword = objectMapper.writeValueAsString(passwordResetDto);

    String passwordUrl = "/password/reset?token=%s".formatted(token);

    mockMvc.perform(post(passwordUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newPassword))
        .andExpect(status().isInternalServerError())
        .andExpect(
            jsonPath("$.message").value(
                containsString("The Token has expired on 2024-08-25T10:44:25Z.")));

  }

  @Test
  @DisplayName("Request password reset")
  public void testPasswordRequest() throws Exception {

    PasswordResetRequestDto passwordResetRequestDto = new PasswordResetRequestDto(
        userAdmin.getEmail());

    ObjectMapper objectMapper = new ObjectMapper();
    String newPasswordRequest = objectMapper.writeValueAsString(passwordResetRequestDto);

    String passwordUrl = "/password/reset-request";

    mockMvc.perform(post(passwordUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newPasswordRequest))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Password reset link sent to your email!"));

  }

  @Test
  @DisplayName("User not found on request password reset")
  public void testUserNotFoundExceptionOnPasswordRequest() throws Exception {

    PasswordResetRequestDto passwordResetRequestDto = new PasswordResetRequestDto(
        "issoNonEcziste@example.com");

    ObjectMapper objectMapper = new ObjectMapper();
    String newPasswordRequest = objectMapper.writeValueAsString(passwordResetRequestDto);

    String passwordUrl = "/password/reset-request";

    mockMvc.perform(post(passwordUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newPasswordRequest))
        .andExpect(status().isNotFound())
        .andExpect(
            jsonPath("$.message").value("User not found with email issoNonEcziste@example.com!"));

  }

}