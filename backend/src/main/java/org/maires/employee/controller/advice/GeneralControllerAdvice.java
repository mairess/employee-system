package org.maires.employee.controller.advice;

import java.util.List;
import java.util.Map;
import org.maires.employee.service.exception.FutureDateException;
import org.maires.employee.service.exception.NotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
  public ResponseEntity<Map<String, String>> handleDuplicatedKey(
      DataIntegrityViolationException exception) {

    String message = exception.getMessage();

    if (message.contains("(email)=")) {

      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("message", "Email already in use!"));

    } else if (message.contains("(username)=")) {

      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("message", "Username"));

    } else if (message.contains("(phone)=")) {

      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Map.of("message", "Phone already in use!"));
    }

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of("message", exception.getMessage()));
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

  /**
   * Handle validation response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, List<String>>> handleValidation(
      MethodArgumentNotValidException exception) {

    Map<String, List<String>> response = Map.of(
        "message",
        exception.getBindingResult()
            .getAllErrors()
            .stream()
            .map(error -> error.getDefaultMessage())
            .toList()
    );

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  /**
   * Handle json parse error response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler({HttpMessageNotReadableException.class, FutureDateException.class})
  public ResponseEntity<Map<String, String>> handleDateJsonParseError(
      Exception exception) {

    if (exception instanceof HttpMessageNotReadableException) {

      Map<String, String> response = Map.of("message", "Admission valid format yyyy-MM-dd");

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    } else if (exception instanceof FutureDateException) {

      Map<String, String> response = Map.of("message", exception.getMessage());

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of("message", exception.getMessage()));
  }

  /**
   * Handle generic erros response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleGenericErros(Exception exception) {

    Map<String, String> response = Map.of("message", exception.getMessage());

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }

}