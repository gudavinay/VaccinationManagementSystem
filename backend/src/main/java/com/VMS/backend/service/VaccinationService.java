package com.VMS.backend.service;


import com.VMS.backend.POJO.VaccinationPOJO;
import com.VMS.backend.entity.Appointment;
import com.VMS.backend.entity.Disease;
import com.VMS.backend.entity.UserVaccinations;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.repository.AppointmentRepository;
import com.VMS.backend.repository.DiseaseRepository;
import com.VMS.backend.repository.UserVaccinationRepository;
import com.VMS.backend.repository.VaccinationRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VaccinationService {

    @Autowired
    private VaccinationRepository vaccinationRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

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

    public ResponseEntity<?> getVaccinationsDueForUser( int user_mrn, Date currentDate) {

        System.out.println("Input Request for getVaccinationsDueForUser:  userMrn: " +user_mrn+ " currentDate: " +currentDate);

        List <Appointment> appointments=appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);
        if(CollectionUtils.isEmpty(appointments)){
            //if no appointments or new user- all vaccines are due
            List<Vaccination> vaccinations=vaccinationRepository.findAll();
        }else{
            //getChecked In appointments
            List<Appointment> checkedInAppointments =appointmentRepository.findAllByUserMrnAndIsCheckedOrderByAppointmentDateTimeAsc(user_mrn,1);
            for(Appointment a :checkedInAppointments ){
                System.out.println(a.getAppointmentDateTime());
                if(a.getAppointmentDateTime().before(currentDate)){

                }
            }




        }


        return null;
    }

    public Date convertSimpleDateformat(String d) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.parse(d);
    }
}
