package com.example.realestate.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.realestate.exception.PropertyException;
import com.example.realestate.model.Property;
import com.example.realestate.service.PropertyService;

@RestController
@RequestMapping("/api")
public class UserPropertyController {

    private PropertyService propertyService;

    public UserPropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("/properties")
    public ResponseEntity<Page<Property>> findPropertyByFilters(
            @RequestParam String propertyType,
            @RequestParam List<String> location,
            @RequestParam Integer minPrice,
            @RequestParam Integer maxPrice,
            @RequestParam String transactionType,
            @RequestParam String sort,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize) {

        Page<Property> res = propertyService.getAllProperties(
                propertyType, location, minPrice, maxPrice, transactionType, sort, pageNumber, pageSize);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/properties/id/{propertyId}")
    public ResponseEntity<Property> findPropertyByIdHandler(@PathVariable Long propertyId) throws PropertyException {

        Property property = propertyService.findPropertyById(propertyId);

        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    @GetMapping("/properties/search")
    public ResponseEntity<List<Property>> searchPropertyHandler(@RequestParam String q) {

        List<Property> properties = propertyService.searchProperty(q);

        return new ResponseEntity<>(properties, HttpStatus.OK);
    }
}
