package com.VMS.backend.entity;

public class User {
    
    private String email;
    private String first_name;
    private String last_name;
    private String middle_name;
    private String dob;
    private int mrn;
    private int gender;
    private Address address;
    private boolean isVerified;

    

    public User(String email, String first_name, String last_name, String middle_name, String dob, int mrn, int gender,
            Address address, boolean isVerified, int role) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.middle_name = middle_name;
        this.dob = dob;
        this.mrn = mrn;
        this.gender = gender;
        this.address = address;
        this.isVerified = isVerified;
        this.role = role;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean isVerified) {
        this.isVerified = isVerified;
    }

    private int role;

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getMiddle_name() {
        return middle_name;
    }

    public void setMiddle_name(String middle_name) {
        this.middle_name = middle_name;
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

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

}