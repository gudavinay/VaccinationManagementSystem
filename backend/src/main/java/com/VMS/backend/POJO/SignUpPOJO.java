package com.VMS.backend.POJO;

import com.VMS.backend.entity.Address;

import javax.persistence.Embedded;
import javax.validation.constraints.NotNull;

public class SignUpPOJO {
    private String email;
    private String firstName;
    private String lastName;
    private String middleName;
    private String dob;
    private String gender;
    private Address address;
    private boolean verified;
    private boolean admin;

    public SignUpPOJO() {
    }

    public SignUpPOJO(String email, String firstName, String lastName, String middleName, String dob, String gender, Address address, boolean verified, boolean admin) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.dob = dob;
        this.gender = gender;
        this.address = address;
        this.verified = verified;
        this.admin = admin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
}
