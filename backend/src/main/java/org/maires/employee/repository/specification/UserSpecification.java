package org.maires.employee.repository.specification;

import org.maires.employee.entity.User;
import org.springframework.data.jpa.domain.Specification;


/**
 * The type User specification.
 */
public class UserSpecification {


  /**
   * Contains term specification.
   *
   * @param term the term
   * @return the specification
   */
  public static Specification<User> containsTerm(String term) {

    return ((root, query, criteriaBuilder) -> {

      String pattern = "%" + term + "%";

      return criteriaBuilder.or(

          criteriaBuilder.like(root.get("fullName"), pattern),

          criteriaBuilder.like(root.get("username"), pattern),

          criteriaBuilder.like(root.get("email"), pattern),

          criteriaBuilder.like(root.get("role"), pattern)
      );

    });
  }

}