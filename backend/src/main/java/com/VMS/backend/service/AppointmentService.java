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
            Appointment res=null;
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm a");
            List<Vaccination> vaccinations = new ArrayList<>();
            User u = patientRepository.findByEmail(req.getUserEmail());
            Optional<Clinic> c = clinicRepository.findById(req.getClinic());
            for (int i : req.getVaccinations()) {
                Optional<Vaccination> v = vaccinationRepository.findById(i);
                v.ifPresent(vaccinations::add);
            }

            Optional<Appointment> appointment=appointmentRepository.findById(req.getAppointmentID());
            if(appointment.isPresent()){
                res=appointment.get();
                res.setClinic(c.get());
                res.setVaccinations(vaccinations);
                res.setAppointmentDateTime(formatter.parse(req.getAppointmentDateTime()));
                res.setAppointmentDateStr(req.getAppointmentDateStr());
                res.setAppointmentTimeStr(req.getAppointmentTimeStr());
            }else{
                res = new Appointment(formatter.parse(req.getAppointmentDateTime()), vaccinations, c.get(), u, 0, formatter.parse(req.getCreatedDate()),req.getAppointmentDateStr(),req.getAppointmentTimeStr());
            }
            Appointment saveAppointment = appointmentRepository.save(res);
            return new ResponseEntity<>(saveAppointment, HttpStatus.OK);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to create an appointment");
        }
    }

    public ResponseEntity<?> cancelAppointment(AppointmentPOJO req) {
        Appointment appointment=appointmentRepository.getById(req.getAppointmentID());
        if(appointment!=null){
            appointment.setIsChecked(3);
            Appointment p=appointmentRepository.save(appointment);
            return new ResponseEntity<>(p, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to cancel as appointment is not present");
    }

    public ResponseEntity<?>  getAppointmentsForUser(int user_mrn, Date time) {
        try {
            List<Appointment> appointments= appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);
            for(Appointment appointment:appointments){
                boolean isPastAppointmnet=isAppointmnetDue(appointment.getAppointmentDateTime(),time);
                if(isPastAppointmnet && appointment.getIsChecked()!=1) {
                    appointment.setIsChecked(2);
                    appointmentRepository.save(appointment);
                }
            }
            List<Appointment> appointmentList=appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);
            return new ResponseEntity<>(appointmentList, HttpStatus.OK);
           // return appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to get appointments from database");
        }
    }

    public boolean isAppointmnetDue(Date date1, Date date2){
       return date1.compareTo(date2)>0?false:true;
    }

    public List<String> getAllAppointmentsOnDate(String date, int clinicId) throws ParseException {
        // SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm a");
        List<String> listOfTimes = new ArrayList<>();
        List<Appointment> appointments = appointmentRepository.findAllByClinic_IdAndAppointmentDateStrEqualsAndIsCheckedEquals(clinicId, date, 0);
        for(Appointment app: appointments){
            listOfTimes.add(app.getAppointmentTimeStr());
        }
        return listOfTimes;
    }

    public ResponseEntity<?> getCheckedInAppointmentsForUser(int user_mrn, int isChecked) {
        try {
            List<Appointment> checkedinApp= appointmentRepository.findAllByUserMrnAndIsCheckedOrderByAppointmentDateTimeAsc(user_mrn, isChecked);
            return new ResponseEntity<>(checkedinApp, HttpStatus.OK);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to get checkedIn appointments from database");
        }
    }

    public ResponseEntity<?> getPatientReport(int user_mrn, String startDate, String endDate) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date start=formatter.parse(startDate);
            Date end=formatter.parse(endDate);
            List<Appointment> patientreport= appointmentRepository.findAllByUserMrnAndAndAppointmentDateTimeBetween(user_mrn,start,end);
            return new ResponseEntity<>(patientreport, HttpStatus.OK);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to get Patient report");
        }
    }

    public ResponseEntity<?> getPatientReportForAdmin(int clinicId, String startDate, String endDate) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date start=formatter.parse(startDate);
            Date end=formatter.parse(endDate);
            List<Appointment> patientReportForAdmin =appointmentRepository.findAllByClinic_IdAndAppointmentDateTimeBetween(clinicId,start,end);
            return new ResponseEntity<>(patientReportForAdmin, HttpStatus.OK);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to get Patient report for admin");
        }
    }
}