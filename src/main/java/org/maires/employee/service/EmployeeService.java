package org.maires.employee.service;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import org.maires.employee.controller.dto.EmployeeCreationDto;
import org.maires.employee.entity.Employee;
import org.maires.employee.repository.EmployeeRepository;
import org.maires.employee.service.exception.EmployeeNotFoundException;
import org.maires.employee.service.exception.FutureDateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * The type Employee service.
 */
@Service
public class EmployeeService {

  private final EmployeeRepository employeeRepository;
  private final ObjectMapper objectMapper;


  /**
   * Instantiates a new Employee service.
   *
   * @param employeeRepository the employee repository
   * @param objectMapper       the object mapper
   */
  @Autowired
  public EmployeeService(EmployeeRepository employeeRepository, ObjectMapper objectMapper) {
    this.employeeRepository = employeeRepository;
    this.objectMapper = objectMapper;
  }


  /**
   * Find all list.
   *
   * @return the list
   */
  public List<Employee> findAll() {

    return employeeRepository.findAll();

  }


  /**
   * Find by id employee.
   *
   * @param employeeId the employee id
   * @return the employee
   * @throws EmployeeNotFoundException the employee not found exception
   */
  public Employee findById(Long employeeId) throws EmployeeNotFoundException {

    return employeeRepository.findById(employeeId).orElseThrow(

        () -> new EmployeeNotFoundException(employeeId.toString())

    );

  }


  /**
   * Create employee.
   *
   * @param employee the employee
   * @return the employee
   */
  public Employee create(Employee employee) throws FutureDateException {

    LocalDate admission = employee.getAdmission();

    if (admission.isAfter(LocalDate.now())) {
      throw new FutureDateException("Admission cannot be future date!");
    }

    return employeeRepository.save(employee);

  }


  /**
   * Update employee.
   *
   * @param employeeId          the employee id
   * @param employeeCreationDto the employee creation dto
   * @return the employee
   * @throws EmployeeNotFoundException the employee not found exception
   * @throws JsonMappingException      the json mapping exception
   */
  @Transactional
  public Employee update(
      Long employeeId,
      EmployeeCreationDto employeeCreationDto
  ) throws EmployeeNotFoundException, JsonMappingException {

    Employee employeeToUpdate = findById(employeeId);

    objectMapper.updateValue(employeeToUpdate, employeeCreationDto);

    return employeeRepository.save(employeeToUpdate);

  }

  /**
   * Delete by id.
   *
   * @param employeeId the employee id
   * @throws EmployeeNotFoundException the employee not found exception
   */
  public void deleteById(Long employeeId) throws EmployeeNotFoundException {

    Employee employee = findById(employeeId);

    employeeRepository.delete(employee);
  }
}