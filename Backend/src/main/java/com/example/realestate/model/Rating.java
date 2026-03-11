package com.example.realestate.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double rating;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "property_id")
    private Long propertyId;

    // Other fields, getters, and setters
}