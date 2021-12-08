package com.VMS.backend.Controller;

import com.VMS.backend.POJO.DiseasePOJO;
import com.VMS.backend.entity.Disease;
import com.VMS.backend.service.DiseaseService;
import com.VMS.backend.util.BadRequest;
import com.VMS.backend.util.ExceptionHandle;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;

    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    @RequestMapping(value = "/addDisease", method = RequestMethod.POST, produces ={"application/json"})
    public ResponseEntity<?> addDisease(
            @RequestBody DiseasePOJO disease
    ){
        try {
            return diseaseService.addDisease(disease);
        } catch (Exception ex){
            return ResponseEntity.badRequest().body(new ExceptionHandle(new BadRequest(400, ex.getMessage())));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    @RequestMapping(value = "/diseases", method = RequestMethod.GET, produces = {"application/json"})
    public List<Disease> getAllDiseases(){
        return diseaseService.getAllDiseases();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    @RequestMapping(value = "/disease/{diseaseId}", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity<?> getDisease(
            @PathVariable("diseaseId") int diseaseId
    ) throws NotFoundException {
        return diseaseService.getDisease(diseaseId);
    }
}