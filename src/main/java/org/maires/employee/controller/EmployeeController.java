package org.maires.employee.controller;

import java.util.List;
import org.maires.employee.entity.Employee;
import org.maires.employee.service.EmployeeService;
import org.maires.employee.service.exception.EmployeeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
  public List<Employee> findAllEmployees() {
    return employeeService.findAllEmployees();
  }

  @GetMapping("/{employeeId}")
  public Employee findEmployeeById(@PathVariable Long employeeId)
      throws EmployeeNotFoundException {
    return employeeService.findEmployeeById(employeeId);
  }

}