package com.example.realestate.controllers;

import com.example.realestate.model.Rating;
import com.example.realestate.service.RatingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RatingController {

    @Autowired
    private RatingServices ratingService;

    // Existing GET endpoint
    @GetMapping("/ratings")
    public ResponseEntity<List<Rating>> getRatingsByUserId(@RequestParam Long userId) {
        List<Rating> ratings = ratingService.getRatingsByUserId(userId);
        return ResponseEntity.ok(ratings);
    }

    // New POST endpoint
    @PostMapping("/ratings")
    public ResponseEntity<Rating> createRating(@RequestBody Rating rating) {
        Rating createdRating = ratingService.createRating(rating);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRating);
    }
}