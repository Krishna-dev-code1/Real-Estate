package com.example.realestate.response;

public class CreatePaymentLinkResponse {
    
    private String paymentLink;
    private String transactionId;
    private boolean success;
    private String message;

    public CreatePaymentLinkResponse() {
        // Default constructor
    }

    public CreatePaymentLinkResponse(String paymentLink, String transactionId, boolean success, String message) {
        this.paymentLink = paymentLink;
        this.transactionId = transactionId;
        this.success = success;
        this.message = message;
    }

    public String getPaymentLink() {
        return paymentLink;
    }

    public void setPaymentLink(String paymentLink) {
        this.paymentLink = paymentLink;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
