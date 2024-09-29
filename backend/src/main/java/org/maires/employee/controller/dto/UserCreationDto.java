package org.maires.employee.controller.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.maires.employee.entity.User;
import org.maires.employee.security.Role;
import org.maires.employee.validation.EnumValidator;

/**
 * The type User creation dto.
 */
public record UserCreationDto(
    @Pattern(
        regexp = "$|^(https?)://.*\\.(jpg|jpeg|png|gif|bmp|webp)$",
        message = "Invalid URL format"
    )
    String photo,

    @NotNull(message = "Full name cannot be null!")
    @NotBlank(message = "Full name cannot be blank!")
    @Size(min = 4, message = "Full name must be >= 4 characters!")
    @Pattern(
        regexp = "^[^0-9]*$",
        message = "Full name must not contain digit!"
    )
    String fullName,

    @NotNull(message = "Username cannot be null!")
    @NotBlank(message = "Username cannot be blank!")
    @Size(min = 3, message = "Username must be >= 3 characters!")
    String username,

    @NotNull(message = "Email cannot be null!")
    @NotBlank(message = "Email cannot be blank!")
    @Email(message = "Email must be a valid email address!")
    String email,

    @NotNull(message = "Password cannot be null!")
    @NotBlank(message = "Password cannot be blank!")
    @Size(min = 6, message = "Password must be >= 6 characters!")
    String password,

    @NotNull(message = "Role cannot be null! Try ADMIN or TECHNICIAN")
    @EnumValidator(enumClazz = Role.class, message = "Role must be ADMIN or USER")
    String role
) {

  /**
   * To entity user.
   *
   * @return the user
   */
  public User toEntity() {
    return new User(photo, fullName, username, email, password, Role.valueOf(role.toUpperCase()));
  }

}