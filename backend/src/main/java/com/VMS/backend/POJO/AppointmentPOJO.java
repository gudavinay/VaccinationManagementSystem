package com.VMS.backend.POJO;

import java.util.List;

public class AppointmentPOJO {
    private String appointmentDateTime;
    private List<Integer> vaccinations;
    private int clinic;
    private int userId;
    private String userEmail;
    private String  createdDate;
    private String appointmentDateStr;
    private String appointmentTimeStr;

    public int getAppointmentID() {
        return appointmentID;
    }

    private int appointmentID;
    
    public AppointmentPOJO() {
    }


    public AppointmentPOJO(String appointmentDateTime, List<Integer> vaccinations, int clinic, int userId, String userEmail, String createdDate, String appointmentDateStr, String appointmentTimeStr) {
        this.appointmentDateTime = appointmentDateTime;
        this.vaccinations = vaccinations;
        this.clinic = clinic;
        this.userId = userId;
        this.userEmail = userEmail;
        this.createdDate=createdDate;
        this.appointmentDateStr = appointmentDateStr;
        this.appointmentTimeStr = appointmentTimeStr;
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

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "AppointmentPOJO{" +
                "appointmentDateTime='" + appointmentDateTime + '\'' +
                "appointmentDateStr='" + appointmentDateStr + '\'' +
                "appointmentTimeStr='" + appointmentTimeStr + '\'' +
                ", vaccinations=" + vaccinations +
                ", clinic=" + clinic +
                ", userId=" + userId +
                ", userEmail='" + userEmail + '\'' +
                ", createdDate='" + createdDate + '\'' +
                '}';
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
