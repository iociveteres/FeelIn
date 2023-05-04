package com.feelin.feelin.model;


import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.*;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@ToString
@Data
@Entity
@Table(name = "patients")
public class Patient extends RepresentationModel<Patient> {

    @Id
    @Column(name = "patient_id", nullable = false)
    private long patientId;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "surname", nullable = false)
    private String surname;
    @Column(name = "male", nullable = false)
    private String male;
    @Column(name = "date_of_birth", nullable = false)
    private LocalDateTime dateOfBirth;
    @Column(name = "contact_number", nullable = false)
    private String contactNumber;
    @Column(name = "polyclinic_id", nullable = false)
    private int polyclinicId;
}
