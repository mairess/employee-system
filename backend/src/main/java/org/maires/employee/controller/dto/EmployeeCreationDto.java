package org.maires.employee.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import org.maires.employee.entity.Employee;

/**
 * The type Employee creation dto.
 */
public record EmployeeCreationDto(

    @Pattern(
        regexp = "$|^(https?)://.*\\.(jpg|jpeg|png|gif|bmp|webp)$",
        message = "Invalid URL format"
    )
    String photo,

    @NotNull(message = "FullName cannot be null!")
    @NotBlank(message = "FullName cannot be blank!")
    @Size(min = 4, message = "FullName must be >= 4 characters!")
    @Pattern(
        regexp = "\\D+",
        message = "FullName must not contain digit!"
    )
    String fullName,

    @NotNull(message = "Position cannot be null!")
    @NotBlank(message = "Position cannot be blank!")
    String position,

    @NotNull(message = "Admission cannot be null!")
    LocalDate admission,

    @Size(min = 11, max = 11, message = "Phone must be 11 characters!")
    @NotNull(message = "Phone cannot be null!")
    @NotBlank(message = "Phone cannot be blank!")
    @Pattern(
        regexp = "\\d+",
        message = "Phone must contain only digit!"
    )
    String phone
) {

  /**
   * To entity employee.
   *
   * @return the employee
   */
  public Employee toEntity() {
    return new Employee(photo, fullName, position, admission, phone);
  }

}