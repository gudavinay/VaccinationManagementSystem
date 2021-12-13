package com.VMS.backend.entity;

import javax.persistence.*;
import java.util.*;
//import com.VMS.backend.entity.Vaccination;
@Entity
@Table(name = "Appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentId;

    private Date appointmentDateTime;

    @OneToMany(targetEntity=Vaccination.class, cascade= CascadeType.ALL)
    private List<Vaccination> vaccinations; // make validation for upto 4

    @ManyToOne(targetEntity = Clinic.class)
    private Clinic clinic;

    @ManyToOne(targetEntity=User.class, cascade= CascadeType.DETACH)
    private User user;

    private int isCheckedIn; // 0- future appointment, 1- CheckedIn, 2- NoShow, 3- Cancelled

    public Appointment() {
    }

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
