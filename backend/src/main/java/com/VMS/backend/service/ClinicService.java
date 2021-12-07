package com.VMS.backend.service;

import com.VMS.backend.entity.Address;
import com.VMS.backend.entity.Clinic;
import com.VMS.backend.entity.Disease;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.repository.ClinicRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;
//
//    public ResponseEntity<?> createVaccination(String clinicName, Address address, int numberOfPhysicians,String businessHours ) throws IllegalAccessException {
//        Clinic isClinicExists = clinicRepository.findByClinicName(clinicName);
//        if(isClinicExists == null){
//            Clinic newClinic = new Clinic(clinicName,address,numberOfPhysicians, businessHours );
//            Clinic res = clinicRepository.save(newClinic);
//            return new ResponseEntity<>(res, HttpStatus.OK);
//        } else {
//            throw new IllegalAccessException("Another Clinic with the same name exists");
//        }
//    }

    public List<Clinic> getAllClinics() {
        return clinicRepository.findAll();
    }

//    public ResponseEntity<?> getClinicByName(String vaccinationName) throws NotFoundException {
//        Vaccination vaccination= vaccinationRepository.findByVaccinationName(vaccinationName);
//        if(vaccination!=null){
//            return new ResponseEntity<>(vaccination, HttpStatus.OK);
//        }else{
//            throw new NotFoundException("Sorry, the requested vaccination with name "+vaccinationName+" does not exist");
//        }
//
//    }

}
