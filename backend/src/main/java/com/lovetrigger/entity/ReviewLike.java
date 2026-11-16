package com.lovetrigger.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
        name = "review_likes",
        uniqueConstraints = @UniqueConstraint(name = "uk_review_visitor", columnNames = {"review_id", "visitor_id"}),
        indexes = @Index(name = "idx_like_review", columnList = "review_id")
)
public class ReviewLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "review_id", nullable = false)
    private Long reviewId;

    @Column(name = "visitor_id", nullable = false, length = 64)
    private String visitorId;

    public ReviewLike() {
    }

    public ReviewLike(Long reviewId, String visitorId) {
        this.reviewId = reviewId;
        this.visitorId = visitorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public String getVisitorId() {
        return visitorId;
    }

    public void setVisitorId(String visitorId) {
        this.visitorId = visitorId;
    }
}
