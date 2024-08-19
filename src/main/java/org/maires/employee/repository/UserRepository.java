package org.maires.employee.repository;

import java.util.Optional;
import org.maires.employee.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * The interface User repository.
 */
public interface UserRepository extends JpaRepository<User, Long> {

  /**
   * Find by username optional.
   *
   * @param username the username
   * @return the optional
   */
  Optional<User> findByUsername(String username);

}