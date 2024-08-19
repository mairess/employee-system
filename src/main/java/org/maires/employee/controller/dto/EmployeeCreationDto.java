package org.maires.employee.controller.dto;

import java.time.LocalDateTime;
import org.maires.employee.entity.Employee;

/**
 * The type Employee creation dto.
 */
public record EmployeeCreationDto(
    String photo,
    String name,
    String position,
    LocalDateTime admission,
    String phone
) {

  /**
   * To entity employee.
   *
   * @return the employee
   */
  public Employee toEntity() {
    return new Employee(photo, name, position, admission, phone);
  }

}