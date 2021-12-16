package com.VMS.backend.service;


import com.VMS.backend.POJO.VaccinationDuePojo;
import com.VMS.backend.POJO.VaccinationPOJO;
import com.VMS.backend.entity.Appointment;
import com.VMS.backend.entity.Disease;
import com.VMS.backend.entity.UserVaccinations;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.repository.AppointmentRepository;
import com.VMS.backend.repository.DiseaseRepository;
import com.VMS.backend.repository.UserVaccinationRepository;
import com.VMS.backend.repository.VaccinationRepository;
import com.VMS.backend.util.Utils;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Another vaccination with the same name exists");
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

    public List<Vaccination> getTotalVaccinationsinRepo(){
        return vaccinationRepository.findAll();
    }

    public ResponseEntity<?> getVaccinationByName(String vaccinationName) throws NotFoundException {
        Vaccination vaccination= vaccinationRepository.findByVaccinationName(vaccinationName);
        if(vaccination!=null){
            return new ResponseEntity<>(vaccination, HttpStatus.OK);
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Sorry, the requested vaccination with name "+vaccinationName+" does not exist");

        }

    }

    public ResponseEntity<?> getVaccinationById(int vaccinationId) throws NotFoundException {
        Optional<Vaccination> vaccination= vaccinationRepository.findById(vaccinationId);
        if(vaccination.isPresent()){
            return new ResponseEntity<>(vaccination.get(), HttpStatus.OK);
        }else{

            return ResponseEntity.status(HttpStatus.CONFLICT).body("Sorry, the requested vaccination with Id "+vaccinationId+" does not exist");
        }

    }

    public ResponseEntity<?> getVaccinationsDueForUser( int user_mrn, Date currentDate) throws ParseException {
        System.out.println("Input Request for getVaccinationsDueForUser:  userMrn: " +user_mrn+ " currentDate: " +currentDate);
        List<VaccinationDuePojo> vaccinationDueList=new ArrayList<>();
        List<Integer> vaccinatonsDone= new ArrayList<>();

        Date maxDate=Utils.DateAfterAnYear(currentDate);
        List <Appointment> appointments=appointmentRepository.findAllByUserMrnOrderByAppointmentDateTimeDesc(user_mrn);
        List<Vaccination> allVaccinations=vaccinationRepository.findAll();

        if(CollectionUtils.isEmpty(appointments)){
            //if no appointments or new user- all vaccines are due , NumberofShotdue-1
            System.out.println("no appointments: all vaccinations are due" );
            if(!CollectionUtils.isEmpty(allVaccinations)){
                for(Vaccination v: allVaccinations){
                    VaccinationDuePojo  vaccinationDuePojo= new VaccinationDuePojo(1,currentDate ,v.getVaccinationName(), v.getVaccinationId());
                    vaccinationDueList.add(vaccinationDuePojo);
                }
                return  new ResponseEntity<>(vaccinationDueList, HttpStatus.OK);
            }else{
               return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Vaccinations present in database");
            }

        }else
        {
            if(CollectionUtils.isEmpty(allVaccinations)){
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Vaccinations present in database");
            }
            System.out.println("User still have some appointments scheduled" );
            //get remaining vaccines for second /further shots from user_vaccinations
            List<UserVaccinations> remainingVaccinations=userVaccinationRepository.findByUserId(user_mrn);
            System.out.println("remainingVaccinations fetched : " +remainingVaccinations);
            if(!CollectionUtils.isEmpty(remainingVaccinations)){
                for(UserVaccinations uv : remainingVaccinations){
                    vaccinatonsDone.add(uv.getVaccination_id());
                    int noOfShotsLeft=uv.getDosesLeft();
                    String nextAppointmentDate=uv.getNextAppointmentTime();
                    Date nextAppointmentDateFormated= Utils.convertSimpleDateformat(nextAppointmentDate);
                    if(nextAppointmentDateFormated.before(maxDate)){
                        VaccinationDuePojo vaccinationDuePojo=null;
                        Optional<Vaccination> vaccination=vaccinationRepository.findById(uv.getVaccination_id());
                        if(vaccination.isPresent()){
                            int noOfTotalShots=vaccination.get().getNumberOfShots();
                            int shotNumberDue=0;
                            if(noOfShotsLeft > 0){
                                shotNumberDue= noOfTotalShots-noOfShotsLeft+1; //to calculate shot number
                                vaccinationDuePojo= new VaccinationDuePojo(shotNumberDue,nextAppointmentDateFormated,vaccination.get().getVaccinationName(), vaccination.get().getVaccinationId());
                                vaccinationDueList.add(vaccinationDuePojo);

                            }else if(noOfShotsLeft <=0){
                                int duration = vaccination.get().getDuration();
                                if(duration > 0){
                                    shotNumberDue=0; //0- it's next shot after duration expires
                                    vaccinationDuePojo= new VaccinationDuePojo(shotNumberDue,nextAppointmentDateFormated,vaccination.get().getVaccinationName(), vaccination.get().getVaccinationId());
                                    vaccinationDueList.add(vaccinationDuePojo);
                                }

                            }

                        }
                    }

                }
            }else{ //user has no pending shot- so take all vaccinations
                for(Vaccination v: allVaccinations){
                    VaccinationDuePojo  vaccinationDuePojo= new VaccinationDuePojo(1,currentDate ,v.getVaccinationName(), v.getVaccinationId());
                    vaccinationDueList.add(vaccinationDuePojo);
                }
            }
            //


            //now add other vaccines which are not taken at all & not in remaining section
            System.out.println("vaccinatonsDone id list: " +vaccinatonsDone.toString());
            System.out.println("vaccinationDueList prior to compare: " +vaccinationDueList.toString());
            List<VaccinationDuePojo> vaccinationDueListFinal=new ArrayList<>(vaccinationDueList);
            for(Vaccination vacc: allVaccinations){ //all vaccines
                boolean flag=true;
                    for(VaccinationDuePojo pojo: vaccinationDueList) //
                        if(vacc.getVaccinationId()==pojo.getVaccinationId()){
                            flag=false;
                        }else if(!CollectionUtils.isEmpty(vaccinatonsDone)){
                            if(vaccinatonsDone.contains(vacc.getVaccinationId())){
                                System.out.println("Already done vaccination: " +vacc.getVaccinationId() );
                                flag=false;
                            }
                        }
                    if(flag){
                        if(!CollectionUtils.isEmpty(vaccinatonsDone)) {
                            if (!vaccinatonsDone.contains(vacc.getVaccinationId())) {
                                VaccinationDuePojo vaccinationDuePojo = new VaccinationDuePojo(1, currentDate, vacc.getVaccinationName(), vacc.getVaccinationId());
                                vaccinationDueListFinal.add(vaccinationDuePojo);
                            }
                        }
                    }

            }

            System.out.println("vaccinationDueListFinal: "+ vaccinationDueListFinal.toString());
            //addition of appointment to vaccinationDue
            List<Appointment> scheduledAppointments= appointmentRepository.findAllByUserMrnAndIsCheckedOrderByAppointmentDateTimeDesc(user_mrn, 0);
            System.out.println("scheduledAppointments: " +scheduledAppointments.toString());
            for(VaccinationDuePojo pojo: vaccinationDueListFinal  ){
                for(Appointment ap :scheduledAppointments){
                    if(ap.getCreatedDate().before(currentDate)){
                        List<Vaccination> vaccinationList=ap.getVaccinations();
                        for(Vaccination v: vaccinationList){
                            if(pojo.getVaccinationId()==v.getVaccinationId()){
                                System.out.println("appointment set to vacc due: " +ap);
                                pojo.setAppointment(ap);
                               // pojo.setDueDate(ap.getAppointmentDateTime()); //when appointment exists . dueDate Changes
                            }
                        }

                    }

                }
            }
            //addition of appointment to Vaccination Due for checkedIn appointments

            List<Appointment> checkedIAppointments= appointmentRepository.findAllByUserMrnAndIsCheckedOrderByAppointmentDateTimeDesc(user_mrn, 1);
            System.out.println("checkedIAppointments: " +scheduledAppointments.toString());
            for(VaccinationDuePojo pojo: vaccinationDueListFinal  ){
                for(Appointment ap :checkedIAppointments){
                    if(ap.getAppointmentDateTime().after(currentDate)){
                        List<Vaccination> vaccinationList=ap.getVaccinations();
                        for(Vaccination v: vaccinationList){
                            if(pojo.getVaccinationId()==v.getVaccinationId()){
                                System.out.println("appointment set to vacc due: " +ap);
                                pojo.setAppointment(ap);
                                // pojo.setDueDate(ap.getAppointmentDateTime()); //when appointment exists . dueDate Changes
                            }
                        }

                    }

                }
            }

            if(!CollectionUtils.isEmpty(vaccinationDueListFinal) )
                return  new ResponseEntity<>(vaccinationDueListFinal, HttpStatus.OK);
            else
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Vaccinations are due");
        }





    }



}
