package org.maires.employee.integration;

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
import org.maires.employee.service.PasswordResetService;
import org.maires.employee.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@DisplayName("Password reset integration tests")
public class PasswordResetIntegrationTest {

  @Container
  public static PostgreSQLContainer POSTGRES_CONTAINER = new PostgreSQLContainer("postgres")
      .withDatabaseName("employee-db");

  @Autowired
  UserRepository userRepository;

  @MockBean
  PasswordResetService passwordResetService;

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

  @BeforeEach
  public void cleanUp() {
    userRepository.deleteAll();

    User admin = new User("Evangevaldo de Lima Soares", "vange", "vange@example.com", "123456",
        Role.ADMIN);
    userAdmin = userRepository.save(admin);
  }

  @Test
  @DisplayName("Request password reset")
  public void testPasswordRequest() throws Exception {

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
  @DisplayName("Reset password")
  public void testResetPassword() throws Exception {

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

}