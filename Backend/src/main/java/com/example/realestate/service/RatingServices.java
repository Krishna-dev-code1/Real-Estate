package com.example.realestate.service;

import com.example.realestate.model.Rating;

import java.util.List;

public interface RatingServices {
    List<Rating> getRatingsByUserId(Long userId);
    Rating createRating(Rating rating);
}
