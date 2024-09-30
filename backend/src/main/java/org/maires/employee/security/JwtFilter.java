package org.maires.employee.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import org.maires.employee.security.util.HandleExceptions;
import org.maires.employee.service.TokenService;
import org.maires.employee.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * The type Jwt filter.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

  private final TokenService tokenService;
  private final UserService userService;
  private final ObjectMapper objectMapper;

  /**
   * Instantiates a new Jwt filter.
   *
   * @param tokenService the token service
   * @param userService  the person service
   */
  @Autowired
  public JwtFilter(TokenService tokenService, UserService userService, ObjectMapper objectMapper) {
    this.tokenService = tokenService;
    this.userService = userService;
    this.objectMapper = objectMapper;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    Optional<String> token = extractToken(request);

    if (token.isPresent()) {

      if (tokenService.isInDenyList(token.get())) {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter()
            .write(objectMapper.writeValueAsString(Map.of("message", "Token is denied!")));
        return;

      }

      try {
        String subject = tokenService.validateToken(token.get());

        UserDetails userDetails = userService.loadUserByUsername(subject);

        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

      } catch (Exception exception) {

        HandleExceptions handleExceptions = new HandleExceptions(new ObjectMapper());
        handleExceptions.handleException(response, exception);
        return;

      }
    }
    filterChain.doFilter(request, response);
  }

  private Optional<String> extractToken(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");

    if (authHeader == null) {
      return Optional.empty();
    }

    return Optional.of(
        authHeader.replace("Bearer ", "")
    );
  }

}