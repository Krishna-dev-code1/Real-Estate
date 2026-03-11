package com.example.realestate.controllers;

import com.example.realestate.request.PaymentRequest;
import com.example.realestate.model.User;
import com.example.realestate.model.Property;
import com.example.realestate.repository.UserRepository;
import com.example.realestate.repository.PropertyRepository;
import com.example.realestate.service.PaymentService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @PostMapping("/create-order")
    public String createOrder(@RequestBody PaymentRequest paymentRequest) throws Exception {
        User user = userRepository.findById(paymentRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Property property = propertyRepository.findById(paymentRequest.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        return paymentService.createOrder(user, property, paymentRequest.getAmount());
    }

    @PostMapping("/callback")
    public String handlePaymentCallback(@RequestBody String payload) {
        JSONObject jsonObject = new JSONObject(payload);
        String razorpayPaymentId = jsonObject.getString("razorpay_payment_id");
        String razorpayOrderId = jsonObject.getString("razorpay_order_id");

        paymentService.handlePaymentCallback(razorpayPaymentId, razorpayOrderId);
        return "Callback received";
    }
}