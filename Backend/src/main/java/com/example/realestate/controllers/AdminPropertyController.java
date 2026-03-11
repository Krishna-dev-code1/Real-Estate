package com.example.realestate.controllers;

import com.example.realestate.model.Property;
import com.example.realestate.request.CreatePropertyRequest;
import com.example.realestate.response.ApiResponse;
import com.example.realestate.service.PropertyService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/properties")
public class AdminPropertyController {

    private final PropertyService propertyService;

    public AdminPropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @PostMapping("/")
    public ResponseEntity<Property> createProperty(@RequestBody CreatePropertyRequest request) {
        Property property = propertyService.createProperty(request);
        return new ResponseEntity<>(property, HttpStatus.CREATED);
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long propertyId) {
        Property property = propertyService.getPropertyById(propertyId);
        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    @PutMapping("/{propertyId}/update")
    public ResponseEntity<Property> updateProperty(@PathVariable Long propertyId, @RequestBody Property updatedProperty) {
        Property property = propertyService.updateProperty(propertyId, updatedProperty);
        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    @DeleteMapping("/{propertyId}/delete")
    public ResponseEntity<ApiResponse> deleteProperty(@PathVariable Long propertyId) {
        propertyService.deleteProperty(propertyId);
        return new ResponseEntity<>(new ApiResponse("Property deleted successfully", true), HttpStatus.OK);
    }
}
