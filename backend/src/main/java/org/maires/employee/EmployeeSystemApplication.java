package org.maires.employee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * The type Employee system application.
 */
@SpringBootApplication
@EnableCaching
public class EmployeeSystemApplication {

  /**
   * The entry point of application.
   *
   * @param args the input arguments
   */
  public static void main(String[] args) {
    SpringApplication.run(EmployeeSystemApplication.class, args);
  }

}