package com.lovetrigger.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateReviewRequest(
        @Size(max = 12, message = "昵称最多 12 个字")
        String name,

        @Min(value = 1, message = "评分最低 1 星")
        @Max(value = 5, message = "评分最高 5 星")
        int rating,

        @NotBlank(message = "请写下你的感受")
        @Size(min = 4, max = 160, message = "感受需在 4 到 160 字之间")
        String text,

        @Size(max = 32)
        String tag
) {
}
