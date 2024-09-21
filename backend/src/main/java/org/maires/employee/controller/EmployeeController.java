package org.maires.employee.controller;

import com.fasterxml.jackson.databind.JsonMappingException;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.maires.employee.controller.dto.EmployeeCreationDto;
import org.maires.employee.controller.dto.EmployeeDto;
import org.maires.employee.entity.Employee;
import org.maires.employee.service.EmployeeService;
import org.maires.employee.service.exception.EmployeeNotFoundException;
import org.maires.employee.service.exception.FutureDateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * The type Employee controller.
 */
@RestController
@RequestMapping("/employees")
public class EmployeeController {

  private final EmployeeService employeeService;


  /**
   * Instantiates a new Employee controller.
   *
   * @param employeeService the employee service
   */
  @Autowired
  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }


  /**
   * Find all response entity.
   *
   * @param pageNumber the page number
   * @param pageSize   the page size
   * @return the response entity
   */
  @GetMapping
  @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
  public ResponseEntity<Map<String, Object>> findAll(
      @RequestParam(required = false, defaultValue = "0") int pageNumber,
      @RequestParam(required = false, defaultValue = "20") int pageSize
  ) {

    Map<String, Object> employees = new HashMap<>(employeeService.findAll(pageNumber, pageSize));

    List<?> data = (List<?>) employees.get("employees");

    List<EmployeeDto> employeeDtoList = data
        .stream()
        .map(employee -> EmployeeDto.fromEntity((Employee) employee))
        .toList();

    employees.put("employees", employeeDtoList);

    return ResponseEntity.status(HttpStatus.OK).body(employees);

  }


  /**
   * Find by id employee dto.
   *
   * @param employeeId the employee id
   * @return the employee dto
   * @throws EmployeeNotFoundException the employee not found exception
   */
  @GetMapping("/{employeeId}")
  @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
  public ResponseEntity<EmployeeDto> findById(
      @PathVariable Long employeeId
  ) throws EmployeeNotFoundException {

    EmployeeDto employee = EmployeeDto.fromEntity(employeeService.findById(employeeId));

    return ResponseEntity.status(HttpStatus.OK).body(employee);

  }


  /**
   * Create employee dto.
   *
   * @param employeeCreationDto the employee creation dto
   * @return the employee dto
   * @throws FutureDateException the future date exception
   */
  @PostMapping
  @PreAuthorize("hasAnyAuthority('ADMIN')")
  public ResponseEntity<EmployeeDto> create(
      @Valid @RequestBody EmployeeCreationDto employeeCreationDto) throws FutureDateException {

    Employee newEmployee = employeeService.create(employeeCreationDto.toEntity());

    return ResponseEntity.status(HttpStatus.CREATED).body(EmployeeDto.fromEntity(newEmployee));

  }


  /**
   * Update employee dto.
   *
   * @param employeeId          the employee id
   * @param employeeCreationDto the employee creation dto
   * @return the employee dto
   * @throws JsonMappingException      the json mapping exception
   * @throws EmployeeNotFoundException the employee not found exception
   */
  @PutMapping("/{employeeId}")
  @PreAuthorize("hasAnyAuthority('ADMIN')")
  public ResponseEntity<EmployeeDto> update(
      @PathVariable Long employeeId,
      @Valid @RequestBody EmployeeCreationDto employeeCreationDto
  ) throws JsonMappingException, EmployeeNotFoundException {

    Employee employeeUpdated = employeeService.update(employeeId, employeeCreationDto);

    return ResponseEntity.status(HttpStatus.OK).body(EmployeeDto.fromEntity(employeeUpdated));

  }

  /**
   * Delete by id.
   *
   * @param employeeId the employee id
   * @return the response entity
   * @throws EmployeeNotFoundException the employee not found exception
   */
  @DeleteMapping("/{employeeId}")
  @PreAuthorize("hasAnyAuthority('ADMIN')")
  public ResponseEntity<Void> deleteById(
      @PathVariable Long employeeId
  ) throws EmployeeNotFoundException {

    employeeService.deleteById(employeeId);

    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

  }

}