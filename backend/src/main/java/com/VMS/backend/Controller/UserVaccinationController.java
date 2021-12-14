package com.VMS.backend.Controller;

import com.VMS.backend.POJO.UserVaccinationPOJO;
import com.VMS.backend.service.UserVaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserVaccinationController {

    @Autowired
    UserVaccinationService userVaccinationService;

    @RequestMapping(value = "/checkInAppointment", method = RequestMethod.POST, produces = { "application/json",
            "application/xml" })
    public ResponseEntity<?> checkInAppointment(@RequestBody UserVaccinationPOJO req ){
        return userVaccinationService.addUserVaccinationCheckIn(req);
    }

    @RequestMapping(value = "/getVaccineDueDates", method = RequestMethod.GET, produces = { "application/json",
            "application/xml" })
    public ResponseEntity<?> getVaccineDueDates( @RequestParam("user_mrn") int mrn ){
        return userVaccinationService.getVaccineDueDates(mrn);
    }
}
