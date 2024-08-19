package org.maires.employee.controller.dto;

import org.maires.employee.entity.User;
import org.maires.employee.security.Role;

/**
 * The type User dto.
 */
public record UserDto(
    Long id,
    String username,
    Role role
) {

  /**
   * From entity user dto.
   *
   * @param user the user
   * @return the user dto
   */
  public static UserDto fromEntity(User user) {
    return new UserDto(
        user.getId(),
        user.getUsername(),
        user.getRole()
    );
  }

}