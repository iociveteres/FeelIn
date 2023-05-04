package com.feelin.feelin.service;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import com.feelin.feelin.model.Status;
@Service
public class StatusService {
    @Autowired
    MessageSource messages;
    public Status getStatus(int patientsNumber) {
        Status status = new Status();
        // get 10 recent forms, calculate heuristic, return status code
        status.setStatusCode(2);

        return status;
    }
}