package org.maires.employee.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

/**
 * The type Employee.
 */
@Entity(name = "employees")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String photo;

  private String fullName;

  private String position;

  private LocalDate admission;

  @Column(unique = true)
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
   * @param fullName  the full name
   * @param position  the position
   * @param admission the admission
   * @param phone     the phone
   */
  public Employee(String photo, String fullName, String position, LocalDate admission,
      String phone) {
    this.photo = photo;
    this.fullName = fullName;
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
  public String getFullName() {
    return fullName;
  }

  /**
   * Sets name.
   *
   * @param fullName the full name
   */
  public void setFullName(String fullName) {
    this.fullName = fullName;
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
  public LocalDate getAdmission() {
    return admission;
  }

  /**
   * Sets admission.
   *
   * @param admission the admission
   */
  public void setAdmission(LocalDate admission) {
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