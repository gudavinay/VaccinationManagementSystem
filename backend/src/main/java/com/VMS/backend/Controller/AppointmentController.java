package com.VMS.backend.Controller;

import com.VMS.backend.entity.*;
import com.VMS.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.*;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @RequestMapping(value = "/createAppointment", method = RequestMethod.POST, produces = {"application/json", "application/xml"})
    public ResponseEntity<?> createAppointment(
            @RequestParam("appointmentDateTime") String appointmentDateTime,
            @RequestParam("vaccinations") List<Vaccination> vaccinations,
            @RequestParam("clinic") Clinic clinic,
            @RequestParam("user") User user_id) {
        try {
            return appointmentService.createAppointment(appointmentDateTime, user_id, vaccinations, clinic);
        } catch (Exception ex) {
            return null;
        } 
    }
}
