package com.VMS.backend.service;

import com.VMS.backend.POJO.LoginPOJO;
import com.VMS.backend.POJO.SignUpPOJO;
import com.VMS.backend.entity.Address;
import com.VMS.backend.entity.User;
import com.VMS.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public ResponseEntity<?> createUser(SignUpPOJO req) {
        User isUser = patientRepository.findByEmail(req.getEmail());
        if (isUser == null) {
            int mrn = this.getRandomNumber(100, 99999);
            User newUser = new User(mrn,req.getEmail(), req.getFirstName(), req.getLastName(), req.getMiddleName(),
                    req.getDob(), req.getGender(), new Address(req.getAddress().getStreet(),
                    req.getAddress().getAptNo(), req.getAddress().getCity(), req.getAddress().getState(),
                    req.getAddress().getZipcode()), req.isVerified(), req.isAdmin(), req.getPassword());
            User res = patientRepository.save(newUser);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Another patient with the same email already exists.");
        }
    }

    public ResponseEntity<?> loginUser(LoginPOJO req) {
        User isUser = patientRepository.findByEmail(req.getEmail());
        if(isUser==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).contentType(MediaType.APPLICATION_JSON).body("User Not Found");
        }
        if (req.getPassword().equals(isUser.getPassword())) {
            return new ResponseEntity<>(isUser, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).contentType(MediaType.APPLICATION_JSON).body("Wrong Username or Password");
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

    public ResponseEntity<?> getUser(String email){
        User user = patientRepository.findByEmail(email);
        if (user!=null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> updateUser(int mrn, SignUpPOJO updatedUser){
        User user = patientRepository.findByMrn(mrn);
        if(user != null){
            user.setFirstName(updatedUser.getFirstName());
            user.setMiddleName(updatedUser.getMiddleName());
            user.setLastName(updatedUser.getLastName());
            user.setDob(updatedUser.getDob());
            user.setGender(updatedUser.getGender());
            user.setAddress(new Address(updatedUser.getAddress().getStreet(),updatedUser.getAddress().getAptNo(),
                    updatedUser.getAddress().getCity(), updatedUser.getAddress().getState(),
                    updatedUser.getAddress().getZipcode()));
            user.setPassword(updatedUser.getPassword());
            patientRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> updatePassword(int mrn, String password){
        User user = patientRepository.findByMrn(mrn);
        if(user != null){
            user.setPassword(password);
            patientRepository.save(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }


}
