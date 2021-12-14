package com.VMS.backend.POJO;

import com.VMS.backend.entity.Appointment;

import java.util.Date;

public class VaccinationDuePojo {
    private int vaccinationId;
    private int numberOfShotDue;
    private Date dueDate;
    private String vaccinationName;
    private  Appointment appointment;

    public VaccinationDuePojo(int numberOfShotDue, Date dueDate, String vaccinationName, int vaccinationId ) {
        this.numberOfShotDue = numberOfShotDue;
        this.dueDate = dueDate;
        this.vaccinationName = vaccinationName;
        this.vaccinationId=vaccinationId;
    }

    public int getNumberOfShotDue() {
        return numberOfShotDue;
    }

    public void setNumberOfShotDue(int numberOfShotDue) {
        this.numberOfShotDue = numberOfShotDue;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getVaccinationName() {
        return vaccinationName;
    }

    public void setVaccinationName(String vaccinationName) {
        this.vaccinationName = vaccinationName;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public int getVaccinationId() {
        return vaccinationId;
    }

    public void setVaccinationId(int vaccinationId) {
        this.vaccinationId = vaccinationId;
    }
}
