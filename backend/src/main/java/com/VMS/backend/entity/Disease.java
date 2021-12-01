package com.VMS.backend.entity;

public class Disease {
    private String diseaseName;
    private int diseaseId;
    private String diseaseDesc;

    
    public Disease(String diseaseName, String diseaseDesc) {
        this.diseaseName = diseaseName;
        this.diseaseDesc = diseaseDesc;
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
