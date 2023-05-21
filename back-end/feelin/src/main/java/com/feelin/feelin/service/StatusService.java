package com.feelin.feelin.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import com.feelin.feelin.model.Status;
import com.feelin.feelin.repo.FormRepo;
import com.feelin.feelin.model.Form;
import com.feelin.feelin.model.StatusMargins;
@Service
public class StatusService {
    @Autowired
    private FormRepo formRepositories;
    private StatusMargins statusMargins;
    @Autowired
    MessageSource messages;
    public Status getStatus(int patientsNumber) {
        ArrayList<Form> forms = formRepositories.findAllFormByPersonId(patientsNumber);
        List<Form> tail = forms.subList(Math.max(forms.size() - 5, 0), forms.size());
        Status status = checkStatus(tail);

        return status;
    }

    private Status checkStatus(List<Form> tail) {
        Status status = new Status();
        int risk_factor = 0;

        for (Form e: tail) {
            // high
            if (StatusMargins.highMargins.pressureHigh < e.getPressureHigh())
                risk_factor += 2;
            if (StatusMargins.highMargins.pressureLow < e.getPressureLow())
                risk_factor += 2;
            if (StatusMargins.highMargins.pulse < e.getPulse())
                risk_factor += 2;
            if (StatusMargins.highMargins.temperature < e.getTemperature())
                risk_factor +=2;

            // low
            if (StatusMargins.lowMargins.pressureHigh > e.getPressureHigh())
                risk_factor += 2;
            if (StatusMargins.lowMargins.pressureLow > e.getPressureLow())
                risk_factor += 2;
            if (StatusMargins.lowMargins.pulse > e.getPulse())
                risk_factor += 2;
            if (StatusMargins.lowMargins.temperature > e.getTemperature())
                risk_factor += 1;
            if (StatusMargins.lowMargins.sleepQuality > e.getSleepQuality())
                risk_factor += 1;
            if (StatusMargins.lowMargins.generalState > e.getGeneralState())
                risk_factor += 1;
        }

        status.setStatusCode(2);
        if (risk_factor >= 4)
            status.setStatusCode(1);
        if (risk_factor >= 12)
            status.setStatusCode(0);


        return status;
    }
}