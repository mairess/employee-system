package org.maires.email.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Map;
import org.maires.email.service.dto.EmailDto;
import org.maires.email.service.dto.EmailTokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


/**
 * The type Email service.
 */
@Service
public class EmailService {

  private final JavaMailSender mailSender;
  private final Configuration freemarkerConfig;

  /**
   * Instantiates a new Email service.
   *
   * @param mailSender       the mail sender
   * @param freemarkerConfig the freemarker config
   */
  @Autowired
  public EmailService(JavaMailSender mailSender, Configuration freemarkerConfig) {
    this.mailSender = mailSender;
    this.freemarkerConfig = freemarkerConfig;
  }


  /**
   * Send reset password email.
   *
   * @param message the message
   * @throws MessagingException the messaging exception
   */
  @KafkaListener(topics = "${kafka.topic.password-reset}", groupId = "email-service")
  public void sendResetPasswordEmail(String message) throws MessagingException {
    EmailTokenDto emailTokenDto = extractEmailAndToken(message);
    String resetLink = "http://localhost:3000/?token=%s".formatted(emailTokenDto.token());
    sendPasswordResetEmail(emailTokenDto.email(), resetLink);
  }


  /**
   * Send reset password confirmation email.
   *
   * @param message the message
   * @throws MessagingException the messaging exception
   */
  @KafkaListener(topics = "${kafka.topic.password-reset-confirmation}", groupId = "email-service")
  public void sendResetPasswordConfirmationEmail(String message) throws MessagingException {
    EmailDto emailDto = extractEmail(message);
    sendPasswordResetConfirmationEmail(emailDto.email());
  }

  private void sendPasswordResetEmail(String email, String resetLink) throws MessagingException {
    String subject = "Password Reset Request";
    Map<String, Object> model = Map.of("resetLink", resetLink);

    String htmlContent = generateContent("password-reset-email.ftl", model);

    sendEmail(email, htmlContent, subject);
  }


  /**
   * Send password reset confirmation email.
   *
   * @param email the email
   * @throws MessagingException the messaging exception
   */
  public void sendPasswordResetConfirmationEmail(String email) throws MessagingException {
    String subject = "Password Reset Confirmation";
    String supportUrl = "https://github.com/mairess";

    Map<String, Object> model = Map.of("supportUrl", supportUrl);

    String htmlContent = generateContent("password-reset-confirmation.ftl", model);

    sendEmail(email, htmlContent, subject);
  }

  private String generateContent(String templateName, Map<String, Object> model) {
    try {
      Template template = freemarkerConfig.getTemplate(templateName);
      Writer out = new StringWriter();
      template.process(model, out);
      return out.toString();
    } catch (IOException | TemplateException e) {
      throw new RuntimeException("Error generating email content", e);
    }
  }

  private void sendEmail(String email, String htmlContent, String subject)
      throws MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    helper.setTo(email);
    helper.setSubject(subject);
    helper.setText(htmlContent, true);

    mailSender.send(message);
  }

  private EmailTokenDto extractEmailAndToken(String message) {
    String[] parts = message.split(",");

    String email = parts[0].split(":")[1];
    String token = parts[1].split(":")[1];

    return new EmailTokenDto(email, token);
  }

  private EmailDto extractEmail(String message) {
    String[] parts = message.split(",");

    String email = parts[0].split(":")[1];

    return new EmailDto(email);
  }

}