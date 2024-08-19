package org.maires.employee.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

/**
 * The type Employee.
 */
@Entity(name = "employees")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String photo;

  private String name;

  private String position;

  private LocalDateTime admission;

  private String phone;

  /**
   * Instantiates a new Employee.
   */
  public Employee() {
  }

  /**
   * Instantiates a new Employee.
   *
   * @param photo     the photo
   * @param name      the name
   * @param position  the position
   * @param admission the admission
   * @param phone     the phone
   */
  public Employee(String photo, String name, String position, LocalDateTime admission,
      String phone) {
    this.photo = photo;
    this.name = name;
    this.position = position;
    this.admission = admission;
    this.phone = phone;
  }

  /**
   * Gets id.
   *
   * @return the id
   */
  public Long getId() {
    return id;
  }

  /**
   * Sets id.
   *
   * @param id the id
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * Gets photo.
   *
   * @return the photo
   */
  public String getPhoto() {
    return photo;
  }

  /**
   * Sets photo.
   *
   * @param photo the photo
   */
  public void setPhoto(String photo) {
    this.photo = photo;
  }

  /**
   * Gets name.
   *
   * @return the name
   */
  public String getName() {
    return name;
  }

  /**
   * Sets name.
   *
   * @param name the name
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * Gets position.
   *
   * @return the position
   */
  public String getPosition() {
    return position;
  }

  /**
   * Sets position.
   *
   * @param position the position
   */
  public void setPosition(String position) {
    this.position = position;
  }

  /**
   * Gets admission.
   *
   * @return the admission
   */
  public LocalDateTime getAdmission() {
    return admission;
  }

  /**
   * Sets admission.
   *
   * @param admission the admission
   */
  public void setAdmission(LocalDateTime admission) {
    this.admission = admission;
  }

  /**
   * Gets phone.
   *
   * @return the phone
   */
  public String getPhone() {
    return phone;
  }

  /**
   * Sets phone.
   *
   * @param phone the phone
   */
  public void setPhone(String phone) {
    this.phone = phone;
  }
}