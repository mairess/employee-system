package org.maires.employee.service.exception;

/**
 * The type Person not found exception.
 */
public class UserNotFoundException extends NotFoundException {


  /**
   * Instantiates a new User not found exception.
   *
   * @param id    the id
   * @param label the label
   */
  public UserNotFoundException(String id, String label) {
    super("User not found with " + label + " " + id + "!");
  }

}