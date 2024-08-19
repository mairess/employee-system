package org.maires.employee.service.exception;

/**
 * The type Employee not found exception.
 */
public class EmployeeNotFoundException extends NotFoundException {

  /**
   * Instantiates a new Employee not found exception.
   *
   * @param identifier the identifier
   */
  public EmployeeNotFoundException(String identifier) {
    super("Employee not found with id " + identifier + '!');
  }

}