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
@Table(name = "doctor")
public class Doctor extends RepresentationModel<Doctor> {

    @Id
    @Column(name = "doctor_id", nullable = false)
    private long doctorId;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "surname", nullable = false)
    private String surname;
    @Column(name = "specialization", nullable = false)
    private String specialization;
    @Column(name = "cabinet_number", nullable = false)
    private int cabinetNumber;
    @Column(name = "contact_number", nullable = false)
    private String contactNumber;
    @Column(name = "polyclinic_id", nullable = false)
    private int polyclinicId;
}
