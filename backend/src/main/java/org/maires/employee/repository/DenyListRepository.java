package org.maires.employee.repository;

import org.maires.employee.entity.DenyListToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The interface Deny list repository.
 */
@Repository
public interface DenyListRepository extends JpaRepository<DenyListToken, Long> {

  /**
   * Exists by token boolean.
   *
   * @param token the token
   * @return the boolean
   */
  boolean existsByToken(String token);

}