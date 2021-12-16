package com.VMS.backend.service;

import com.VMS.backend.POJO.DiseasePOJO;
import com.VMS.backend.entity.Disease;
import com.VMS.backend.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javassist.NotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class DiseaseService {

    @Autowired
    private DiseaseRepository diseaseRepository;

    public ResponseEntity<?> addDisease(DiseasePOJO disease)  {
        Disease isDiseaseExists = diseaseRepository.findByDiseaseNameEquals(disease.getDiseaseName());
        if(isDiseaseExists == null){
            Disease newDisease = new Disease(disease.getDiseaseName(), disease.getDiseaseDesc());
            Disease res = diseaseRepository.save(newDisease);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Another Disease with the same name exists");
        }
    }

    public List<Disease> getAllDiseases() {
        return diseaseRepository.findAll();
    }

    public ResponseEntity<?> getDisease(int diseaseId) throws NotFoundException{
        Optional<Disease> diseasePass = diseaseRepository.findById(diseaseId);
        if(diseasePass.isPresent()){
            Disease disease = diseasePass.get();
            return new ResponseEntity<>(disease, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sorry, the requested Disease with ID "+diseaseId+" does not exist");
        }

    }
}
