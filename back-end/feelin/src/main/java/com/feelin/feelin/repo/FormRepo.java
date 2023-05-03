package com.feelin.feelin.repo;

import com.feelin.feelin.model.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface FormRepo extends JpaRepository<Form,Integer> {

    @Query(value = "SELECT * FROM form WHERE form.patient_id = :patient_id", nativeQuery = true)
    ArrayList<Form> findAllFormByPersonId(@Param("patient_id") Integer patient_id);
}
