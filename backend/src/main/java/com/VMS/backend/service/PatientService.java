package com.VMS.backend.service;

import com.VMS.backend.entity.Appointment;
import com.VMS.backend.entity.User;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.repository.AppointmentRepository;
import com.VMS.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public ResponseEntity<?> createUser(User req) {
        User isUser =patientRepository.findByEmail(req.getEmail());
        if (isUser == null) {
            //int mrn=this.getRandomNumber(100,99999);
            boolean isAdmin=false;
            if(req.getEmail().endsWith("sjsu.edu")){
                isAdmin=true;
            }
            User newPatient = new User(req.getFirstName(), req.getLastName(), req.getMiddleName(),req.getEmail(),
                    req.getDob(), req.getGender(), req.getAddress(), req.isVerified() , isAdmin, req.getPassword());
            User res = patientRepository.save(newPatient);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            throw new IllegalArgumentException("Another patient with the same email already exists.");
        }
    }

    public ResponseEntity<?> loginUser(User req) {
        User isUser =patientRepository.findByEmail(req.getEmail());
        if(isUser==null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }else{
            if(req.getPassword()==isUser.getPassword()){
                return new ResponseEntity<>(isUser, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(isUser, HttpStatus.NOT_FOUND);
            }
        }
    }

    public int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

    //need to rework
    public List<Vaccination> getVaccinationHistory (int user_mrn, Date current) {
        try {
            List<Appointment> appointmentList=appointmentRepository.findAllByUserMrn(user_mrn);

        } catch (Exception ex) {
            throw new IllegalArgumentException("Error getting vaccination history for user");
        }
        return null;
    }
}
