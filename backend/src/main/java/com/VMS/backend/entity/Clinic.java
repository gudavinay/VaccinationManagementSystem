package com.VMS.backend.entity;

public class Clinic {
    private int id;
    private String name;
    private Address address;
    private int noOfPhysician;
    private int bussinessHours;
    
    public Clinic(String name, Address address, int noOfPhysician, int bussinessHours) {
        this.name = name;
        this.address = address;
        this.noOfPhysician = noOfPhysician;
        this.bussinessHours = bussinessHours;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Address getAddress() {
        return address;
    }
    public void setAddress(Address address) {
        this.address = address;
    }
    public int getNoOfPhysician() {
        return noOfPhysician;
    }
    public void setNoOfPhysician(int noOfPhysician) {
        this.noOfPhysician = noOfPhysician;
    }
    public int getBussinessHours() {
        return bussinessHours;
    }
    public void setBussinessHours(int bussinessHours) {
        this.bussinessHours = bussinessHours;
    }
}
