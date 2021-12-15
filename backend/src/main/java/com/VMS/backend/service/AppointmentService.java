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
            throw new IllegalAccessException("Error in creating appointment");
        }
    }

    public ResponseEntity<?> cancelAppointment(AppointmentPOJO req) {
        Appointment appointment=appointmentRepository.getById(req.getAppointmentID());
        if(appointment!=null){
            appointment.setIsChecked(3);
            Appointment p=appointmentRepository.save(appointment);
            return new ResponseEntity<>(p, HttpStatus.OK);
        }
        return null;
    }

    public List<Appointment> getAppointmentsForUser(int user_mrn, Date time) {
        try {
            List<Appointment> appointments= appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);
            for(Appointment appointment:appointments){
                boolean isPastAppointmnet=isAppointmnetDue(appointment.getAppointmentDateTime(),time);
                if(isPastAppointmnet) {
                    appointment.setIsChecked(2);
                    appointmentRepository.save(appointment);
                }
            }
            return appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);

        } catch (Exception ex) {
            throw new IllegalArgumentException("Error getting appointments for user");
        }
    }

    public boolean isAppointmnetDue(Date date1, Date date2){
       return date1.compareTo(date2)>0?false:true;
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

    public List<Appointment> getCheckedInAppointmentsForUser(int user_mrn, int isChecked) {
        try {
            return appointmentRepository.findAllByUserMrnAndIsCheckedOrderByAppointmentDateTimeDesc(user_mrn, isChecked);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Error getting appointments for user");
        }
    }

    public List<Appointment> getPatientReport(int user_mrn, String startDate, String endDate) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date start=formatter.parse(startDate);
            Date end=formatter.parse(endDate);
            return appointmentRepository.findAllUserMrnAndAndAppointmentDateTimeBetween(user_mrn,start,end);
//            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//            List<Appointment> report=new ArrayList<>();
//            List<Appointment> appointments= appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);
//            Date start=formatter.parse(startDate);
//            Date end=formatter.parse(endDate);
//            for(Appointment appointment:appointments){
//                if(appointment.getAppointmentDateTime().before(end)
//                        && appointment.getAppointmentDateTime().after(start)){
//                    report.add(appointment);
//                }
//            }
            //return report;
        } catch (Exception ex) {
            throw new IllegalArgumentException("Error getting appointments for user");
        }
    }

    public List<Appointment> getPatientReportForAdmin(int clinicId, String startDate, String endDate) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date start=formatter.parse(startDate);
            Date end=formatter.parse(endDate);
            return appointmentRepository.findAllByClinic_IdAndAppointmentDateTimeBetween(clinicId,start,end);
//            List<Appointment> report=new ArrayList<>();
//            List<Appointment> appointments= appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);
//            Date start=formatter.parse(startDate);
//            Date end=formatter.parse(endDate);
//            for(Appointment appointment:appointments){
//                if(appointment.getAppointmentDateTime().before(end)
//                        && appointment.getAppointmentDateTime().after(start)){
//                    report.add(appointment);
//                }
//            }
//            return report;
        } catch (Exception ex) {
            throw new IllegalArgumentException("Error getting appointments for user");
        }
    }
}