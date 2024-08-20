package org.maires.employee.service;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import java.util.List;
import org.maires.employee.controller.dto.UserCreationDto;
import org.maires.employee.entity.User;
import org.maires.employee.repository.UserRepository;
import org.maires.employee.service.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * The type User service.
 */
@Service
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final ObjectMapper objectMapper;

  /**
   * Instantiates a new User service.
   *
   * @param userRepository the user repository
   * @param objectMapper   the object mapper
   */
  @Autowired
  public UserService(UserRepository userRepository, ObjectMapper objectMapper) {
    this.userRepository = userRepository;
    this.objectMapper = objectMapper;
  }

  /**
   * Find all list.
   *
   * @return the list
   */
  public List<User> findAll(int pageNumber, int pageSize) {

    Pageable pageable = PageRequest.of(pageNumber, pageSize);

    Page<User> page = userRepository.findAll(pageable);

    return page.toList();
  }

  /**
   * Find by id user.
   *
   * @param id the id
   * @return the user
   * @throws UserNotFoundException the user not found exception
   */
  public User findById(Long id) throws UserNotFoundException {
    return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id.toString()));
  }

  /**
   * Find by username user.
   *
   * @param username the username
   * @return the user
   * @throws UserNotFoundException the user not found exception
   */
  public User findByUsername(String username) throws UserNotFoundException {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new UserNotFoundException(username));
  }

  /**
   * Create user.
   *
   * @param user the user
   * @return the user
   */
  public User create(User user) {
    String hashedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
    user.setPassword(hashedPassword);
    return userRepository.save(user);
  }

  /**
   * Update user.
   *
   * @param userId          the user id
   * @param userCreationDto the user creation dto
   * @return the user
   * @throws UserNotFoundException the user not found exception
   * @throws JsonMappingException  the json mapping exception
   */
  @Transactional
  public User update(Long userId, UserCreationDto userCreationDto)
      throws UserNotFoundException, JsonMappingException {
    User userToUpdate = findById(userId);

    objectMapper.updateValue(userToUpdate, userCreationDto);

    return userRepository.save(userToUpdate);
  }

  /**
   * Delete by id.
   *
   * @param userId the user id
   * @throws UserNotFoundException the user not found exception
   */
  public void deleteById(Long userId) throws UserNotFoundException {

    User user = findById(userId);

    userRepository.delete(user);
  }


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }
}