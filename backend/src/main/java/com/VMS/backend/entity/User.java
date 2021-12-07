package com.VMS.backend.entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.VMS.backend.constants.Gender;

@Entity
@Table(name = "User")
public class User {

    @Id
    private int mrn;
    @Column(unique = true)
    private String email;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;
    private String middleName;

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isRole() {
        return role;
    }

    @NotNull
    private String dob;

    @NotNull
    private String gender; // enum
    private Address address;
    private boolean isVerified;

    @OneToMany(targetEntity = Vaccination.class, cascade = CascadeType.ALL)
    private List<Vaccination> vaccinations;

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    @OneToMany(targetEntity=Appointment.class, cascade=CascadeType.ALL)
    private List<Appointment> appointments;

    public User(String firstName, String lastName, String middleName, String email, String dob, String gender,
            Address address, boolean isVerified, int mrn, boolean role) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.mrn = mrn;
        this.gender = gender;
        this.address = address;
        this.isVerified = isVerified;
        this.role = role;
    }

    public User() {

    }

    public List<Vaccination> getVaccinations() {
        return vaccinations;
    }

    public void setVaccinations(List<Vaccination> vaccinations) {
        this.vaccinations = vaccinations;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }

    private boolean role;

    public boolean getRole() {
        return role;
    }

    public void setRole(boolean role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public int getMrn() {
        return mrn;
    }

    public void setMrn(int mrn) {
        this.mrn = mrn;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

}