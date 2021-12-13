package com.VMS.backend.entity;

import javax.persistence.Embeddable;

@Embeddable
public class Address {
    public String street;
    public String aptNo;
    public String city;
    public String state;
    public int zipcode;

    public Address(String street, String aptNo, String city, String state, int zipcode) {
        this.street = street;
        this.aptNo = aptNo;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }

    public Address() {

    }

    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getAptNo() {
        return aptNo;
    }
    public void setAptNo(String aptNo) {
        this.aptNo = aptNo;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public int getZipcode() {
        return zipcode;
    }
    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    @Override
    public String toString() {
        return "Address{" +
                "street='" + street + '\'' +
                ", aptNo='" + aptNo + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipcode=" + zipcode +
                '}';
    }
}