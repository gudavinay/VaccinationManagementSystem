package com.VMS.backend.Controller;

import com.VMS.backend.POJO.AppointmentPOJO;
import com.VMS.backend.service.AppointmentService;
import com.VMS.backend.util.BadRequest;
import com.VMS.backend.util.ExceptionHandle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @RequestMapping(value = "/createAppointment", method = RequestMethod.POST, produces ={"application/json"})
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentPOJO req) throws IllegalAccessException{
        try {
            return appointmentService.createAppointment(req);
        } catch (Exception ex){
            return ResponseEntity.badRequest().body(new ExceptionHandle(new BadRequest(400, ex.getMessage())));
        }
    }
}
