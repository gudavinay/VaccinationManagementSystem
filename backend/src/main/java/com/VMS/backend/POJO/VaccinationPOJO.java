package com.VMS.backend.POJO;
import java.util.*;

public class VaccinationPOJO {

    private String vaccinationName;
    private String manufacturer;
    private int numberOfShots;
    private int shotInternalVal;
    private int duration;
    private List<Integer> diseases;

    public List<Integer> getDiseases() {
        return diseases;
    }

    public void setDiseases(List<Integer> diseases) {
        this.diseases = diseases;
    }

    public VaccinationPOJO(String vaccinationName, String manufacturer, int numberOfShots, int shotInternalVal, int duration, List<Integer> diseases) {
        this.vaccinationName = vaccinationName;
        this.manufacturer = manufacturer;
        this.numberOfShots = numberOfShots;
        this.shotInternalVal = shotInternalVal;
        this.duration = duration;
        this.diseases=diseases;
    }

    public String getVaccinationName() {
        return vaccinationName;
    }

    public void setVaccinationName(String vaccinationName) {
        this.vaccinationName = vaccinationName;
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
