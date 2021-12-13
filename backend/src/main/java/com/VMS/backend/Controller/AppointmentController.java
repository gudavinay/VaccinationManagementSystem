package com.VMS.backend.Controller;

import com.VMS.backend.POJO.AppointmentPOJO;
import com.VMS.backend.entity.Appointment;
import com.VMS.backend.service.AppointmentService;
import com.VMS.backend.util.BadRequest;
import com.VMS.backend.util.ExceptionHandle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @RequestMapping(value = "/createAppointment", method = RequestMethod.POST, produces = { "application/json" })
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentPOJO req) throws IllegalAccessException {
        try {
            return appointmentService.createAppointment(req);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new ExceptionHandle(new BadRequest(400, ex.getMessage())));
        }
    }

    @RequestMapping(value = "/getAppointmentsForUser/{user_mrn}", method = RequestMethod.GET, produces = {
            "application/json" })
    public List<Appointment> getAppointmentsForUser(
            @PathVariable("user_mrn") int user_mrn
    ) {
        return appointmentService.getAppointmentsForUser(user_mrn);
    }

    @RequestMapping(value = "/getAllAppointmentsOnDate", method = RequestMethod.GET, produces = {
            "application/json" })
    public List<Appointment> getAllAppointmentsOnDate( 
        @PathVariable("date") String date,
        @PathVariable("clinic") int clinicId) {
        return appointmentService.getAllAppointmentsOnDate(date,clinicId);
    }
}
