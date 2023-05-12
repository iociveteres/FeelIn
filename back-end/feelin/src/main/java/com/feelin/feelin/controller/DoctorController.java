package com.feelin.feelin.controller;

import com.feelin.feelin.model.Doctor;
import com.feelin.feelin.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@CrossOrigin
@RequestMapping(value="doctor")
public class DoctorController {

    @Autowired
    private DoctorService DoctorService;

    @Autowired
    MessageSource messages;

    @GetMapping(value="/{doctorId}")
    public ResponseEntity<Doctor> getDoctor(
            @PathVariable("doctorId") long doctorId) {
        Doctor doctor = DoctorService.getDoctor(doctorId);
        return ResponseEntity.ok(doctor);
    }
}
