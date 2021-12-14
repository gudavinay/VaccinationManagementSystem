package com.VMS.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "UserVaccinations")
public class UserVaccinations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private int dosesLeft;
    private int vaccinationId;
    private String nextAppointmentTime;

    public UserVaccinations(){

    }

    public UserVaccinations(int userId, int dosesLeft, int vaccinationId, String nextAppointmentTime) {
        this.userId = userId;
        this.dosesLeft = dosesLeft;
        this.vaccinationId = vaccinationId;
        this.nextAppointmentTime = nextAppointmentTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_Id() {
        return userId;
    }

    public void setUser_Id(int userId) {
        this.userId = userId;
    }

    public int getDosesLeft() {
        return dosesLeft;
    }

    public void setDosesLeft(int dosesLeft) {
        this.dosesLeft = dosesLeft;
    }

    public int getVaccination_id() {
        return vaccinationId;
    }

    public void setVaccination_id(int vaccinationId) {
        this.vaccinationId = vaccinationId;
    }

    public String getNextAppointmentTime() {
        return nextAppointmentTime;
    }

    public void setNextAppointmentTime(String nextAppointmentTime) {
        this.nextAppointmentTime = nextAppointmentTime;
    }
}
