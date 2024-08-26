package org.maires.employee.controller.advice;

import com.auth0.jwt.exceptions.SignatureVerificationException;
import java.util.List;
import java.util.Map;
import org.maires.employee.service.exception.FutureDateException;
import org.maires.employee.service.exception.NotFoundException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
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
   * Handle data integrity violation exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(
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
   * Handle bad credentials exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<Map<String, String>> handleBadCredentialsException(
      BadCredentialsException exception) {

    Map<String, String> response = Map.of("message", exception.getMessage());

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }


  /**
   * Handle method argument not valid exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, List<String>>> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException exception) {

    Map<String, List<String>> response = Map.of(
        "message",
        exception.getBindingResult()
            .getAllErrors()
            .stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .toList()
    );

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }


  /**
   * Handle future date exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(FutureDateException.class)
  public ResponseEntity<Map<String, String>> handleFutureDateException(
      FutureDateException exception) {

    Map<String, String> response = Map.of("message", exception.getMessage());

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

  }


  /**
   * Handle http message not readable exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<Map<String, String>> handleHttpMessageNotReadableException(
      Exception exception) {

    String message = exception.getMessage();

    if (message.contains("java.time.LocalDate")) {

      Map<String, String> response = Map.of("message", "Admission valid format yyyy-MM-dd");

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of("message", exception.getMessage()));
  }


  /**
   * Handle signature verification exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(SignatureVerificationException.class)
  public ResponseEntity<Map<String, String>> handleSignatureVerificationException(
      SignatureVerificationException exception) {

    // This response shows the algorithm used to sign token.
    // Might be a security issue.

    Map<String, String> response = Map.of("message", exception.getMessage());

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }


  /**
   * Handle generic exceptions response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleGenericExceptions(Exception exception) {

    Map<String, String> response = Map.of("message", exception.getMessage());

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }

}