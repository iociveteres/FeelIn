package com.feelin.feelin.repo;

import com.feelin.feelin.model.Form;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepo extends CrudRepository<Form,Integer> {
}
