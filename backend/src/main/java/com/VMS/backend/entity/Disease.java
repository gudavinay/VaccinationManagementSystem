package com.VMS.backend.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

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

    @ManyToOne(targetEntity=Disease.class, cascade=CascadeType.ALL)
    private Vaccination vaccination;
    
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
