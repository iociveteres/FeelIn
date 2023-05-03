package com.feelin.feelin.controller;

import com.feelin.feelin.model.Patient;
import com.feelin.feelin.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Locale;

@RestController
@RequestMapping(value="patient")
public class PatientController {

    @Autowired
    private PatientService PatientService;

    @Autowired
    MessageSource messages;

    @GetMapping(value="/{patientId}")
    public ResponseEntity<Patient> getPatient(
            @PathVariable("patientId") int patientId,
            @RequestHeader(value = "Accept-Language", required = false, defaultValue = "en")
                    Locale locale) {
        Patient patient = PatientService.getPatient(patientId);
        return ResponseEntity.ok(patient);
    }

    @GetMapping(value="/byDocId/{doctorId}")
    public ResponseEntity<ArrayList<Patient>> getPatientsByDocId(
            @PathVariable("doctorId") int doctorId,
            @RequestHeader(value = "Accept-Language", required = false, defaultValue = "en")
            Locale locale) {
        ArrayList<Patient> patients = PatientService.getPatientsByDocId(doctorId);
        return ResponseEntity.ok(patients);
    }
}
