package com.VMS.backend.POJO;

import com.VMS.backend.entity.Vaccination;
import java.util.*;

public class UserVaccinationPOJO {

    private int user_Id;
    private int appointmentId;
    private List<Vaccination> vaccinations;

    public boolean isNoShow() {
        return noShow;
    }

    public void setNoShow(boolean noShow) {
        this.noShow = noShow;
    }

    private boolean noShow;

    public Date getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }

    private Date checkInDate;

    public UserVaccinationPOJO(){

    }

    public UserVaccinationPOJO(int user_Id, List<Vaccination> vaccinations, int appointmentId, Date dateTime) {
        this.user_Id = user_Id;
        this.appointmentId = appointmentId;
        this.vaccinations = vaccinations;
        this.checkInDate=dateTime;
    }

    public int getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(int user_Id) {
        this.user_Id = user_Id;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    public List<Vaccination> getVaccinations() {
        return vaccinations;
    }

    public void setVaccinations(List<Vaccination> vaccinations) {
        this.vaccinations = vaccinations;
    }
}
