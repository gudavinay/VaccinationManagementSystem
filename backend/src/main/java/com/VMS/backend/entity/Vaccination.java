package com.VMS.backend.entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Vaccination")
public class Vaccination {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int vaccinationId;

    @Column(unique = true)
    @NotNull
    private String vaccinationName;

    @OneToMany(targetEntity=Disease.class, cascade=CascadeType.ALL)
    private List<Disease> diseases;

    @ManyToOne(targetEntity=Vaccination.class, cascade= CascadeType.DETACH)
    private Vaccination vaccination;

    @ManyToMany(targetEntity=Clinic.class)
    private List<Clinic> clinics;

    private String manufacturer;
    private int numberOfShots;
    private int shotInternalVal;
    private int duration;

    
    public Vaccination(String vaccinationName, List<Disease> diseases, String manufacturer, int numberOfShots,
            int shotInternalVal, int duration) {
        this.vaccinationName = vaccinationName;
        this.diseases = diseases;
        this.manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotInternalVal = shotInternalVal;
        this.duration = duration;
    }

    public Vaccination() {

    }

    public int getVaccinationId() {
        return vaccinationId;
    }
    public void setVaccinationId(int vaccinationId) {
        this.vaccinationId = vaccinationId;
    }
    public String getVaccinationName() {
        return vaccinationName;
    }
    public void setVaccinationName(String vaccinationName) {
        this.vaccinationName = vaccinationName;
    }
    public List<Disease> getDiseases() {
        return diseases;
    }
    public void setDiseases(List<Disease> diseases) {
        this.diseases = diseases;
    }
    public String getManufacturer() {
        return manufacturer;
    }
    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }
    public int getNumberOfShots() {
        return numberOfShots;
    }
    public void setNumberOfShots(int numberOfShots) {
        this.numberOfShots = numberOfShots;
    }
    public int getShotInternalVal() {
        return shotInternalVal;
    }
    public void setShotInternalVal(int shotInternalVal) {
        this.shotInternalVal = shotInternalVal;
    }
    public int getDuration() {
        return duration;
    }
    public void setDuration(int duration) {
        this.duration = duration;
    }





    
}
