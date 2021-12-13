package com.VMS.backend.repository;

import com.VMS.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {

    List<Appointment> findAllByUserMrnOrderByAppointmentDateTimeDesc(int user_mrn);

    List<Appointment> findAllByUserMrn(int user_mrn);
}
