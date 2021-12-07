package com.VMS.backend.service;

import com.VMS.backend.entity.Address;
import com.VMS.backend.entity.User;
import com.VMS.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public ResponseEntity<?> createUser(String firstname, String lastname, String middleName, String email, String dob, String gender,
                                        Address address, boolean isVerified) {
        User isUser =patientRepository.findByEmail(email);
        if (isUser == null) {
            int mrn=this.getRandomNumber(100,999999999);
            boolean isAdmin=false;
            if(email.endsWith("sjsu.edu")){
                isAdmin=true;
            }
            User newPatient = new User(firstname, lastname,middleName,email,dob, gender, address, isVerified,mrn,isAdmin);
            User res = patientRepository.save(newPatient);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            throw new IllegalArgumentException("Another patient with the same email already exists.");
        }
    }

    public int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }
}
