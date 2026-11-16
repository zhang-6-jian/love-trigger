package com.lovetrigger.dto;

import java.util.Map;

public record StatsResponse(long totalAssessments, Map<String, Long> typeCounts, long totalReviews) {
}
