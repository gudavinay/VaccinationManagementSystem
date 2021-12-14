package com.VMS.backend.Controller;

import com.VMS.backend.POJO.ClinicPOJO;
import com.VMS.backend.POJO.UserVaccinationPOJO;
import com.VMS.backend.service.UserVaccinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserVaccinationController {

    @Autowired
    UserVaccinationService userVaccinationService;

    @RequestMapping(value = "/checkInAppointment", method = RequestMethod.POST, produces = { "application/json",
            "application/xml" })
    public ResponseEntity<?> checkInAppointment(@RequestBody UserVaccinationPOJO req ){
        return userVaccinationService.addUserVaccinationCheckIn(req);
    }
}
