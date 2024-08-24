package org.maires.employee.service;

import org.maires.employee.entity.User;
import org.maires.employee.repository.UserRepository;
import org.maires.employee.service.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.MessagingException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * The type Password reset service.
 */
@Service
public class PasswordResetService {

  private final UserRepository userRepository;
  private final KafkaTemplate<String, String> kafkaTemplate;
  private final BCryptPasswordEncoder bcryptPasswordEncoder;

  @Value("${kafka.topic.password-reset}")
  private String passwordResetTopic;

  @Value("${kafka.topic.password-reset-confirmation}")
  private String passwordResetConfirmationTopic;


  /**
   * Instantiates a new Password reset service.
   *
   * @param userRepository the user repository
   * @param kafkaTemplate  the kafka template
   */
  @Autowired
  public PasswordResetService(
      UserRepository userRepository,
      KafkaTemplate<String, String> kafkaTemplate,
      BCryptPasswordEncoder bcryptPasswordEncoder
  ) {
    this.userRepository = userRepository;
    this.kafkaTemplate = kafkaTemplate;
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
  }


  /**
   * Update password.
   *
   * @param email       the email
   * @param newPassword the new password
   * @throws UserNotFoundException the user not found exception
   */
  public void updatePassword(String email, String newPassword)
      throws UserNotFoundException, MessagingException {

    User user = userRepository.findByEmail(email).orElseThrow(
        () -> new UserNotFoundException(email)
    );

    user.setPassword(bcryptPasswordEncoder.encode(newPassword));

    userRepository.save(user);

    String message = "email:%s".formatted(user.getEmail());
    kafkaTemplate.send(passwordResetConfirmationTopic, message);

  }

  /**
   * Send password reset request.
   *
   * @param email      the email
   * @param resetToken the reset token
   * @throws UserNotFoundException the user not found exception
   */
  public void resetPasswordRequest(String email, String resetToken)
      throws UserNotFoundException {

    User user = userRepository.findByEmail(email).orElseThrow(
        () -> new UserNotFoundException(email)
    );

    String message = "email:%s, token:%s".formatted(user.getEmail(), resetToken);
    kafkaTemplate.send(passwordResetTopic, message);

  }

}