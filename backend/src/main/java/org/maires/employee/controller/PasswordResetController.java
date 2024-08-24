package org.maires.employee.controller;

import java.util.Map;
import org.maires.employee.controller.dto.PasswordResetDto;
import org.maires.employee.controller.dto.PasswordResetRequestDto;
import org.maires.employee.service.PasswordResetService;
import org.maires.employee.service.TokenService;
import org.maires.employee.service.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Password reset controller.
 */
@RestController
@RequestMapping("/password")
public class PasswordResetController {

  private final PasswordResetService passwordResetService;
  private final TokenService tokenService;

  /**
   * Instantiates a new Password reset controller.
   *
   * @param passwordResetService the password reset service
   * @param tokenService         the token service
   */
  @Autowired
  public PasswordResetController(
      PasswordResetService passwordResetService,
      TokenService tokenService
  ) {
    this.passwordResetService = passwordResetService;
    this.tokenService = tokenService;
  }


  /**
   * Reset password request response entity.
   *
   * @param request the request
   * @return the response entity
   * @throws UserNotFoundException the user not found exception
   */
  @PostMapping("/reset-request")
  public ResponseEntity<Map<String, String>> resetPasswordRequest(
      @RequestBody PasswordResetRequestDto request) throws UserNotFoundException {

    String resetToken = tokenService.generateToken(request.email(), 15);
    passwordResetService.resetPasswordRequest(request.email(), resetToken);

    Map<String, String> message = Map.of("message", "Password reset link sent to your email!");

    return ResponseEntity.status(HttpStatus.OK).body(message);
  }


  /**
   * Reset password response entity.
   *
   * @param token   the token
   * @param request the request
   * @return the response entity
   */
  @PostMapping("/reset")
  public ResponseEntity<Map<String, String>> resetPassword(@RequestParam String token,
      @RequestBody PasswordResetDto request) {

    try {

      String email = tokenService.validateToken(token);

      passwordResetService.updatePassword(email, request.newPassword());

      Map<String, String> message = Map.of("message", "Password successfully changed!");

      return ResponseEntity.status(HttpStatus.OK).body(message);

    } catch (Exception e) {
      Map<String, String> message = Map.of("message", "Invalid or expired token!");

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
  }


}