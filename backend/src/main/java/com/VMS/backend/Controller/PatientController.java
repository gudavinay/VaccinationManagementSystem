package com.VMS.backend.Controller;

import com.VMS.backend.POJO.LoginPOJO;
import com.VMS.backend.POJO.SignUpPOJO;
import com.VMS.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    @RequestMapping(value = "/signup", method = RequestMethod.POST, produces = { "application/json",
            "application/xml" })
    public ResponseEntity<?> createPatient(
            @RequestBody SignUpPOJO req) {
        try {
            return patientService.createUser(req);
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = { "application/json" })
    public ResponseEntity<?> loginUser(@RequestBody LoginPOJO req) {
        try {
            return patientService.loginUser(req);
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }

    @RequestMapping(value = "/getUser/{email}", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getUser(@PathVariable("email") String email){
        return patientService.getUser(email);
    }

    @RequestMapping(value = "/allEmails", method = RequestMethod.GET, produces = { "application/json" })
    public List<String> getAllEmails() {
        return patientService.getAllEmails();
    }

    @RequestMapping(value = "/updateUser/{mrn}", method = RequestMethod.POST, produces = { "application/json" })
    public ResponseEntity<?> updateUser(
            @PathVariable("mrn") int mrn,
            @RequestBody SignUpPOJO updatedUser
    ){
        return patientService.updateUser(mrn, updatedUser);
    }

    @RequestMapping(value = "/updatePassword", method = RequestMethod.POST, produces = { "application/json" })
    public ResponseEntity<?> updatePassword(
            @RequestParam("mrn") int mrn,
            @RequestParam("password") String password
            ){
        return patientService.updatePassword(mrn, password);
    }
}
