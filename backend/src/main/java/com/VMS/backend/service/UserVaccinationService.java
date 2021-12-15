package com.VMS.backend.service;

import com.VMS.backend.POJO.UserVaccinationPOJO;
import com.VMS.backend.entity.Appointment;
import com.VMS.backend.entity.UserVaccinations;
import com.VMS.backend.entity.Vaccination;
import com.VMS.backend.repository.AppointmentRepository;
import com.VMS.backend.repository.UserVaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class UserVaccinationService {

    @Autowired
    private UserVaccinationRepository userVaccinationRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public ResponseEntity<?> getVaccineDueDates(int mrn){
         List<UserVaccinations> res=userVaccinationRepository.findByUserId(mrn);
         return new ResponseEntity<>(res, HttpStatus.OK);
    }

    public ResponseEntity<?> addUserVaccinationCheckIn(UserVaccinationPOJO req ) {
        List<Vaccination> vaccinationList = req.getVaccinations();
        List<UserVaccinations> userVaccinations=new ArrayList<>();
        List<UserVaccinations> currentVaccine= userVaccinationRepository.findByUserId(req.getUser_Id());
        if(req.isNoShow()){
            Optional<Appointment> appointment = appointmentRepository.findById(req.getAppointmentId());
            if (appointment.isPresent()) {
                Appointment temp = appointment.get();
                temp.setIsChecked(3);
                Appointment res=appointmentRepository.save(temp);
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
        }
        if(currentVaccine.size()>0){
            for(Vaccination vaccination: vaccinationList){
                for(UserVaccinations current: currentVaccine){
                     if(current.getVaccination_id()==vaccination.getVaccinationId()){
                         Date date = req.getCheckInDate();
                         current.setDosesLeft(current.getDosesLeft()-1);
                         String newDate="";
                         if(current.getDosesLeft()-1==0 ){
                             newDate=addDays(date, vaccination.getDuration());
                         }else{
                              newDate = addDays(date, vaccination.getShotInternalVal() + 1);
                         }


                         current.setNextAppointmentTime(newDate);
                         UserVaccinations res=userVaccinationRepository.save(current);
                         userVaccinations.add(res);
                     }
                }
            }
        }else {
                for (Vaccination vacc : vaccinationList) {
                    if (vacc.getNumberOfShots() - 1 < 0) {
                        throw new IllegalArgumentException("No shots left");
                    }
                    Date date = req.getCheckInDate();
                    String newDate="";
                    if(vacc.getNumberOfShots()-1==0){
                        newDate=addDays(date, vacc.getDuration());
                    }else{
                        newDate = addDays(date, vacc.getShotInternalVal() + 1);
                    }

                    UserVaccinations checkin = new UserVaccinations(req.getUser_Id(), vacc.getNumberOfShots() - 1, vacc.getVaccinationId(), newDate);
                    UserVaccinations res = userVaccinationRepository.save(checkin);
                    userVaccinations.add(res);
                }
            }
            Optional<Appointment> appointment = appointmentRepository.findById(req.getAppointmentId());
            if (appointment.isPresent()) {
                Appointment temp = appointment.get();
                temp.setIsChecked(1);
                appointmentRepository.save(temp);
            }
            return new ResponseEntity<>(userVaccinations, HttpStatus.OK);
        }



    public String addDays(Date date, int noOfDays){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.setTime(date); // Using today's date
        c.add(Calendar.DATE, 5); // Adding 5 days
        String output = sdf.format(c.getTime());
        System.out.println(output);
        return output;
    }

}
