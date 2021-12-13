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

    private String appointmentDateStr;

    private String appointmentTimeStr;

    private Date createdDate;

    @ManyToMany(targetEntity=Vaccination.class, cascade=CascadeType.ALL)
    @JoinTable(name="appointment_vaccinations",
            joinColumns={@JoinColumn(name="appointment_id")},
            inverseJoinColumns={@JoinColumn(name="vaccination_id")})
    private List<Vaccination> vaccinations; // make validation for upto 4

    @ManyToOne(targetEntity = Clinic.class)
    private Clinic clinic;

    @ManyToOne(targetEntity=User.class, cascade= CascadeType.DETACH)
    private User user;

    private int isChecked; // 0- future appointment, 1- CheckedIn, 2- NoShow, 3- Cancelled

    public Appointment() {
    }

    public Appointment(Date appointmentDateTime, List<Vaccination> vaccinations, Clinic clinic, User user,
                       int isChecked, Date createdDate, String appointmentDateStr, String appointmentTimeStr) {
        this.appointmentDateTime = appointmentDateTime;
        this.vaccinations = vaccinations;
        this.clinic = clinic;
        this.user = user;
        this.isChecked = isChecked;
        this.createdDate = createdDate;
        this.appointmentDateStr = appointmentDateStr;
        this.appointmentTimeStr = appointmentTimeStr;
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
    public int getIsChecked() {
        return isChecked;
    }
    public void setIsChecked(int isChecked) {
        this.isChecked = isChecked;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getAppointmentDateStr() {
        return appointmentDateStr;
    }

    public void setAppointmentDateStr(String appointmentDateStr) {
        this.appointmentDateStr = appointmentDateStr;
    }

    public String getAppointmentTimeStr() {
        return appointmentTimeStr;
    }

    public void setAppointmentTimeStr(String appointmentTimeStr) {
        this.appointmentTimeStr = appointmentTimeStr;
    }

    
}
