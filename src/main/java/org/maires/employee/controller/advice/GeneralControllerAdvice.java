package org.maires.employee.controller.advice;

import java.util.Map;
import org.maires.employee.service.exception.NotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * The type General controller advice.
 */
@ControllerAdvice
public class GeneralControllerAdvice {

  /**
   * Handle not found response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<Map<String, String>> handleNotFound(NotFoundException exception) {
    Map<String, String> response = Map.of("message", exception.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  /**
   * Handle login response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Map<String, String>> handleUniqueFiled(
      DataIntegrityViolationException exception) {

    String message = exception.getMessage();

    if (message.contains("users_email_key")) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("message", "Email already in use!"));
    } else if (message.contains("users_username_key")) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("message", "Username already in use!"));
    } else if (message.contains("employees_phone_key")) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("message", "Phone already in use!"));
    }

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of("message", "Database error occurred!"));
  }

  /*
  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleUsernameNotFound(
      UsernameNotFoundException exception) {
    Map<String, String> response = Map.of("message", exception.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  /**
   * Handle login response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<Map<String, String>> handleLogin(BadCredentialsException exception) {
    Map<String, String> response = Map.of("message", exception.getMessage());
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }

}