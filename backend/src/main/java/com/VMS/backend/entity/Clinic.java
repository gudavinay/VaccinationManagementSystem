package com.VMS.backend.entity;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "Clinic")
public class Clinic {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String name;
    private Address address;
    private int noOfPhysician;
    private int bussinessHours;

    @OneToMany(targetEntity = Appointment.class, cascade=CascadeType.ALL)
    private List<Appointment> appointments;

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    @ManyToMany(targetEntity=Vaccination.class)
    private List <Vaccination> vaccinations;
    
    public Clinic(String name, Address address, int noOfPhysician, int bussinessHours) {
        this.name = name;
        this.address = address;
        this.noOfPhysician = noOfPhysician;
        this.bussinessHours = bussinessHours;
    }
    public List <Vaccination> getVaccinations() {
        return vaccinations;
    }
    public void setVaccinations(List <Vaccination> vaccinations) {
        this.vaccinations = vaccinations;
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
