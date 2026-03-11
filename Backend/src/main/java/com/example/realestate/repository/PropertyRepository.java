package com.example.realestate.repository;

import com.example.realestate.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    
    // Find properties by property type
    List<Property> findByPropertyType(String propertyType);

    // Find properties by location
    List<Property> findByLocation(String location);

    // Find properties by price range
    List<Property> findByPriceBetween(Double minPrice, Double maxPrice);

    // Find properties by property category (e.g., Residential, Commercial)
    List<Property> findByPropertyCategory(String category);

    // Find properties with a discount
    List<Property> findByDiscountPercentGreaterThan(Double discountPercent);

    // Example custom query: Find properties by price range and property type
    @Query("SELECT p FROM Property p WHERE p.price BETWEEN :minPrice AND :maxPrice AND p.propertyType = :propertyType")
    List<Property> findByPriceRangeAndPropertyType(Double minPrice, Double maxPrice, String propertyType);
}
