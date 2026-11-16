package com.lovetrigger.dto;

public record ReviewDto(
        Long id,
        String name,
        int rating,
        String text,
        String tag,
        int likes,
        String date,
        boolean liked
) {
}
