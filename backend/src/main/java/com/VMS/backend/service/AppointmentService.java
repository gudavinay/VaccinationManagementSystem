package com.VMS.backend.service;

import com.VMS.backend.POJO.AppointmentPOJO;
import com.VMS.backend.entity.*;
import com.VMS.backend.repository.AppointmentRepository;
import com.VMS.backend.repository.ClinicRepository;
import com.VMS.backend.repository.PatientRepository;
import com.VMS.backend.repository.VaccinationRepository;

//import jdk.vm.ci.meta.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private VaccinationRepository vaccinationRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private PatientRepository patientRepository;

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

    public ResponseEntity<?> createAppointment(AppointmentPOJO req) throws IllegalAccessException {
        try{
            SimpleDateFormat formatter = new SimpleDateFormat();
            List<Vaccination> vaccinations=new ArrayList<>();
            Optional<User> u = patientRepository.findById(req.getUser_id());
            Optional<Clinic> c = clinicRepository.findById(req.getClinic());
            for(int i:req.getVaccinations()){
                Optional<Vaccination> v= vaccinationRepository.findById(i);
                if(v.isPresent())
                    vaccinations.add(v.get());
            }
            Appointment appointment = new Appointment(formatter.parse(req.getAppointmentDateTime()), vaccinations, c.get(), u.get(), 0);
            Appointment res = appointmentRepository.save(appointment);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }catch (Exception ex){
            throw new IllegalAccessException("Error in creating appointment");
        }
    }
}
