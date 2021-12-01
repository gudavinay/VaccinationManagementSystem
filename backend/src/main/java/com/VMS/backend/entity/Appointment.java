package com.VMS.backend.entity;

import java.util.Date;
import java.util.List;
//import com.VMS.backend.entity.Vaccination;

public class Appointment {
    private int appointmentId;
    private Date appointmentDateTime;
    private List<Vaccination> vaccinations; // make validation for upto 4
    private Clinic clinic;
    private User user;
    private int isCheckedIn; // 1- CheckedIn, 2- NoShow, 3- No

    
    public Appointment(Date appointmentDateTime, List<Vaccination> vaccinations, Clinic clinic, User user,
            int isCheckedIn) {
        this.appointmentDateTime = appointmentDateTime;
        this.vaccinations = vaccinations;
        this.clinic = clinic;
        this.user = user;
        this.isCheckedIn = isCheckedIn;
    }
    public int getAppointmentId() {
        return appointmentId;
    }
    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }
    public Date getAppointmentDateTime() {
        return appointmentDateTime;
    }
    public void setAppointmentDateTime(Date appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }
    public List<Vaccination> getVaccinations() {
        return vaccinations;
    }
    public void setVaccinations(List<Vaccination> vaccinations) {
        this.vaccinations = vaccinations;
    }
    public Clinic getClinic() {
        return clinic;
    }
    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public int getIsCheckedIn() {
        return isCheckedIn;
    }
    public void setIsCheckedIn(int isCheckedIn) {
        this.isCheckedIn = isCheckedIn;
    }
   
    


    
}
