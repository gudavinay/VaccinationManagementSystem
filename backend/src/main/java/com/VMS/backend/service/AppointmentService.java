package com.VMS.backend.service;

import com.VMS.backend.entity.*;
import com.VMS.backend.repository.AppointmentRepository;
import jdk.vm.ci.meta.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public ResponseEntity<?> createAppointment(String date, User userId, List<Vaccination> vaccine, Clinic clinic) throws ParseException, IllegalAccessException {
        try{
            SimpleDateFormat formatter = new SimpleDateFormat();
            Appointment appointment = new Appointment(formatter.parse(date), vaccine,clinic,userId,0);
            Appointment res = appointmentRepository.save(appointment);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }catch (Exception ex){
            throw new IllegalAccessException("Error in creating appointment");
        }
    }
}
