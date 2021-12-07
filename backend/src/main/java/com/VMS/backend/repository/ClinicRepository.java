package com.VMS.backend.repository;

import com.VMS.backend.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepository extends JpaRepository<Clinic, Integer> {

    Clinic findByName(String clinicName);
}
