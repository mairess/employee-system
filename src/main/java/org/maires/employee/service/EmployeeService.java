package org.maires.employee.service;

import java.util.List;
import org.maires.employee.entity.Employee;
import org.maires.employee.repository.EmployeeRepository;
import org.maires.employee.service.exception.EmployeeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * The type Employee service.
 */
@Service
public class EmployeeService {

  private final EmployeeRepository employeeRepository;

  /**
   * Instantiates a new Employee service.
   *
   * @param employeeRepository the employee repository
   */
  @Autowired
  public EmployeeService(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  /**
   * Find all list.
   *
   * @return the list
   */
  public List<Employee> findAllEmployees() {
    return employeeRepository.findAll();
  }

  /**
   * Find employee by id employee.
   *
   * @param employeeId the employee id
   * @return the employee
   * @throws EmployeeNotFoundException the employee not found exception
   */
  public Employee findEmployeeById(Long employeeId) throws EmployeeNotFoundException {
    return employeeRepository.findById(employeeId).orElseThrow(
        () -> new EmployeeNotFoundException(employeeId.toString())
    );
  }
}