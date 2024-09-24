package org.maires.employee.controller;

import com.fasterxml.jackson.databind.JsonMappingException;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.maires.employee.controller.dto.UserCreationDto;
import org.maires.employee.controller.dto.UserDto;
import org.maires.employee.entity.User;
import org.maires.employee.service.UserService;
import org.maires.employee.service.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type User controller.
 */
@RestController
@RequestMapping("/users")
public class UserController {

  /**
   * The User service.
   */
  UserService userService;

  /**
   * Instantiates a new User controller.
   *
   * @param userService the user service
   */
  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }


  /**
   * Find all response entity.
   *
   * @param pageNumber the page number
   * @param pageSize   the page size
   * @param column     the column
   * @param direction  the direction
   * @return the response entity
   */
  @GetMapping
  @PreAuthorize("hasAnyAuthority('ADMIN')")
  public ResponseEntity<Map<String, Object>> findAll(
      @RequestParam(required = false, defaultValue = "0") int pageNumber,
      @RequestParam(required = false, defaultValue = "20") int pageSize,
      @RequestParam(required = false, defaultValue = "id") String column,
      @RequestParam(required = false, defaultValue = "asc") String direction
  ) {

    Map<String, Object> users = new HashMap<>(
        userService.findAll(pageNumber, pageSize, column, direction)
    );

    List<?> data = (List<?>) users.get("users");

    List<UserDto> userDtoList = data
        .stream()
        .map(employee -> UserDto.fromEntity((User) employee))
        .toList();

    users.put("users", userDtoList);

    return ResponseEntity.status(HttpStatus.OK).body(users);

  }

  /**
   * Find by id response entity.
   *
   * @param userId the user id
   * @return the response entity
   * @throws UserNotFoundException the user not found exception
   */
  @GetMapping("/{userId}")
  @PreAuthorize("hasAnyAuthority('ADMIN')")
  public ResponseEntity<UserDto> findById(
      @PathVariable Long userId
  ) throws UserNotFoundException {

    UserDto user = UserDto.fromEntity(userService.findById(userId));

    return ResponseEntity.status(HttpStatus.OK).body(user);

  }

  /**
   * Find user by username user dto.
   *
   * @param username the username
   * @return the user dto
   * @throws UserNotFoundException the user not found exception
   */
  @GetMapping("/find")
  @PreAuthorize("hasAuthority('ADMIN')")
  public UserDto findUserByUsername(@RequestParam String username) throws UserNotFoundException {
    return UserDto.fromEntity(userService.findByUsername(username));
  }

  /**
   * Create response entity.
   *
   * @param userCreationDto the user creation dto
   * @return the response entity
   */
  @PostMapping
  public ResponseEntity<UserDto> create(@Valid @RequestBody UserCreationDto userCreationDto) {

    User newUser = userService.create(userCreationDto.toEntity());

    return ResponseEntity.status(HttpStatus.CREATED).body(UserDto.fromEntity(newUser));

  }

  /**
   * Update response entity.
   *
   * @param userId          the user id
   * @param userCreationDto the user creation dto
   * @return the response entity
   * @throws JsonMappingException  the json mapping exception
   * @throws UserNotFoundException the user not found exception
   */
  @PutMapping("/{userId}")
  @PreAuthorize("hasAnyAuthority('ADMIN')")
  public ResponseEntity<UserDto> update(
      @PathVariable Long userId,
      @Valid @RequestBody UserCreationDto userCreationDto
  ) throws JsonMappingException, UserNotFoundException {

    User userUpdated = userService.update(userId, userCreationDto);

    return ResponseEntity.status(HttpStatus.OK).body(UserDto.fromEntity(userUpdated));

  }

  /**
   * Delete by id response entity.
   *
   * @param userId the user id
   * @return the response entity
   * @throws UserNotFoundException the user not found exception
   */
  @DeleteMapping("/{userId}")
  @PreAuthorize("hasAnyAuthority('ADMIN')")
  public ResponseEntity<Void> deleteById(
      @PathVariable Long userId
  ) throws UserNotFoundException {

    userService.deleteById(userId);

    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

  }

}