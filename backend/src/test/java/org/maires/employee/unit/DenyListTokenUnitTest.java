package org.maires.employee.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.maires.employee.entity.DenyListToken;
import org.maires.employee.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@DisplayName("DenyListToken unit tests")
public class DenyListTokenUnitTest {

  @Autowired
  TokenService tokenService;

  @Test
  @DisplayName("Test DenyListToken getters and setters")
  public void testDenyListTokenGettersAndSetters() {

    String token = tokenService.generateToken("manoel@mail.com");

    LocalDateTime expiration = tokenService.getExpirationDateFromToken(token);

    DenyListToken denyListToken = new DenyListToken();

    denyListToken.setId(1L);
    denyListToken.setExpirationDate(expiration);
    denyListToken.setToken(token);

    assertEquals(1L, denyListToken.getId());
    assertEquals(token, denyListToken.getToken());
    assertEquals(expiration, denyListToken.getExpirationDate());

  }

}