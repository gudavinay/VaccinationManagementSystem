package com.VMS.backend.Controller;

import com.VMS.backend.entity.User;
import com.VMS.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    @RequestMapping(value = "/signup", method = RequestMethod.POST, produces = {"application/json", "application/xml"})
    public ResponseEntity<?> createPatient(
            @RequestBody User req){
        try {
            return patientService.createUser(req);
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }
}
