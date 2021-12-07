package com.VMS.backend.repository;

import com.VMS.backend.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccinationRepository extends JpaRepository<Vaccination, Integer> {
    Vaccination findByVaccinationName(String vaccinationName);
}
