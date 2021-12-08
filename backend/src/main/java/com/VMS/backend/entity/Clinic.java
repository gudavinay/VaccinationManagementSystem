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
    @Embedded
    private Address address;
    private int noOfPhysician;
    private int startBussinessHour;
    private int endBussinessHour;

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
    


    public Clinic() {

    }

    public Clinic(String name, Address address, int noOfPhysician, int startBussinessHour, int endBussinessHour) {
        this.name = name;
        this.address = address;
        this.noOfPhysician = noOfPhysician;
        this.startBussinessHour = startBussinessHour;
        this.endBussinessHour = endBussinessHour;
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

    public int getStartBussinessHour() {
        return startBussinessHour;
    }

    public void setStartBussinessHour(int startBussinessHour) {
        this.startBussinessHour = startBussinessHour;
    }

    public int getEndBussinessHour() {
        return endBussinessHour;
    }

    public void setEndBussinessHour(int endBussinessHour) {
        this.endBussinessHour = endBussinessHour;
    }
}
