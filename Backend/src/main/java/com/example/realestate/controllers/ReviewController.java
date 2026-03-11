package com.example.realestate.controllers;

import com.example.realestate.model.Review;
import com.example.realestate.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(
            @RequestParam Long userId,
            @RequestParam Long propertyId,
            @RequestParam String reviewText) {

        Review review = reviewService.addReview(userId, propertyId, reviewText);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long propertyId) {
        return ResponseEntity.ok(reviewService.getReviewsForProperty(propertyId));
    }
}
