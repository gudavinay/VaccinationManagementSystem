package com.VMS.backend.POJO;

import com.VMS.backend.entity.Vaccination;
import java.util.*;

public class UserVaccination {

    private int user_Id;
    private int appointmentId;
    private List<Vaccination> vaccinations;

    public UserVaccination(){

    }

    public UserVaccination(int user_Id, List<Vaccination> vaccinations, int appointmentId) {
        this.user_Id = user_Id;
        this.appointmentId = appointmentId;
        this.vaccinations = vaccinations;
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
