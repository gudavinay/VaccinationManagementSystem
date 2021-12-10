package com.VMS.backend.POJO;

import java.util.List;

public class AppointmentPOJO {
    private String appointmentDateTime;
    private List<Integer> vaccinations;
    private int clinic;
    private int userId;
    private String userEmail;
    
    public AppointmentPOJO() {
    }


    public AppointmentPOJO(String appointmentDateTime, List<Integer> vaccinations, int clinic, int userId, String userEmail) {
        this.appointmentDateTime = appointmentDateTime;
        this.vaccinations = vaccinations;
        this.clinic = clinic;
        this.userId = userId;
        this.userEmail = userEmail;
    }


    public String getUserEmail() {
        return userEmail;
    }


    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }


    public String getAppointmentDateTime() {
        return appointmentDateTime;
    }


    public void setAppointmentDateTime(String appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }


    public List<Integer> getVaccinations() {
        return vaccinations;
    }


    public void setVaccinations(List<Integer> vaccinations) {
        this.vaccinations = vaccinations;
    }


    public int getClinic() {
        return clinic;
    }


    public void setClinic(int clinic) {
        this.clinic = clinic;
    }


    public int getUserId() {
        return userId;
    }


    public void setUserId(int userId) {
        this.userId = userId;
    }
    

    
}
