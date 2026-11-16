package com.lovetrigger.repository;

import com.lovetrigger.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByOrderByDateDescIdDesc();
}
