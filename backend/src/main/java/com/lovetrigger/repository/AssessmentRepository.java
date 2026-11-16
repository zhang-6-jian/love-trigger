package com.lovetrigger.repository;

import com.lovetrigger.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    @Query("select a.primaryType, count(a) from Assessment a group by a.primaryType")
    List<Object[]> countByPrimaryType();
}
