package com.VMS.backend.repository;

import com.VMS.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);

    List<User> findUsersByEmailNotNull();

    User findByMrn(int mrn);

}
