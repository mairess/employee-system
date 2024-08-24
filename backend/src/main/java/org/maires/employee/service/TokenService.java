package org.maires.employee.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * The type Token service.
 */
@Service
public class TokenService {

  private final Algorithm algorithm;

  /**
   * Instantiates a new Token service.
   *
   * @param secret the secret
   */
  public TokenService(@Value("${api.security.token.secret}") String secret) {
    this.algorithm = Algorithm.HMAC256(secret);
  }

  /**
   * Generate token string.
   *
   * @param username the username
   * @return the string
   */
  public String generateToken(String username) {
    return JWT.create()
        .withSubject(username)
        .withExpiresAt(generateExpiration())
        .sign(algorithm);
  }

  /**
   * Generate token string.
   *
   * @param username the username
   * @param minutes  the minutes
   * @return the string
   */
  public String generateToken(String username, int minutes) {
    return JWT.create()
        .withSubject(username)
        .withExpiresAt(generateExpiration(minutes))
        .sign(algorithm);
  }

  private Instant generateExpiration() {
    return Instant.now()
        .plus(8, ChronoUnit.HOURS);
  }

  private Instant generateExpiration(int minutes) {
    return Instant.now()
        .plus(minutes, ChronoUnit.MINUTES);
  }

  /**
   * Validate token string.
   *
   * @param token the token
   * @return the string
   */
  public String validateToken(String token) {
    return JWT.require(algorithm)
        .build()
        .verify(token)
        .getSubject();
  }

}