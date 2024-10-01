package org.maires.employee.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

/**
 * The type Deny list token.
 */
@Entity(name = "deny_list_tokens")
public class DenyListToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String token;

  private LocalDateTime expirationDate;

  /**
   * Instantiates a new Deny list token.
   */
  public DenyListToken() {
  }

  /**
   * Instantiates a new Deny list token.
   *
   * @param token          the token
   * @param expirationDate the expiration date
   */
  public DenyListToken(String token, LocalDateTime expirationDate) {
    this.token = token;
    this.expirationDate = expirationDate;
  }

  /**
   * Gets id.
   *
   * @return the id
   */
  public Long getId() {
    return id;
  }

  /**
   * Sets id.
   *
   * @param id the id
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * Gets token.
   *
   * @return the token
   */
  public String getToken() {
    return token;
  }

  /**
   * Sets token.
   *
   * @param token the token
   */
  public void setToken(String token) {
    this.token = token;
  }

  /**
   * Gets expiration date.
   *
   * @return the expiration date
   */
  public LocalDateTime getExpirationDate() {
    return expirationDate;
  }

  /**
   * Sets expiration date.
   *
   * @param expirationDate the expiration date
   */
  public void setExpirationDate(LocalDateTime expirationDate) {
    this.expirationDate = expirationDate;
  }
}