package com.feelin.feelin.repo;

import com.feelin.feelin.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepo extends JpaRepository<Patient,Integer> {

}
