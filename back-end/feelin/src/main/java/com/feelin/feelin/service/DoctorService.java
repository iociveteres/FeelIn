package com.feelin.feelin.service;

import com.feelin.feelin.model.Doctor;
import com.feelin.feelin.repo.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    @Autowired
    MessageSource messages;

    @Autowired
    private DoctorRepo doctorRepo;

    public Doctor getDoctor(long doctorId) {
        return doctorRepo.findById(doctorId).orElseThrow();
    }
}
