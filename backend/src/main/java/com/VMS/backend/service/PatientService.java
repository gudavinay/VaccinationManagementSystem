package com.VMS.backend.service;

import com.VMS.backend.POJO.LoginPOJO;
import com.VMS.backend.entity.User;
import com.VMS.backend.repository.AppointmentRepository;
import com.VMS.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public ResponseEntity<?> createUser(User req) {
        User isUser = patientRepository.findByEmail(req.getEmail());
        if (isUser == null) {
            int mrn = this.getRandomNumber(100, 99999);
            User newPatient = new User(mrn, req.getFirstName(), req.getLastName(), req.getMiddleName(), req.getEmail(),
                    req.getDob(), req.getGender(), req.getAddress(), req.isVerified(), req.isAdmin(),
                    req.getPassword());
            User res = patientRepository.save(newPatient);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            throw new IllegalArgumentException("Another patient with the same email already exists.");
        }
    }

    public ResponseEntity<?> loginUser(LoginPOJO req) {
        User isUser = patientRepository.findByEmail(req.getEmail());
        System.out.println(isUser.getEmail());
        if (isUser == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            if (req.getPassword().equals(isUser.getPassword())) {
                System.out.println("Password verified");
                return new ResponseEntity<>(isUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(isUser, HttpStatus.NOT_FOUND);
            }
        }
    }

    public List<String> getAllEmails() {
        List<User> users = patientRepository.findUsersByEmailNotNull();
        List<String> emails = new ArrayList<>();
        for (User user : users) {
            emails.add(user.getEmail());
        }
        return emails;
    }

    public int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

    // need to rework
    // public List<VaccinationHistoryPojo> getVaccinationHistory (int user_mrn, int
    // isCheckedIn) {
    // try {
    // List<Vaccination> vaccinationList = new ArrayList<>();
    // List<VaccinationHistoryPojo> vaccinationHistory=new ArrayList<>();
    // List<Appointment>
    // appointmentList=appointmentRepository.findAllByUserMrnAndIsCheckedIn(user_mrn,
    // 1 );
    // for(Appointment appointment: appointmentList){
    // VaccinationHistoryPojo vp= new
    // VaccinationHistoryPojo(appointment.getVaccinations(),
    // appointment.getClinic(), appointment.getAppointmentDateTime());
    // vaccinationHistory.add(vp);
    // }
    // return vaccinationHistory;
    //
    // } catch (Exception ex) {
    // throw new IllegalArgumentException("Error getting vaccination history for
    // user");
    // }
    //
    // }
    
}
