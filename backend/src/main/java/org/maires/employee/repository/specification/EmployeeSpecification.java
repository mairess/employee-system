package org.maires.employee.repository.specification;

import org.maires.employee.entity.Employee;
import org.springframework.data.jpa.domain.Specification;

/**
 * The type Employee specification.
 */
public class EmployeeSpecification {

  /**
   * Contains term specification.
   *
   * @param term the term
   * @return the specification
   */
  public static Specification<Employee> containsTerm(String term) {

    return ((root, query, criteriaBuilder) -> {

      String pattern = "%" + term + "%";

      return criteriaBuilder.or(

          criteriaBuilder.like(root.get("fullName"), pattern),

          criteriaBuilder.like(root.get("position"), pattern),

          criteriaBuilder.like(

              criteriaBuilder.function("TO_CHAR", String.class, root.get("admission"),

                  criteriaBuilder.literal("yyyy-MM-dd")), pattern

          ),

          criteriaBuilder.like(root.get("phone"), pattern)
      );

    });
  }

}