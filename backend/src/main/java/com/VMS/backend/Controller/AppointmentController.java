package com.VMS.backend.Controller;

import com.VMS.backend.entity.Address;
import com.VMS.backend.entity.Appointment;
import com.VMS.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppointmentController {
//    @RequestMapping(value = "/createAppointment", method = RequestMethod.POST, produces = {"application/json", "application/xml"})
//    public ResponseEntity<?> createAppointment(
//            @RequestParam("email") String email,
//            @RequestParam("firstName") String firstName,
//            @RequestParam("lastName") String lastName,
//            @RequestParam(value = "middleName", required = false) String middleName,
//            @RequestParam("dob") String dob,
//            @RequestParam("gender") String gender,
//            @RequestParam("address") Address address,
//            @RequestParam("isVerified") boolean isVerified) {
//        try {
//            return patientService.createUser(firstName, lastName, middleName, email, dob, gender, address, isVerified);
//        } catch (IllegalArgumentException ex) {
//            return null;
//        }
//    }
    
}
