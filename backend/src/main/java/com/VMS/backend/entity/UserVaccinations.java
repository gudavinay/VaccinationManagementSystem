package com.VMS.backend.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "UserVaccinations")
public class UserVaccinations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int user_Id;
    private int dosesLeft;
    private int vaccination_id;
    private String nextAppointmentTime;

    public UserVaccinations(int user_Id, int dosesLeft, int vaccination_id, String nextAppointmentTime) {
        this.user_Id = user_Id;
        this.dosesLeft = dosesLeft;
        this.vaccination_id = vaccination_id;
        this.nextAppointmentTime = nextAppointmentTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(int user_Id) {
        this.user_Id = user_Id;
    }

    public int getDosesLeft() {
        return dosesLeft;
    }

    public void setDosesLeft(int dosesLeft) {
        this.dosesLeft = dosesLeft;
    }

    public int getVaccination_id() {
        return vaccination_id;
    }

    public void setVaccination_id(int vaccination_id) {
        this.vaccination_id = vaccination_id;
    }

    public String getNextAppointmentTime() {
        return nextAppointmentTime;
    }

    public void setNextAppointmentTime(String nextAppointmentTime) {
        this.nextAppointmentTime = nextAppointmentTime;
    }
}
