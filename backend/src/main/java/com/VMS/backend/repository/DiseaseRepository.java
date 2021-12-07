package com.VMS.backend.repository;

import com.VMS.backend.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Integer> {
    Disease findByDiseaseNameEquals(String diseaseName);
}
