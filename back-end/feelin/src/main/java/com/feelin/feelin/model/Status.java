package com.feelin.feelin.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDateTime;
@Getter
@Setter
@ToString

public class Status extends RepresentationModel<Status> {
    private int patientId;

    int statusCode; // 0 - bad, 1 - normal, 2 - good
}
