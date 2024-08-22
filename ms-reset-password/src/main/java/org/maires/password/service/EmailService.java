package org.maires.password.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;

/**
 * The type Email service.
 */
@Service
public class EmailService {

  private final JavaMailSender mailSender;

  /**
   * Instantiates a new Email service.
   *
   * @param mailSender the mail sender
   */
  @Autowired
  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  /**
   * Send reset password email.
   *
   * @param message the message
   * @throws MessagingException the messaging exception
   * @throws MessagingException the messaging exception
   */
  @KafkaListener(topics = "${kafka.topic.password-reset}", groupId = "email-service")
  public void sendResetPasswordEmail(String message)
      throws MessagingException, jakarta.mail.MessagingException {
    String[] parts = message.split(",");
    String email = parts[0].split(":")[1];
    String token = parts[1].split(":")[1];
    String resetLink = "http://localhost:3000/?token=%s".formatted(token);
    sendPasswordResetEmail(email, resetLink);
  }

  private void sendPasswordResetEmail(String email, String resetLink)
      throws MessagingException, jakarta.mail.MessagingException {
    String subject = "Password Reset Request";
    String htmlContent = "<!DOCTYPE html>"
        + "<html lang=\"en\">"
        + "<head>"
        + "<meta charset=\"UTF-8\">"
        + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        + "<title>Password Reset Instructions</title>"
        + "<style>"
        + "body {"
        + "  font-family: Arial, sans-serif;"
        + "  background-color: #f0f0f0;"
        + "  padding: 20px;"
        + "  margin: 0;"
        + "}"
        + ".container {"
        + "  background-color: #ffffff;"
        + "  padding: 30px;"
        + "  border-radius: 10px;"
        + "  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"
        + "  max-width: 600px;"
        + "  margin: 0 auto;"
        + "}"
        + "h2 {"
        + "  color: #333;"
        + "  margin-bottom: 20px;"
        + "}"
        + "p {"
        + "  font-size: 16px;"
        + "  color: #666;"
        + "  line-height: 1.6;"
        + "}"
        + "a {"
        + "  color: #007bff;"
        + "  text-decoration: none;"
        + "}"
        + "a:hover {"
        + "  text-decoration: underline;"
        + "}"
        + ".footer {"
        + "  font-size: 14px;"
        + "  color: #888;"
        + "  margin-top: 20px;"
        + "}"
        + "</style>"
        + "</head>"
        + "<body>"
        + "<div class=\"container\">"
        + "<h2>Important: Password Reset Request</h2>"
        + "<p>The link to reset your password will expire in 15 minutes. "
        + "Please use it as soon as possible.</p>"
        + "<p>To reset your password, click the link below:</p>"
        + "<p><a href=\"" + resetLink + "\">" + resetLink + "</a></p>"
        + "<p class=\"footer\">If you did not request this password reset, "
        + "please ignore this email.</p>"
        + "</div>"
        + "</body>"
        + "</html>";

    sendEmail(email, htmlContent, subject);
  }

  /**
   * Send password reset confirmation email.
   *
   * @param email the email
   * @throws MessagingException the messaging exception
   * @throws MessagingException the messaging exception
   */
  public void sendPasswordResetConfirmationEmail(String email)
      throws MessagingException, jakarta.mail.MessagingException {
    String subject = "Password Reset Confirmation";
    String supportUrl = "https://github.com/mairess";
    String htmlContent = "<!DOCTYPE html>"
        + "<html lang=\"en\">"
        + "<head>"
        + "<meta charset=\"UTF-8\">"
        + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        + "<title>Password Reset Confirmation</title>"
        + "<style>"
        + "body {"
        + "  font-family: Arial, sans-serif;"
        + "  background-color: #f0f0f0;"
        + "  padding: 20px;"
        + "  margin: 0;"
        + "}"
        + ".container {"
        + "  background-color: #ffffff;"
        + "  padding: 30px;"
        + "  border-radius: 10px;"
        + "  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"
        + "  max-width: 600px;"
        + "  margin: 0 auto;"
        + "}"
        + "h2 {"
        + "  color: #333;"
        + "  margin-bottom: 20px;"
        + "}"
        + "p {"
        + "  font-size: 16px;"
        + "  color: #666;"
        + "  line-height: 1.6;"
        + "}"
        + ".footer {"
        + "  font-size: 14px;"
        + "  color: #888;"
        + "  margin-top: 20px;"
        + "}"
        + "</style>"
        + "</head>"
        + "<body>"
        + "<div class=\"container\">"
        + "<p>Your password has been successfully changed. "
        + "If you did not initiate this change, please contact our "
        + "<a href=\"" + supportUrl + "\">support</a> immediately.</p>"
        + "<p class=\"footer\">If you have any questions, feel free to reach out to us.</p>"
        + "</div>"
        + "</body>"
        + "</html>";

    sendEmail(email, htmlContent, subject);
  }

  private void sendEmail(String email, String htmlContent, String subject)
      throws MessagingException, jakarta.mail.MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    helper.setTo(email);
    helper.setSubject(subject);
    helper.setText(htmlContent, true);

    mailSender.send(message);
  }

}