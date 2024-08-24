package org.maires.employee.controller;

import java.util.Map;
import org.maires.employee.controller.dto.AuthDto;
import org.maires.employee.controller.dto.PasswordResetDto;
import org.maires.employee.controller.dto.PasswordResetRequestDto;
import org.maires.employee.controller.dto.TokenDto;
import org.maires.employee.service.PasswordResetService;
import org.maires.employee.service.TokenService;
import org.maires.employee.service.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Auth controller.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final TokenService tokenService;
  private final PasswordResetService passwordResetService;

  /**
   * Instantiates a new Auth controller.
   *
   * @param authenticationManager the authentication manager
   * @param tokenService          the token service
   * @param passwordResetService  the password reset service
   */
  @Autowired
  public AuthController(
      AuthenticationManager authenticationManager,
      TokenService tokenService,
      PasswordResetService passwordResetService
  ) {
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
    this.passwordResetService = passwordResetService;
  }

  /**
   * Login token dto.
   *
   * @param authDto the auth dto
   * @return the token dto
   * @throws BadCredentialsException the bad credentials exception
   */
  @PostMapping("/login")
  public TokenDto login(@RequestBody AuthDto authDto) throws BadCredentialsException {
    try {
      UsernamePasswordAuthenticationToken usernamePassword =
          new UsernamePasswordAuthenticationToken(authDto.username(), authDto.password());

      Authentication auth = authenticationManager.authenticate(usernamePassword);

      String token = tokenService.generateToken(auth.getName());

      return new TokenDto(token);
    } catch (BadCredentialsException exception) {
      throw new BadCredentialsException("Invalid credentials!");
    }
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