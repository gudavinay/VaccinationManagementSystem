package com.VMS.backend.POJO;

public class DiseasePOJO {
    private int diseaseId;
    private String diseaseName;
    private String diseaseDesc;

    public DiseasePOJO(int diseaseId, String diseaseName, String diseaseDesc) {
        this.diseaseId = diseaseId;
        this.diseaseName = diseaseName;
        this.diseaseDesc = diseaseDesc;
    }

    public int getDiseaseId() {
        return diseaseId;
    }

    public void setDiseaseId(int diseaseId) {
        this.diseaseId = diseaseId;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public String getDiseaseDesc() {
        return diseaseDesc;
    }

    public void setDiseaseDesc(String diseaseDesc) {
        this.diseaseDesc = diseaseDesc;
    }
}
