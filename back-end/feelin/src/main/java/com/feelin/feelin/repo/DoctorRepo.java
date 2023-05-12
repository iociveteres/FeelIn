package com.feelin.feelin.repo;

import com.feelin.feelin.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface DoctorRepo extends JpaRepository<Doctor, Long> {

}
