package com.VMS.backend.repository;

import com.VMS.backend.entity.UserVaccinations;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserVaccinationRepository extends JpaRepository<UserVaccinations, Integer> {
        List<UserVaccinations> findByUserId(int id);
}
