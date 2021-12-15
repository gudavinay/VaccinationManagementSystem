package com.VMS.backend.Controller;

import com.VMS.backend.POJO.VaccinationPOJO;
import com.VMS.backend.entity.Disease;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.service.VaccinationService;
import com.VMS.backend.util.BadRequest;
import com.VMS.backend.util.ExceptionHandle;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
public class VaccinationController {

    @Autowired
    private VaccinationService vaccinationService;

    @RequestMapping(value = "/addVaccination", method = RequestMethod.POST, produces = { "application/json" })
    public ResponseEntity<?> addVaccination(@RequestBody VaccinationPOJO req) {
        try {
            return vaccinationService.addVaccination(req);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new ExceptionHandle(new BadRequest(400, ex.getMessage())));
        }
    }

    @RequestMapping(value = "/getAllVaccinations/{mrn}", method = RequestMethod.GET, produces = { "application/json" })
    public List<Vaccination> getAllVaccinations(
        @PathVariable("mrn") int mrn) {
        return vaccinationService.getAllVaccinations(mrn);
    }

    @RequestMapping(value = "/vaccination/{vaccinationId}", method = RequestMethod.GET, produces = {
            "application/json" })
    public ResponseEntity<?> getVaccinationById(
            @PathVariable("vaccinationId") int vaccinationId) throws NotFoundException {
        return vaccinationService.getVaccinationById(vaccinationId);
    }

    @RequestMapping(value = "/vaccination/{vaccinationName}", method = RequestMethod.GET, produces = {
            "application/json" })
    public ResponseEntity<?> getVaccinationByName(
            @PathVariable("vaccinationName") String vaccinationName) throws NotFoundException {
        return vaccinationService.getVaccinationByName(vaccinationName);
    }

    @RequestMapping(value = "/getVaccinationsDueForUser", method = RequestMethod.GET, produces = { "application/json" })
    public ResponseEntity<?> getVaccinationsDueForUser(
            @RequestParam("user_mrn") int user_mrn,
            @RequestParam("currentDate") Date currentDate) {
        try {
            return vaccinationService.getVaccinationsDueForUser(user_mrn,currentDate);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(new ExceptionHandle(new BadRequest(400, e.getMessage())));
        }
    }

    @RequestMapping(value = "/getTotalVaccinationsinRepo", method = RequestMethod.GET, produces = {"application/json"})
    public List<Vaccination> getTotalVaccinationsinRepo(){
        return vaccinationService.getTotalVaccinationsinRepo();
    }
}
