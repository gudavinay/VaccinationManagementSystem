package com.VMS.backend.repository;

import com.VMS.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);
}
