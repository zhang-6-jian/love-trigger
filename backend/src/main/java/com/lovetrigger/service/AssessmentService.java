package com.lovetrigger.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lovetrigger.dto.ResultRequest;
import com.lovetrigger.dto.ResultResponse;
import com.lovetrigger.dto.StatsResponse;
import com.lovetrigger.entity.Assessment;
import com.lovetrigger.repository.AssessmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final ReviewService reviewService;
    private final ObjectMapper objectMapper;

    public AssessmentService(
            AssessmentRepository assessmentRepository,
            ReviewService reviewService,
            ObjectMapper objectMapper
    ) {
        this.assessmentRepository = assessmentRepository;
        this.reviewService = reviewService;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public ResultResponse save(ResultRequest request) {
        Assessment assessment = new Assessment();
        assessment.setPrimaryType(request.primary());
        assessment.setSecondaryType(request.secondary());
        assessment.setDual(request.dual());
        assessment.setAnswersJson(writeJson(request.answers()));
        assessment.setScoresJson(writeJson(request.scores()));
        assessment.setVisitorId(trim(request.visitorId()));
        Assessment saved = assessmentRepository.save(assessment);
        long total = assessmentRepository.count();
        return new ResultResponse(saved.getId(), serialOf(saved.getId()), total);
    }

    @Transactional(readOnly = true)
    public StatsResponse stats() {
        Map<String, Long> typeCounts = new LinkedHashMap<>();
        for (Object[] row : assessmentRepository.countByPrimaryType()) {
            typeCounts.put(String.valueOf(row[0]), ((Number) row[1]).longValue());
        }
        return new StatsResponse(assessmentRepository.count(), typeCounts, reviewService.count());
    }

    private String serialOf(Long id) {
        return String.format("%04d", 1000 + id % 9000);
    }

    private String writeJson(Object value) {
        if (value == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("结果数据格式不正确", e);
        }
    }

    private String trim(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : (trimmed.length() > 64 ? trimmed.substring(0, 64) : trimmed);
    }
}
