package com.VMS.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Disease")
public class Disease {

    @Column(unique = true)
    @NotNull
    private String diseaseName;

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int diseaseId;
    private String diseaseDesc;

    
    public Disease(String diseaseName, String diseaseDesc) {
        this.diseaseName = diseaseName;
        this.diseaseDesc = diseaseDesc;
    }

    public Disease(String diseaseName, int diseaseId, String diseaseDesc) {
        this.diseaseName = diseaseName;
        this.diseaseId = diseaseId;
        this.diseaseDesc = diseaseDesc;
    }

    public Disease() {

    }

    public String getDiseaseName() {
        return diseaseName;
    }
    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }
    public int getDiseaseId() {
        return diseaseId;
    }
    public void setDiseaseId(int diseaseId) {
        this.diseaseId = diseaseId;
    }
    public String getDiseaseDesc() {
        return diseaseDesc;
    }
    public void setDiseaseDesc(String diseaseDesc) {
        this.diseaseDesc = diseaseDesc;
    }
    

    
}
