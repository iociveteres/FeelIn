package com.feelin.feelin.repo;

import com.feelin.feelin.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface PatientRepo extends JpaRepository<Patient,Long> {

    @Query(value = """
            SELECT patient.*
            FROM patients as patient
            INNER JOIN polyclinics as clinic
                ON patient.polyclinic_id = clinic.polyclinic_id
            INNER JOIN doctor as doctor
                ON patient.polyclinic_id = doctor.polyclinic_id
            WHERE doctor.doctor_id = :doctor_id""", nativeQuery = true)
    ArrayList<Patient> findAllPatientsByDocId(@Param("doctor_id") Long doctorId);
}
