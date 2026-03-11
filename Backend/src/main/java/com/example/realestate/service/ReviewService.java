package com.example.realestate.service;

import java.util.List;

import com.example.realestate.exception.PropertyException;
import com.example.realestate.model.Review;
import com.example.realestate.model.User;
import com.example.realestate.request.ReviewRequest;

public interface ReviewService {

    public Review createReview(ReviewRequest req, User user) throws PropertyException;
    
    public List<Review> getAllReviews(Long propertyId);
}
