package com.lovetrigger.repository;

import com.lovetrigger.entity.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewLikeRepository extends JpaRepository<ReviewLike, Long> {
    Optional<ReviewLike> findByReviewIdAndVisitorId(Long reviewId, String visitorId);

    List<ReviewLike> findByVisitorId(String visitorId);

    long countByReviewId(Long reviewId);
}
