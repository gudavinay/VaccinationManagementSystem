package com.VMS.backend.service;

import com.VMS.backend.entity.Address;
import com.VMS.backend.entity.Clinic;
import com.VMS.backend.repository.ClinicRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    public ResponseEntity<?> createClinic(Clinic req ) throws IllegalAccessException {
        Clinic isClinicExists = clinicRepository.findByName(req.getName());
        if(isClinicExists == null){
            Clinic newClinic = new Clinic(req.getName(),req.getAddress(),req.getNoOfPhysician(), req.getStartBussinessHour() , req.getEndBussinessHour());
            Clinic res = clinicRepository.save(newClinic);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            throw new IllegalAccessException("Another Clinic with the same name exists");
        }
    }

    public List<Clinic> getAllClinics() {
        return clinicRepository.findAll();
    }

    public ResponseEntity<?> getClinicByName(String clinicName) throws NotFoundException {
        Clinic clinic= clinicRepository.findByName(clinicName);
        if(clinic!=null){
            return new ResponseEntity<>(clinic, HttpStatus.OK);
        }else{
            throw new NotFoundException("Sorry, the requested clinic with name "+clinicName+" does not exist");
        }

    }

    public ResponseEntity<?> getClinicById(int clinicId) throws NotFoundException {
        Optional<Clinic> clinic= clinicRepository.findById(clinicId);
        if(clinic.isPresent()){
            return new ResponseEntity<>(clinic.get(), HttpStatus.OK);
        }else{
            throw new NotFoundException("Sorry, the requested clinic with Id "+clinicId+" does not exist");
        }

    }

}
