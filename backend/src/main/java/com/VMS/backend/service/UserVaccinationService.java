package com.VMS.backend.service;

import com.VMS.backend.POJO.ClinicPOJO;
import com.VMS.backend.POJO.UserVaccinationPOJO;
import com.VMS.backend.entity.Appointment;
import com.VMS.backend.entity.Clinic;
import com.VMS.backend.entity.UserVaccinations;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.repository.AppointmentRepository;
import com.VMS.backend.repository.UserVaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserVaccinationService {

    @Autowired
    private UserVaccinationRepository userVaccinationRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public ResponseEntity<?> addUserVaccinationCheckIn(UserVaccinationPOJO req ) {
        List<Vaccination> vaccinationList = req.getVaccinations();
        List<UserVaccinations> userVaccinations=new ArrayList<>();
        try {
            for (Vaccination vacc : vaccinationList) {
                if (vacc.getNumberOfShots() - 1 < 0) {
                    throw new IllegalArgumentException("No shots left");
                }
                Date date = req.getCheckInDate();
                String newDate = addDays(date, vacc.getShotInternalVal()+1);
                System.out.println(newDate);
                UserVaccinations checkin = new UserVaccinations(req.getUser_Id(), vacc.getNumberOfShots() - 1, vacc.getVaccinationId(), newDate);
                UserVaccinations res = userVaccinationRepository.save(checkin);
                userVaccinations.add(res);
            }
            return new ResponseEntity<>(userVaccinations, HttpStatus.OK);
        } catch (Exception ex) {
            return null;
        }
    }

//        Clinic isClinicExists = patientRepository.findByName(req.getName());
//        if(isClinicExists == null){
//            Clinic newClinic = new Clinic(req.getName(),req.getAddress(),req.getNoOfPhysician(), req.getStartBussinessHour() , req.getEndBussinessHour());
//            Clinic res = clinicRepository.save(newClinic);
//            return new ResponseEntity<>(res, HttpStatus.OK);
//        } else {
//            throw new IllegalAccessException("Another Clinic with the same name exists");
//        }

    public String addDays(Date date, int noOfDays){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Calendar c = Calendar.getInstance();
        c.setTime(date); // Using today's date
        c.add(Calendar.DATE, 5); // Adding 5 days
        String output = sdf.format(c.getTime());
        System.out.println(output);
        return output;
    }
}
