package com.VMS.backend.repository;

import com.VMS.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {

    List<Appointment> findAllByUserMrnOrderByAppointmentDateTimeDesc(int user_mrn);

    List<Appointment> findAllByUserMrnAndIsCheckedOrderByAppointmentDateTimeDesc(int user_mrn, int isCheckedIn);

    List<Appointment> findAllByClinic_IdAndAppointmentDateStrEqualsAndIsCheckedEquals(int clinicId, String appointmentDateStr, int isChecked);

    List<Appointment> findAllByUserMrnAndAndAppointmentDateTimeBetween(int user_mrn, Date startDate, Date endDate);

    List<Appointment> findAllByClinic_IdAndAppointmentDateTimeBetween(int clinicId, Date startDate, Date endDate);

    List<Appointment> findAllByUserMrnAndIsCheckedOrderByAppointmentDateTimeAsc(int user_mrn, int isCheckedIn);

}
