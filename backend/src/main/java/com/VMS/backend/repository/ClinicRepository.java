package com.VMS.backend.repository;

import com.VMS.backend.entity.Appointment;
import com.VMS.backend.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ClinicRepository extends JpaRepository<Clinic, Integer> {

    Clinic findByName(String clinicName);

}
