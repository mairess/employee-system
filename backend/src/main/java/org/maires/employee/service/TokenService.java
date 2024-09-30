package org.maires.employee.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import org.maires.employee.entity.DenyListToken;
import org.maires.employee.repository.DenyListRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * The type Token service.
 */
@Service
public class TokenService {

  private final Algorithm algorithm;

  private final DenyListRepository denyListRepository;

  /**
   * Instantiates a new Token service.
   *
   * @param secret             the secret
   * @param denyListRepository the deny list repository
   */
  public TokenService(@Value("${api.security.token.secret}") String secret,
      DenyListRepository denyListRepository) {
    this.algorithm = Algorithm.HMAC256(secret);
    this.denyListRepository = denyListRepository;
  }


  /**
   * Generate token string.
   *
   * @param username the username
   * @param role     the role
   * @return the string
   */
  public String generateToken(String username, String role) {
    return JWT.create()
        .withSubject(username)
        .withClaim("role", role)
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
    return Instant.now().plus(8, ChronoUnit.HOURS);
  }

  private Instant generateExpiration(int minutes) {
    return Instant.now().plus(minutes, ChronoUnit.MINUTES);
  }

  /**
   * Validate token string.
   *
   * @param token the token
   * @return the string
   */
  public String validateToken(String token) {
    return JWT.require(algorithm).build().verify(token).getSubject();
  }

  /**
   * Add to deny list.
   *
   * @param token the token
   */
  public void addToDenyList(String token) {

    LocalDateTime expiration = getExpirationDateFromToken(token);

    DenyListToken denyListToken = new DenyListToken(token, expiration);

    denyListRepository.save(denyListToken);

  }

  /**
   * Is in deny list boolean.
   *
   * @param token the token
   * @return the boolean
   */
  public boolean isInDenyList(String token) {

    return denyListRepository.existsByToken(token);

  }

  /**
   * Gets expiration date from token.
   *
   * @param token the token
   * @return the expiration date from token
   */
  public LocalDateTime getExpirationDateFromToken(String token) {

    DecodedJWT decodedJwt = JWT.decode(token);

    Date expiration = decodedJwt.getExpiresAt();

    return expiration.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

  }

}