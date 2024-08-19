package org.maires.employee.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.maires.employee.entity.Employee;
import org.maires.employee.repository.EmployeeRepository;
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
  MockMvc mockMvc;

  @DynamicPropertySource
  public static void overrideProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", POSTGRES_CONTAINER::getJdbcUrl);
    registry.add("spring.datasource.username", POSTGRES_CONTAINER::getUsername);
    registry.add("spring.datasource.password", POSTGRES_CONTAINER::getPassword);
  }

  @BeforeEach
  public void cleanUp() {
    employeeRepository.deleteAll();
  }

  @Test
  @DisplayName("Retrieval all employees")
  public void testRetrievalAll() throws Exception {

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        LocalDateTime.now(),
        "5577912345678"
    );

    Employee Gore = new Employee(
        "https://robohash.org/employee170",
        "Martin Gore",
        "Frontend",
        LocalDateTime.now(),
        "5577987654321"
    );
    Employee Fletcher = new Employee(
        "https://robohash.org/employee170",
        "Andrew Fletcher",
        "UX Designer",
        LocalDateTime.now(),
        "5577987653210"
    );

    employeeRepository.save(Gahan);
    employeeRepository.save(Gore);
    employeeRepository.save(Fletcher);

    String employeeUrl = "/employees";

    mockMvc.perform(get(employeeUrl))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(3))
        .andExpect(jsonPath("$[0].id").exists())
        .andExpect(jsonPath("$[0].name").value("David Gahan"));
  }

  @Test
  @DisplayName("Retrieval employee by id")
  public void testRetrievalById() throws Exception {

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        LocalDateTime.now(),
        "5577912345678"
    );

    employeeRepository.save(Gahan);

    String employeeUrl = "/employees/%s".formatted(Gahan.getId());

    mockMvc.perform(get(employeeUrl))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.name").value("David Gahan"));
  }

  @Test
  @DisplayName("Create employee")
  public void testCreate() throws Exception {

    LocalDateTime now = LocalDateTime.now();

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        now,
        "5577912345678"
    );

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    String newEmployeeJson = objectMapper.writeValueAsString(Gahan);

    System.out.println("newEmployeeJson: " + newEmployeeJson);

    String employeeUrl = "/employees";

    mockMvc.perform(post(employeeUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .content(newEmployeeJson))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.name").value("David Gahan"));
  }

}