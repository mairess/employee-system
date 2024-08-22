package org.maires.password.controller;

import java.util.Map;
import org.maires.password.controller.dto.PasswordResetDto;
import org.maires.password.controller.dto.PasswordResetRequestDto;
import org.maires.password.service.PasswordResetService;
import org.maires.password.service.TokenService;
import org.maires.password.service.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * The type Password controller.
 */
@RestController
@RequestMapping("/password")
public class PasswordController {

  private final TokenService tokenService;
  private final PasswordResetService passwordResetService;


  /**
   * Instantiates a new Password controller.
   *
   * @param authenticationManager the authentication manager
   * @param tokenService          the token service
   * @param passwordResetService  the password reset service
   */
  @Autowired
  public PasswordController(
      AuthenticationManager authenticationManager,
      TokenService tokenService,
      PasswordResetService passwordResetService
  ) {
    this.tokenService = tokenService;
    this.passwordResetService = passwordResetService;
  }


  /**
   * Reset password request response entity.
   *
   * @param request the request
   * @return the response entity
   * @throws UserNotFoundException the user not found exception
   */
  @PostMapping("/reset-password-request")
  public ResponseEntity<Map<String, String>> resetPasswordRequest(
      @RequestBody PasswordResetRequestDto request) throws UserNotFoundException {

    String resetToken = tokenService.generateResetToken(request.email());
    passwordResetService.sendPasswordResetRequest(request.email(), resetToken);

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
  @PostMapping("/reset-password")
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