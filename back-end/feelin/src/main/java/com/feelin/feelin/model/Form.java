package com.feelin.feelin.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDateTime;
@Getter
@Setter
@ToString

public class Form extends RepresentationModel<Form> {
    private int patientId;
    private int formId;

    private int pressureHigh;
    private int pressureLow;
    private int pulse;
    private float temperature; // 1 to 10
    private int sleepQuality; // 1 to 10
    private int generalState;

    private LocalDateTime completionDate;
}
