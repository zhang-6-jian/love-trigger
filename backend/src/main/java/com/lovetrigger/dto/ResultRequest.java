package com.lovetrigger.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.Map;

public record ResultRequest(
        List<String> answers,
        @NotBlank String primary,
        @NotBlank String secondary,
        boolean dual,
        Map<String, Integer> scores,
        String visitorId
) {
}
