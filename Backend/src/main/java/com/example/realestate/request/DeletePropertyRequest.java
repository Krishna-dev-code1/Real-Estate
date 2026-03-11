package com.example.realestate.request;

public class DeletePropertyRequest {
    
    private Long propertyId;

    public DeletePropertyRequest() {
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }
}
