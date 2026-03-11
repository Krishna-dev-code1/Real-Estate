package com.example.realestate.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.realestate.exception.PropertyException;
import com.example.realestate.model.Property;
import com.example.realestate.model.Review;
import com.example.realestate.model.User;
import com.example.realestate.repository.PropertyRepository;
import com.example.realestate.repository.ReviewRepository;
import com.example.realestate.request.ReviewRequest;

@Service
public class ReviewServiceImplementation implements ReviewService {
    
    private final ReviewRepository reviewRepository;
    private final PropertyService propertyService;
    private final PropertyRepository propertyRepository;
    
    public ReviewServiceImplementation(ReviewRepository reviewRepository, PropertyService propertyService, PropertyRepository propertyRepository) {
        this.reviewRepository = reviewRepository;
        this.propertyService = propertyService;
        this.propertyRepository = propertyRepository;
    }

    @Override
    public Review createReview(ReviewRequest req, User user) throws PropertyException {
        Property property = propertyService.findPropertyById(req.getPropertyId());
        
        Review review = new Review();
        review.setUser(user);
        review.setProperty(property);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());

        propertyRepository.save(property);
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReviews(Long propertyId) {
        return reviewRepository.getAllPropertyReviews(propertyId);
    }
}
