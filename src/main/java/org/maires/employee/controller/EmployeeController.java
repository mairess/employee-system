package org.maires.employee.controller;

import java.util.List;
import org.maires.employee.controller.dto.EmployeeCreationDto;
import org.maires.employee.controller.dto.EmployeeDto;
import org.maires.employee.entity.Employee;
import org.maires.employee.service.EmployeeService;
import org.maires.employee.service.exception.EmployeeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Employee controller.
 */
@RestController
@RequestMapping("employees")
public class EmployeeController {

  private final EmployeeService employeeService;

  /**
   * Instantiates a new Employee controller.
   *
   * @param employeeService the employee service
   */
  @Autowired
  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  /**
   * Find all employees list.
   *
   * @return the list
   */
  @GetMapping
  public List<EmployeeDto> findAllEmployees() {
    return employeeService.findAllEmployees().stream().map(EmployeeDto::fromEntity).toList();
  }

  /**
   * Find employee by id employee dto.
   *
   * @param employeeId the employee id
   * @return the employee dto
   * @throws EmployeeNotFoundException the employee not found exception
   */
  @GetMapping("/{employeeId}")
  public EmployeeDto findEmployeeById(@PathVariable Long employeeId)
      throws EmployeeNotFoundException {
    return EmployeeDto.fromEntity(employeeService.findEmployeeById(employeeId));
  }

  /**
   * Create employee employee dto.
   *
   * @param employeeCreationDto the employee creation dto
   * @return the employee dto
   */
  @PostMapping
  public EmployeeDto createEmployee(@RequestBody EmployeeCreationDto employeeCreationDto) {
    Employee newEmployee = employeeService.createEmployee(employeeCreationDto.toEntity());
    return EmployeeDto.fromEntity(newEmployee);
  }

}