package com.VMS.backend.repository;

import com.VMS.backend.entity.UserVaccinations;
import com.VMS.backend.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserVaccinationRepository extends JpaRepository<UserVaccinations, Integer> {

}
