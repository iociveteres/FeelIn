package com.feelin.feelin.service;

import com.feelin.feelin.model.Form;
import com.feelin.feelin.model.Patient;
import com.feelin.feelin.repo.FormRepo;
import com.feelin.feelin.repo.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PatientService {
    @Autowired
    MessageSource messages;

    @Autowired
    private PatientRepo patientRepo;

    public Patient getPatient(int patientsNumber) {
        return patientRepo.findById(patientsNumber).orElseThrow();
    }

    public ArrayList<Patient> getPatientsByDocId(int doctorId) {
        return patientRepo.findAllPatientsByDocId(doctorId);
    }
}
