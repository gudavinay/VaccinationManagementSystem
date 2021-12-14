package com.VMS.backend.service;


import com.VMS.backend.POJO.VaccinationPOJO;
import com.VMS.backend.entity.Disease;
import com.VMS.backend.entity.UserVaccinations;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.repository.DiseaseRepository;
import com.VMS.backend.repository.UserVaccinationRepository;
import com.VMS.backend.repository.VaccinationRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VaccinationService {

    @Autowired
    private VaccinationRepository vaccinationRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private UserVaccinationRepository userVaccinationRepository;

    public ResponseEntity<?> addVaccination(VaccinationPOJO req ) throws IllegalAccessException {
      System.out.println("Incoming vaccinationRequest: " +req.toString());
        Vaccination isVaccinationExists = vaccinationRepository.findByVaccinationName(req.getVaccinationName());
        if(isVaccinationExists == null){
            List<Disease> diseases=new ArrayList<>();
            for(int i:req.getDiseases()){
                Optional<Disease> d= diseaseRepository.findById(i);
                if(d.isPresent())
                    diseases.add(d.get());
            }
            Vaccination newVaccination = new Vaccination(req.getVaccinationName(),diseases
                    ,req.getManufacturer(),req.getNumberOfShots(), req.getShotIntervalVal(),req.getDuration());
            Vaccination res = vaccinationRepository.save(newVaccination);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            throw new IllegalAccessException("Another vaccination with the same name exists");
        }
    }

    public List<Vaccination> getAllVaccinations(int userMrn) {
        List<UserVaccinations> userVaccinations=userVaccinationRepository.findByUserId(userMrn);
        List<Vaccination> vaccinations=vaccinationRepository.findAll();
        List<Vaccination> res=new ArrayList<>();
        for(Vaccination vaccination:vaccinations){
            res.add(vaccination);
        }
        for(Vaccination vaccination:vaccinations){
            for(UserVaccinations vacc:userVaccinations){
                if(vacc.getVaccination_id()==vaccination.getVaccinationId() && vacc.getDosesLeft()<=0){
                    res.remove(vaccination);
                }
            }
        }
        return res;
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
