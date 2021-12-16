package com.VMS.backend.Controller;

import com.VMS.backend.POJO.AppointmentPOJO;
import com.VMS.backend.entity.Appointment;
import com.VMS.backend.service.AppointmentService;
import com.VMS.backend.util.BadRequest;
import com.VMS.backend.util.ExceptionHandle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @RequestMapping(value = "/createAppointment", method = RequestMethod.POST, produces = { "application/json" })
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentPOJO req) throws IllegalAccessException {
        return appointmentService.createAppointment(req);
    }

    @RequestMapping(value = "/getAppointmentsForUser", method = RequestMethod.GET, produces = {
            "application/json" })
    public ResponseEntity<?>  getAppointmentsForUser(
            @RequestParam("mrn") int user_mrn,
            @RequestParam("time") Date time
    ) {
        return appointmentService.getAppointmentsForUser(user_mrn, time);
    }

    @RequestMapping(value = "/getAllAppointmentsOnDate", method = RequestMethod.GET, produces = {
            "application/json" })
    public List<String> getAllAppointmentsOnDate( 
        @RequestParam("date") String date,
        @RequestParam("clinicId") int clinicId) throws ParseException {
        return appointmentService.getAllAppointmentsOnDate(date,clinicId);
    }

    @RequestMapping(value = "/getCheckedInAppointmentsForUser", method = RequestMethod.GET, produces = {
            "application/json" })
    public ResponseEntity<?> getCheckedInAppointmentsForUser(
        @RequestParam("user_mrn") int user_mrn,
        @RequestParam("isChecked") int isChecked
    ) {
        return appointmentService.getCheckedInAppointmentsForUser(user_mrn,isChecked);
    }

    @RequestMapping(value = "/cancelAppointment", method = RequestMethod.POST, produces = {
            "application/json" })
    public ResponseEntity<?> cancelAppointment(@RequestBody AppointmentPOJO req) {
        return appointmentService.cancelAppointment(req);
    }

    @RequestMapping(value = "/getPatientReport", method = RequestMethod.GET, produces = {
            "application/json" })
    public ResponseEntity<?> getPatientReport(@RequestParam("usermrn") int user_mrn,
                                              @RequestParam("startDate") String startDate,
                                              @RequestParam("endDate") String endDate) {
        return appointmentService.getPatientReport(user_mrn,startDate,endDate);
    }

    @RequestMapping(value = "/getPatientReportForAdmin", method = RequestMethod.GET, produces = {
            "application/json" })
    public ResponseEntity<?> getPatientReportForAdmin(@RequestParam("clinicID") int clinicID,
                                              @RequestParam("startDate") String startDate,
                                              @RequestParam("endDate") String endDate) {
        return appointmentService.getPatientReportForAdmin(clinicID,startDate,endDate);
    }
}
