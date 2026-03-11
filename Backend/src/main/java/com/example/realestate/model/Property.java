package com.example.realestate.model;

import jakarta.persistence.*;
import java.util.List;

import com.example.realestate.user.domain.PropertyStatus;

@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    private String propertyTitle;
    private String description;
    private String location;
    private Double price;
    private Double discountedPrice;
    private Double discountPercent;
    private String propertyType;
    private String propertyCategory;
    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private Double squareFeet;

    // ✅ Store images as a List of Strings (URLs)
    @ElementCollection
    private List<String> imageUrls;

    // ✅ Add status field with enum
    @Enumerated(EnumType.STRING)
    private PropertyStatus status;

    public Property() {}

    public Property(Long id, User seller, String propertyTitle, String description, String location, Double price,
                    Double discountedPrice, Double discountPercent, String propertyType, List<String> imageUrls,
                    String propertyCategory, int numberOfBedrooms, int numberOfBathrooms, Double squareFeet,
                    PropertyStatus status) {
        this.id = id;
        this.seller = seller;
        this.propertyTitle = propertyTitle;
        this.description = description;
        this.location = location;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.discountPercent = discountPercent;
        this.propertyType = propertyType;
        this.imageUrls = imageUrls;
        this.propertyCategory = propertyCategory;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfBathrooms = numberOfBathrooms;
        this.squareFeet = squareFeet;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public String getPropertyTitle() {
        return propertyTitle;
    }

    public void setPropertyTitle(String propertyTitle) {
        this.propertyTitle = propertyTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(Double discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getPropertyCategory() {
        return propertyCategory;
    }

    public void setPropertyCategory(String propertyCategory) {
        this.propertyCategory = propertyCategory;
    }

    public int getNumberOfBedrooms() {
        return numberOfBedrooms;
    }

    public void setNumberOfBedrooms(int numberOfBedrooms) {
        this.numberOfBedrooms = numberOfBedrooms;
    }

    public int getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(int numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public Double getSquareFeet() {
        return squareFeet;
    }

    public void setSquareFeet(Double squareFeet) {
        this.squareFeet = squareFeet;
    }

    public PropertyStatus getStatus() {
        return status;
    }

    public void setStatus(PropertyStatus status) {
        this.status = status;
    }
}