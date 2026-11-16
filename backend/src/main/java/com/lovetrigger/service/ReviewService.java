package com.lovetrigger.service;

import com.lovetrigger.dto.CreateReviewRequest;
import com.lovetrigger.dto.ReviewDto;
import com.lovetrigger.entity.Review;
import com.lovetrigger.entity.ReviewLike;
import com.lovetrigger.repository.ReviewLikeRepository;
import com.lovetrigger.repository.ReviewRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ReviewService {

    private static final String DEFAULT_NAME = "匿名体验官";
    private static final String DEFAULT_TAG = "内测体验官";

    private final ReviewRepository reviewRepository;
    private final ReviewLikeRepository likeRepository;

    public ReviewService(ReviewRepository reviewRepository, ReviewLikeRepository likeRepository) {
        this.reviewRepository = reviewRepository;
        this.likeRepository = likeRepository;
    }

    @PostConstruct
    @Transactional
    public void seedReviews() {
        if (reviewRepository.count() > 0) {
            return;
        }
        seed("小满", 5,
                "测出来是颅内高潮型。看到“你爱的不是聪明，是聪明带来的新世界”那一下真的被戳中了。我前任就是那种讲起代码眼睛发光的人。",
                "颅内高潮型", 128, LocalDate.of(2026, 11, 12));
        seed("阿离", 5,
                "老虎机型本型。“你爱的不是他，是下一次手机亮起”这句话建议直接印在我脑门上。",
                "老虎机型", 96, LocalDate.of(2026, 11, 11));
        seed("桃子", 4,
                "我是人间止疼片型。理论部分提到“强迫性照顾”，我第一次听说这个词，但它确实解释了为什么我总爱上需要我的人。",
                "人间止疼片型", 74, LocalDate.of(2026, 11, 10));
        seed("陈见", 5,
                "反差捕手型。“他只对我”这个开关太准了，准到有点想报警。",
                "反差捕手型", 61, LocalDate.of(2026, 11, 9));
        seed("小野", 5,
                "长期主义型。本来觉得自己很无聊，结果被一句“你把浪漫换成了一直在”安慰到了。",
                "长期主义型", 53, LocalDate.of(2026, 11, 8));
        seed("鹿鹿", 4,
                "氛围感型。看完立刻回想了一下，我好像确实爱的是那天晚上的风，不是那个人。",
                "氛围感型", 47, LocalDate.of(2026, 11, 7));
    }

    private void seed(String name, int rating, String text, String tag, int likes, LocalDate date) {
        Review review = new Review();
        review.setName(name);
        review.setRating(rating);
        review.setText(text);
        review.setTag(tag);
        review.setLikes(likes);
        review.setDate(date);
        review.setCreatedAt(date.atStartOfDay().toInstant(ZoneOffset.ofHours(8)));
        reviewRepository.save(review);
    }

    @Transactional(readOnly = true)
    public List<ReviewDto> list(String visitorId) {
        Set<Long> likedIds = new HashSet<>();
        String visitor = normalizeVisitor(visitorId);
        if (visitor != null) {
            likeRepository.findByVisitorId(visitor).forEach(like -> likedIds.add(like.getReviewId()));
        }
        return reviewRepository.findAllByOrderByDateDescIdDesc().stream()
                .map(review -> toDto(review, likedIds.contains(review.getId())))
                .toList();
    }

    @Transactional
    public ReviewDto create(CreateReviewRequest request) {
        Review review = new Review();
        String name = request.name() == null ? "" : request.name().trim();
        review.setName(name.isEmpty() ? DEFAULT_NAME : name);
        review.setRating(Math.min(5, Math.max(1, request.rating())));
        review.setText(request.text().trim());
        String tag = request.tag() == null ? "" : request.tag().trim();
        review.setTag(tag.isEmpty() ? DEFAULT_TAG : tag);
        review.setLikes(0);
        review.setDate(LocalDate.now());
        Review saved = reviewRepository.save(review);
        return toDto(saved, false);
    }

    @Transactional
    public int toggleLike(Long reviewId, String visitorId, boolean liked) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("这条好评不存在"));
        String visitor = normalizeVisitor(visitorId);
        if (visitor == null) {
            throw new IllegalArgumentException("缺少访客标识");
        }
        ReviewLike existing = likeRepository.findByReviewIdAndVisitorId(reviewId, visitor).orElse(null);
        if (liked && existing == null) {
            likeRepository.save(new ReviewLike(reviewId, visitor));
            review.setLikes(review.getLikes() + 1);
        } else if (!liked && existing != null) {
            likeRepository.delete(existing);
            review.setLikes(review.getLikes() - 1);
        }
        return reviewRepository.save(review).getLikes();
    }

    @Transactional(readOnly = true)
    public long count() {
        return reviewRepository.count();
    }

    private ReviewDto toDto(Review review, boolean liked) {
        return new ReviewDto(
                review.getId(),
                review.getName(),
                review.getRating(),
                review.getText(),
                review.getTag(),
                review.getLikes(),
                review.getDate().toString(),
                liked
        );
    }

    private String normalizeVisitor(String visitorId) {
        if (visitorId == null) {
            return null;
        }
        String trimmed = visitorId.trim();
        if (trimmed.isEmpty()) {
            return null;
        }
        return trimmed.length() > 64 ? trimmed.substring(0, 64) : trimmed;
    }
}
