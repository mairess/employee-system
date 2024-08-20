package org.maires.employee.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.maires.employee.entity.Employee;
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

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@DisplayName("Employee integration tests")
public class EmployeeIntegrationTest {

  @Container
  public static PostgreSQLContainer POSTGRES_CONTAINER = new PostgreSQLContainer<>(
      "postgres").withDatabaseName("employee-db");

  @Autowired
  EmployeeRepository employeeRepository;

  @Autowired
  UserRepository userRepository;

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

    User admin = new User("Gilmar de Castro", "gilmar", "gilmar@example.com", "123456", Role.ADMIN);
    userRepository.save(admin);
    tokenAdmin = tokenService.generateToken(admin.getUsername());
  }

  @Test
  @DisplayName("Retrieval all employees")
  public void testRetrievalAll() throws Exception {

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        LocalDate.now(),
        "77912345678"
    );

    Employee Gore = new Employee(
        "https://robohash.org/employee170",
        "Martin Gore",
        "Frontend",
        LocalDate.now(),
        "77987654321"
    );
    Employee Fletcher = new Employee(
        "https://robohash.org/employee170",
        "Andrew Fletcher",
        "UX Designer",
        LocalDate.now(),
        "77987653210"
    );

    employeeRepository.save(Gahan);
    employeeRepository.save(Gore);
    employeeRepository.save(Fletcher);

    String employeeUrl = "/employees";

    mockMvc.perform(get(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(3))
        .andExpect(jsonPath("$[0].id").exists())
        .andExpect(jsonPath("$[0].fullName").value("David Gahan"));
  }

  @Test
  @DisplayName("Retrieval employee by id")
  public void testRetrievalById() throws Exception {

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        LocalDate.now(),
        "77912345678"
    );

    employeeRepository.save(Gahan);

    String employeeUrl = "/employees/%s".formatted(Gahan.getId());

    mockMvc.perform(get(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.fullName").value("David Gahan"));
  }

  @Test
  @DisplayName("Not found exception")
  public void testNotFoundExceptionById() throws Exception {

    String employeeUrl = "/employees/666";

    mockMvc.perform(get(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Employee not found with id 666!"));
  }

  @Test
  @DisplayName("Create employee")
  public void testCreate() throws Exception {

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        LocalDate.now(),
        "77912345678"
    );

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    String newEmployeeAsString = objectMapper.writeValueAsString(Gahan);

    String employeeUrl = "/employees";

    mockMvc.perform(post(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin)
            .contentType(MediaType.APPLICATION_JSON)
            .content(newEmployeeAsString))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.fullName").value("David Gahan"));
  }

  @Test
  @DisplayName("Update employee")
  public void testUpdate() throws Exception {

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        LocalDate.now(),
        "77912345678"
    );

    employeeRepository.save(Gahan);

    Gahan.setFullName("David Gahan Mirosmar Juliano de Almeida");
    Gahan.setPosition("Fullstack");

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    String updatedEmployeeAsString = objectMapper.writeValueAsString(Gahan);

    String employeeUrl = "/employees/%s".formatted(Gahan.getId());

    mockMvc.perform(put(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin)
            .contentType(MediaType.APPLICATION_JSON)
            .content(updatedEmployeeAsString))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.fullName").value("David Gahan Mirosmar Juliano de Almeida"))
        .andExpect(jsonPath("$.position").value("Fullstack"));
  }

  @Test
  @DisplayName("Delete employee")
  public void testDelete() throws Exception {

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        LocalDate.now(),
        "77912345678"
    );

    employeeRepository.save(Gahan);

    String employeeUrl = "/employees/%s".formatted(Gahan.getId());

    mockMvc.perform(delete(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isNoContent());
  }

}