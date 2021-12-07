package com.VMS.backend.repository;

import com.VMS.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {
        List<Appointment> findbyUser(int mrn);
}
