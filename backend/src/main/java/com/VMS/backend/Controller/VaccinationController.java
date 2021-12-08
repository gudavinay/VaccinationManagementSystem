package com.VMS.backend.Controller;


import com.VMS.backend.entity.Clinic;
import com.VMS.backend.entity.Disease;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.service.VaccinationService;
import com.VMS.backend.util.BadRequest;
import com.VMS.backend.util.ExceptionHandle;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VaccinationController {

    @Autowired
    private VaccinationService vaccinationService;

    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    @RequestMapping(value = "/vaccination", method = RequestMethod.POST, produces ={"application/json"})
    public ResponseEntity<?> createVaccination(@RequestBody Vaccination req){
        try {
            return vaccinationService.createVaccination(req);
        } catch (Exception ex){
            return ResponseEntity.badRequest().body(new ExceptionHandle(new BadRequest(400, ex.getMessage())));
        }
    }

    @RequestMapping(value = "/vaccinations", method = RequestMethod.GET, produces = {"application/json"})
    public List<Vaccination> getAllVaccinations(){
        return vaccinationService.getAllVaccinations();
    }

    @RequestMapping(value = "/vaccination/{vaccinationId}", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getVaccinationById(
            @PathVariable("vaccinationId") int vaccinationId
    ) throws NotFoundException {
        return vaccinationService.getVaccinationById(vaccinationId);
    }

    @RequestMapping(value = "/vaccination/{vaccinationName}", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getVaccinationByName(
            @PathVariable("vaccinationName") String vaccinationName
    ) throws NotFoundException {
        return vaccinationService.getVaccinationByName(vaccinationName);
    }
}
