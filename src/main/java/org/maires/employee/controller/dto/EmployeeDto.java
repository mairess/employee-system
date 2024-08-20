package org.maires.employee.controller.dto;

import java.time.LocalDate;
import org.maires.employee.entity.Employee;

/**
 * The type Employee dto.
 */
public record EmployeeDto(
    Long id,
    String photo,
    String fullName,
    String position,
    LocalDate admission,
    String phone
) {

  /**
   * From entity employee dto.
   *
   * @param employee the employee
   * @return the employee dto
   */
  public static EmployeeDto fromEntity(Employee employee) {
    return new EmployeeDto(
        employee.getId(),
        employee.getPhoto(),
        employee.getFullName(),
        employee.getPosition(),
        employee.getAdmission(),
        employee.getPhone()
    );
  }

}