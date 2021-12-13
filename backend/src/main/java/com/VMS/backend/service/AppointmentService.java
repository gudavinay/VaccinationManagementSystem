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
import java.util.Date;
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

    public ResponseEntity<?> createAppointment(AppointmentPOJO req) throws IllegalAccessException {
        try {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm a");
            List<Vaccination> vaccinations = new ArrayList<>();
            User u = patientRepository.findByEmail(req.getUserEmail());
            Optional<Clinic> c = clinicRepository.findById(req.getClinic());
            for (int i : req.getVaccinations()) {
                Optional<Vaccination> v = vaccinationRepository.findById(i);
                v.ifPresent(vaccinations::add);
            }
            Appointment appointment = new Appointment(formatter.parse(req.getAppointmentDateTime()), vaccinations, c.get(), u, 0, formatter.parse(req.getCreatedDate()),req.getAppointmentDateStr(),req.getAppointmentTimeStr());
            Appointment res = appointmentRepository.save(appointment);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception ex) {
            throw new IllegalAccessException("Error in creating appointment");
        }
    }

    public List<Appointment> getAppointmentsForUser(int user_mrn) {
        try {
            return appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Error getting appointments for user");
        }
    }

    public List<String> getAllAppointmentsOnDate(String date, int clinicId) throws ParseException {
        // SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm a");
        List<String> listOfTimes = new ArrayList<>();
        List<Appointment> appointments = appointmentRepository.findAllByClinic_IdAndAppointmentDateStrEquals(clinicId, date);
        for(Appointment app: appointments){
            listOfTimes.add(app.getAppointmentTimeStr());
        }
        return listOfTimes;
    }

    public List<Appointment> getCheckedInAppointmentsForUser(int user_mrn) {
        try {
            return appointmentRepository.findAllByUserMrnAndIsCheckedOrderByAppointmentDateTimeDesc(user_mrn, 1);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Error getting appointments for user");
        }
    }
}