package org.maires.employee.security.util;

import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


/**
 * The type Handle exceptions.
 */
public class HandleExceptions {

  private final ObjectMapper objectMapper;


  /**
   * Instantiates a new Handle exceptions.
   *
   * @param objectMapper the object mapper
   */
  @Autowired
  public HandleExceptions(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }


  /**
   * Handle exception.
   *
   * @param response  the response
   * @param exception the exception
   * @throws IOException the io exception
   */
  public void handleException(HttpServletResponse response, Exception exception)
      throws IOException {

    if (exception instanceof UsernameNotFoundException) {

      returnExceptionResponse(
          response,
          HttpServletResponse.SC_NOT_FOUND,
          "User not found with username %s".formatted(exception.getMessage())
      );

    } else if (exception instanceof TokenExpiredException) {

      returnExceptionResponse(
          response,
          HttpServletResponse.SC_UNAUTHORIZED,
          "%s".formatted(exception.getMessage())
      );

    } else if (exception instanceof SignatureVerificationException) {

      returnExceptionResponse(
          response,
          HttpServletResponse.SC_UNAUTHORIZED,
          "%s".formatted(exception.getMessage())
      );

    }
  }

  private void returnExceptionResponse(
      HttpServletResponse response,
      int statusCode,
      String message
  ) throws IOException {
    Map<String, String> exceptionMessage = Map.of("message", message);
    response.setStatus(statusCode);
    response.setContentType("application/json");
    response.getWriter().write(objectMapper.writeValueAsString(exceptionMessage));
  }

}