package org.maires.password.service;

import jakarta.mail.MessagingException;
import org.maires.password.entity.User;
import org.maires.password.repository.UserRepository;
import org.maires.password.service.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * The type Password reset service.
 */
@Service
public class PasswordResetService {

  private final UserRepository userRepository;
  private final KafkaTemplate<String, String> kafkaTemplate;
  private final EmailService emailService;

  @Value("${kafka.topic.password-reset}")
  private String passwordResetTopic;

  /**
   * Instantiates a new Password reset service.
   *
   * @param userRepository the user repository
   * @param kafkaTemplate  the kafka template
   */
  public PasswordResetService(
      UserRepository userRepository,
      KafkaTemplate<String, String> kafkaTemplate,
      EmailService emailService
  ) {
    this.userRepository = userRepository;
    this.kafkaTemplate = kafkaTemplate;
    this.emailService = emailService;
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

    user.setPassword(new BCryptPasswordEncoder().encode(newPassword));

    userRepository.save(user);

    emailService.sendPasswordResetConfirmationEmail(email);

  }

  /**
   * Send password reset request.
   *
   * @param email      the email
   * @param resetToken the reset token
   */
  public void sendPasswordResetRequest(String email, String resetToken)
      throws UserNotFoundException {

    User user = userRepository.findByEmail(email).orElseThrow(
        () -> new UserNotFoundException(email)
    );

    String message = "email:%s, token:%s".formatted(user.getEmail(), resetToken);
    kafkaTemplate.send(passwordResetTopic, message);
  }

}