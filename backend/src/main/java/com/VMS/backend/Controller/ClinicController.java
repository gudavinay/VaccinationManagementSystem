package com.VMS.backend.Controller;


import com.VMS.backend.POJO.ClinicPOJO;
import com.VMS.backend.entity.Clinic;
import com.VMS.backend.service.AppointmentService;
import com.VMS.backend.service.ClinicService;
import com.VMS.backend.util.BadRequest;
import com.VMS.backend.util.ExceptionHandle;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClinicController {

    @Autowired
    private ClinicService clinicService;
    @Autowired
    private AppointmentService appointmentService;


    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    @RequestMapping(value = "/clinic", method = RequestMethod.POST, produces ={"application/json"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createClinic( @RequestBody ClinicPOJO req){
        try {
            return clinicService.createClinic(req);
        } catch (Exception ex){
            return ResponseEntity.badRequest().body(new ExceptionHandle(new BadRequest(400, ex.getMessage())));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    @RequestMapping(value = "/getAllClinics", method = RequestMethod.GET, produces = {"application/json"})
    public List<Clinic> getAllClinics(){
        return clinicService.getAllClinics();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    @RequestMapping(value = "/clinic/{clinicId}", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getClinicById(
            @PathVariable("clinicId") int clinicId
    ) throws NotFoundException {
        return clinicService.getClinicById(clinicId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    @RequestMapping(value = "/clinic/{clinicName}", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getClinicByName(
            @PathVariable("clinicName") String clinicName
    ) throws NotFoundException {
        return clinicService.getClinicByName(clinicName);
    }

}
