package org.maires.employee.security;

/**
 * Enum representing a Role.
 */
public enum Role {
  ADMIN("ADMIN"),
  TECHNICIAN("USER");

  private final String name;

  Role(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}