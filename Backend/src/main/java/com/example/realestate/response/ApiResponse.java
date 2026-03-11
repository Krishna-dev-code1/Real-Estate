package com.example.realestate.response;

public class ApiResponse {
    
    private String message;
    private boolean success;
    
    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
    
    public ApiResponse() {
        // Default constructor
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
