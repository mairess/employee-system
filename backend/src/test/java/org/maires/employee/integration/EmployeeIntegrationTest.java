package org.maires.employee.integration;

import static org.hamcrest.Matchers.hasItem;
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
import org.springframework.test.web.servlet.ResultActions;
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

    User admin = new User("https://robohash.org/179.106.168.19.png", "Gilmar de Castro", "gilmar",
        "gilmar@example.com", "123456", Role.ADMIN);
    userRepository.save(admin);
    tokenAdmin = tokenService.generateToken(admin.getUsername());
  }

  @Test
  @DisplayName("Retrieval all employees")
  public void testRetrievalAll() throws Exception {

    LocalDate admissionDate = LocalDate.now();

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        admissionDate,
        "77912345678"
    );

    Employee Gore = new Employee(
        "https://robohash.org/employee170",
        "Martin Gore",
        "Frontend",
        admissionDate,
        "77987654321"
    );

    Employee Fletcher = new Employee(
        "https://robohash.org/employee170",
        "Andrew Fletcher",
        "UX Designer",
        admissionDate,
        "77987653210"
    );

    employeeRepository.save(Gahan);
    employeeRepository.save(Gore);
    employeeRepository.save(Fletcher);

    String employeeUrl = "/employees";

    mockMvc.perform(get(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isMap())
        .andExpect(jsonPath("$.pagination").isMap())
        .andExpect(jsonPath("$.pagination.length()").value(4))
        .andExpect(jsonPath("$.pagination.currentPage").value(0))
        .andExpect(jsonPath("$.pagination.totalItems").value(3))
        .andExpect(jsonPath("$.pagination.pageSize").value(20))
        .andExpect(jsonPath("$.pagination.totalPages").value(1))
        .andExpect(jsonPath("$.employees").isArray())
        .andExpect(jsonPath("$.employees.length()").value(3))
        .andExpect(jsonPath("$.employees[0].id").exists())
        .andExpect(jsonPath("$.employees[0].photo").value("https://robohash.org/employee170"))
        .andExpect(jsonPath("$.employees[0].fullName").value("David Gahan"))
        .andExpect(jsonPath("$.employees[0].position").value("Backend"))
        .andExpect(jsonPath("$.employees[0].admission").value(admissionDate.toString()))
        .andExpect(jsonPath("$.employees[0].phone").value("77912345678"))
        .andExpect(jsonPath("$.employees[1].id").exists())
        .andExpect(jsonPath("$.employees[1].photo").value("https://robohash.org/employee170"))
        .andExpect(jsonPath("$.employees[1].fullName").value("Martin Gore"))
        .andExpect(jsonPath("$.employees[1].position").value("Frontend"))
        .andExpect(jsonPath("$.employees[1].admission").value(admissionDate.toString()))
        .andExpect(jsonPath("$.employees[1].phone").value("77987654321"))
        .andExpect(jsonPath("$.employees[2].id").exists())
        .andExpect(jsonPath("$.employees[2].photo").value("https://robohash.org/employee170"))
        .andExpect(jsonPath("$.employees[2].fullName").value("Andrew Fletcher"))
        .andExpect(jsonPath("$.employees[2].position").value("UX Designer"))
        .andExpect(jsonPath("$.employees[2].admission").value(admissionDate.toString()))
        .andExpect(jsonPath("$.employees[2].phone").value("77987653210"));
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
  @DisplayName("Phone in use exception")
  public void testPhoneAlreadyInUse() throws Exception {

    Employee Gore = new Employee(
        "https://robohash.org/employee170",
        "Martin Gore",
        "Frontend",
        LocalDate.now(),
        "77912345678"
    );

    employeeRepository.save(Gore);

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
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Phone already in use!"));
  }

  @Test
  @DisplayName("Future date exception")
  public void testFutureDateException() throws Exception {

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        LocalDate.now().plusDays(1),
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
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Admission cannot be future date!"));
  }

  @Test
  @DisplayName("Invalid date format exception")
  public void testInvalidDateFormat() throws Exception {

    String invalidEmployeeJson = """
        {
            "fullName": "David Gahan",
            "position": "Singer",
            "admission": "wrong date format here :)",
            "phone": "1234567890"
        }
        """;

    String employeeUrl = "/employees";

    mockMvc.perform(post(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin)
            .contentType(MediaType.APPLICATION_JSON)
            .content(invalidEmployeeJson))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Admission valid format yyyy-MM-dd"));
  }

  @Test
  @DisplayName("Employee validation errors")
  public void testEmployeeValidationErrors() throws Exception {

    String invalidEmployeeJson = """
        {
            "photo": "invalid url",
            "WrongKey": "David Gahan",
            "WrongKey": "Frontend",
            "WrongKey": "2023-08-22",
            "WrongKey": "77912345678"
        }
        """;

    String employeeUrl = "/employees";

    ResultActions resultActions = mockMvc.perform(post(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin)
            .contentType(MediaType.APPLICATION_JSON)
            .content(invalidEmployeeJson))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").isArray());

    String[] expectedMessages = {
        "Phone cannot be null!",
        "Position cannot be blank!",
        "FullName cannot be null!",
        "Admission cannot be null!",
        "Position cannot be null!",
        "FullName cannot be blank!",
        "Invalid URL format",
        "Phone cannot be blank!"
    };

    for (String expectedMessage : expectedMessages) {
      resultActions.andExpect(jsonPath("$.message").value(hasItem(expectedMessage)));
    }

  }

  @Test
  @DisplayName("Update employee")
  public void testUpdate() throws Exception {
    LocalDate admissionDate = LocalDate.now();

    Employee Gahan = new Employee(
        "https://robohash.org/employee170",
        "David Gahan",
        "Backend",
        admissionDate,
        "77912345678"
    );

    employeeRepository.save(Gahan);

    Gahan.setPhoto("https://robohash.org/employee141");
    Gahan.setFullName("Mirosmar Juliano de Almeida");
    Gahan.setPosition("Fullstack");
    Gahan.setAdmission(admissionDate.minusYears(1));
    Gahan.setPhone("77912340000");

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    String updatedEmployeeAsString = objectMapper.writeValueAsString(Gahan);

    String employeeUrl = "/employees/%s".formatted(Gahan.getId());

    mockMvc.perform(put(employeeUrl)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdmin)
            .contentType(MediaType.APPLICATION_JSON)
            .content(updatedEmployeeAsString))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.photo").value("https://robohash.org/employee141"))
        .andExpect(jsonPath("$.fullName").value("Mirosmar Juliano de Almeida"))
        .andExpect(jsonPath("$.position").value("Fullstack"))
        .andExpect(jsonPath("$.admission").value(admissionDate.minusYears(1).toString()))
        .andExpect(jsonPath("$.phone").value("77912340000"));
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