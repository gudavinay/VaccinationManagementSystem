package com.VMS.backend.POJO;

import com.VMS.backend.entity.Address;

public class ClinicPOJO {

    private Address address;
    private int endBussinessHour;
    private String name;
    private int noOfPhysician;
    private int startBussinessHour;

    public ClinicPOJO(Address address, int endBussinessHour, String name, int noOfPhysician,
            int startBussinessHour) {
        this.address = address;
        this.endBussinessHour = endBussinessHour;
        this.name = name;
        this.noOfPhysician = noOfPhysician;
        this.startBussinessHour = startBussinessHour;
    }
    public Address getAddress() {
        return address;
    }
    public void setAddress(Address address) {
        this.address = address;
    }
    public int getEndBussinessHour() {
        return endBussinessHour;
    }
    public void setEndBussinessHour(int endBussinessHour) {
        this.endBussinessHour = endBussinessHour;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getNoOfPhysician() {
        return noOfPhysician;
    }
    public void setNoOfPhysician(int noOfPhysician) {
        this.noOfPhysician = noOfPhysician;
    }
    public int getStartBussinessHour() {
        return startBussinessHour;
    }
    public void setStartBussinessHour(int startBussinessHour) {
        this.startBussinessHour = startBussinessHour;
    }
    
    
}
