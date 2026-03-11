package com.example.realestate.service;

import com.example.realestate.model.Rating;
import com.example.realestate.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImplementation implements RatingServices {

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> getRatingsByUserId(Long userId) {
        return ratingRepository.findByUserId(userId);
    }

    @Override
    public Rating createRating(Rating rating) {
        return ratingRepository.save(rating);
    }
}
