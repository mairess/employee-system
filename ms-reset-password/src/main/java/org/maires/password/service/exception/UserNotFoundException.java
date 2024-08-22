package org.maires.password.service.exception;

/**
 * The type Person not found exception.
 */
public class UserNotFoundException extends NotFoundException {

  /**
   * Instantiates a new Person not found exception.
   */
  public UserNotFoundException(String id) {
    super("User not found with id " + id + "!");
  }

}