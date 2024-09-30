package org.maires.employee.controller;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import org.maires.employee.controller.dto.AuthDto;
import org.maires.employee.controller.dto.TokenDto;
import org.maires.employee.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Auth controller.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final TokenService tokenService;

  /**
   * Instantiates a new Auth controller.
   *
   * @param authenticationManager the authentication manager
   * @param tokenService          the token service
   */
  @Autowired
  public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
  }

  /**
   * Login token dto.
   *
   * @param authDto the auth dto
   * @return the token dto
   * @throws BadCredentialsException the bad credentials exception
   */
  @PostMapping("/login")
  public TokenDto login(@RequestBody AuthDto authDto) {
    UsernamePasswordAuthenticationToken usernamePassword =
        new UsernamePasswordAuthenticationToken(authDto.username(), authDto.password());

    Authentication auth = authenticationManager.authenticate(usernamePassword);

    String role = auth.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .findFirst()
        .orElse(null);

    String token = tokenService.generateToken(auth.getName(), role);

    return new TokenDto(token);
  }

  /**
   * Logout response entity.
   *
   * @param request the request
   * @return the response entity
   */
  @PostMapping("/logout")
  public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {

    String authHeader = request.getHeader("Authorization");

    String token = authHeader.substring(7);

    tokenService.addToDenyList(token);

    Map<String, String> response = Map.of("message", "Logout successfully!");

    return ResponseEntity.status(HttpStatus.OK).body(response);

  }
}