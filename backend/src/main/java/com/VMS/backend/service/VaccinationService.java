package com.VMS.backend.service;

import com.VMS.backend.entity.Disease;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.repository.VaccinationRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VaccinationService {

    @Autowired
    private VaccinationRepository vaccinationRepository;

    public ResponseEntity<?> createVaccination(String vaccinationName, List<Disease> diseases, String manufacturer, int numberOfShots, int shotInternalVal, int duration ) throws IllegalAccessException {
        Vaccination isVaccinationExists = vaccinationRepository.findByVaccinationName(vaccinationName);
        if(isVaccinationExists == null){
            Vaccination newVaccination = new Vaccination(vaccinationName,diseases,manufacturer,numberOfShots, shotInternalVal,duration);
            Vaccination res = vaccinationRepository.save(newVaccination);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            throw new IllegalAccessException("Another vaccination with the same name exists");
        }
    }

    public List<Vaccination> getAllVaccinations() {
        return vaccinationRepository.findAll();
    }

    public ResponseEntity<?> getVaccinationByName(String vaccinationName) throws NotFoundException {
        Vaccination vaccination= vaccinationRepository.findByVaccinationName(vaccinationName);
        if(vaccination!=null){
            return new ResponseEntity<>(vaccination, HttpStatus.OK);
        }else{
            throw new NotFoundException("Sorry, the requested vaccination with name "+vaccinationName+" does not exist");
        }

    }

    public ResponseEntity<?> getVaccinationById(int vaccinationId) throws NotFoundException {
        Optional<Vaccination> vaccination= vaccinationRepository.findById(vaccinationId);
        if(vaccination.isPresent()){
            return new ResponseEntity<>(vaccination.get(), HttpStatus.OK);
        }else{
            throw new NotFoundException("Sorry, the requested vaccination with Id "+vaccinationId+" does not exist");
        }

    }
}
