package com.feelin.feelin.model;

import lombok.*;
import net.bytebuddy.asm.Advice;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.*;
import java.time.LocalDateTime;
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@ToString
@Data
@Entity
@Table(name = "form")

public class Form extends RepresentationModel<Form> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int formId;
    @Column(name = "patient_id", nullable = false)
    private int patientId;


    @Column(name = "pressure_high", nullable = false)
    private int pressureHigh;
    @Column(name = "pressure_low", nullable = false)
    private int pressureLow;
    @Column(name = "pulse", nullable = false)
    private int pulse;
    @Column(name = "temperature", nullable = false)
    private float temperature;
    @Column(name = "sleep_quality", nullable = false)
    private int sleepQuality; // 1 to 10
    @Column(name = "general_state", nullable = false)
    private int generalState; // 1 to 10
    @Column(name = "completion_date", nullable = false)
    private LocalDateTime completionDate;
}
