package org.maires.employee.service;

import java.util.List;
import org.maires.employee.entity.Employee;
import org.maires.employee.repository.EmployeeRepository;
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
}