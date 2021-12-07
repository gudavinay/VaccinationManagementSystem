package com.VMS.backend.Controller;

import com.VMS.backend.entity.Address;
import com.VMS.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/signup", method = RequestMethod.POST, produces = {"application/json", "application/xml"})
    public ResponseEntity<?> createPatient(
            @RequestParam("email") String email,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam(value = "middleName", required = false) String middleName,
            @RequestParam("dob") String dob,
            @RequestParam("gender") String gender,
            @RequestParam("address") Address address,
            @RequestParam("isVerified") boolean isVerified) {
        try {
            return patientService.createUser(firstName, lastName, middleName, email, dob, gender, address, isVerified);
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }
}
