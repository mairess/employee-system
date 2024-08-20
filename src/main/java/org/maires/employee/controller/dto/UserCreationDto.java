package org.maires.employee.controller.dto;

import org.maires.employee.entity.User;
import org.maires.employee.security.Role;

/**
 * The type User creation dto.
 */
public record UserCreationDto(
    String fullName,
    String username,
    String email,
    String password,
    Role role
) {

  /**
   * To entity user.
   *
   * @return the user
   */
  public User toEntity() {
    return new User(fullName, username, email, password, role);
  }

}