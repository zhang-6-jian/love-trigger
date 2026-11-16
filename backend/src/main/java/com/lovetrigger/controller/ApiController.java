package com.lovetrigger.controller;

import com.lovetrigger.dto.CreateReviewRequest;
import com.lovetrigger.dto.LikeRequest;
import com.lovetrigger.dto.ResultRequest;
import com.lovetrigger.dto.ResultResponse;
import com.lovetrigger.dto.ReviewDto;
import com.lovetrigger.dto.StatsResponse;
import com.lovetrigger.service.AssessmentService;
import com.lovetrigger.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(originPatterns = "*")
public class ApiController {

    private final ReviewService reviewService;
    private final AssessmentService assessmentService;

    public ApiController(ReviewService reviewService, AssessmentService assessmentService) {
        this.reviewService = reviewService;
        this.assessmentService = assessmentService;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "ok",
                "service", "love-trigger",
                "time", OffsetDateTime.now().toString()
        );
    }

    @GetMapping("/reviews")
    public List<ReviewDto> reviews(@RequestParam(required = false) String visitorId) {
        return reviewService.list(visitorId);
    }

    @PostMapping("/reviews")
    public ResponseEntity<ReviewDto> createReview(@Valid @RequestBody CreateReviewRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.create(request));
    }

    @PostMapping("/reviews/{id}/like")
    public Map<String, Object> toggleLike(
            @PathVariable Long id,
            @RequestBody LikeRequest request
    ) {
        int likes = reviewService.toggleLike(id, request.visitorId(), request.liked());
        return Map.of("id", id, "likes", likes, "liked", request.liked());
    }

    @PostMapping("/results")
    public ResponseEntity<ResultResponse> saveResult(@Valid @RequestBody ResultRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(assessmentService.save(request));
    }

    @GetMapping("/stats")
    public StatsResponse stats() {
        return assessmentService.stats();
    }
}
