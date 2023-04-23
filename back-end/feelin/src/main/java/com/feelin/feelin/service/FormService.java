package com.feelin.feelin.service;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import com.feelin.feelin.model.Form;
@Service
public class FormService {
    @Autowired
    MessageSource messages;
    public Form getForm(int patientsNumber) {
        Form form = new Form();
        form.setPatientId(new Random().nextInt(1000));
        form.setFormId(new Random().nextInt(1000));

        form.setPressureHigh(new Random().nextInt(100,180));
        form.setPressureLow(new Random().nextInt(60,120));
        form.setPulse(new Random().nextInt(50, 100));
        form.setTemperature(new Random().nextFloat(35, 41));
        form.setSleepQuality(new Random().nextInt(1000));
        form.setGeneralState(new Random().nextInt(1000));

        form.setCompletionDate(LocalDateTime.now());

        return form;
    }


    public String createForm(Form form, Locale locale){
        String responseMessage = null;
        if(form != null) {
            //form.setHospitalName(hospitalName);
            responseMessage = String.format(messages.getMessage("form.create.message", null, locale), form.toString());
        }
        return responseMessage;
    }

    public String updateForm(Form form, int patientId, Locale locale) {
        //mock find entry by patientId, formId
        Form original = new Form();
        // you get it from form too
        original.setPatientId(patientId);
        original.setFormId(new Random().nextInt(1000));

        original.setPressureHigh(form.getPressureHigh());
        original.setPressureLow(form.getPressureLow());
        original.setPulse(form.getPulse());
        original.setTemperature(form.getTemperature());
        original.setSleepQuality(form.getSleepQuality());
        original.setGeneralState(form.getGeneralState());
        // take it from front-end
        original.setCompletionDate(form.getCompletionDate());

        String responseMessage = null;
        if (form != null) {
            responseMessage = String.format(messages.getMessage("form.update.message", null, locale), form.toString());
        }
        return responseMessage;
    }

    public String deleteForm(Form form, int patientNumber, Locale locale){
        String responseMessage = null;
        //mock check that entry exists
        if (form != null) {
            responseMessage = String.format(messages.getMessage("form.delete.message", null, locale), form.toString());
        }
        return responseMessage;
    }

}