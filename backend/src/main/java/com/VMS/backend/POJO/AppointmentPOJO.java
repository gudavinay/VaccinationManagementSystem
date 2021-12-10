package com.VMS.backend.POJO;

import java.util.List;

public class AppointmentPOJO {
    private String appointmentDateTime;
    private List<Integer> vaccinations;
    private int clinic;
    private int user_id;
    
    public AppointmentPOJO() {
    }


    public AppointmentPOJO(String appointmentDateTime, List<Integer> vaccinations, int clinic, int user_id) {
        this.appointmentDateTime = appointmentDateTime;
        this.vaccinations = vaccinations;
        this.clinic = clinic;
        this.user_id = user_id;
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


    public int getUser_id() {
        return user_id;
    }


    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
    

    
}
