package org.maires.employee.repository;

import java.util.Optional;
import org.maires.employee.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * The interface User repository.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  /**
   * Find by username optional.
   *
   * @param username the username
   * @return the optional
   */
  Optional<User> findByUsername(String username);

  /**
   * Find by email optional.
   *
   * @param email the email
   * @return the optional
   */
  Optional<User> findByEmail(String email);

}