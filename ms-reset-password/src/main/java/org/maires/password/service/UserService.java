package org.maires.password.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.maires.password.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * The type User service.
 */
@Service
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;

  /**
   * Instantiates a new User service.
   *
   * @param userRepository the user repository
   * @param objectMapper   the object mapper
   */
  @Autowired
  public UserService(UserRepository userRepository, ObjectMapper objectMapper) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }
}