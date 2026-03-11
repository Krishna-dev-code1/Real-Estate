package com.example.realestate.service;

import com.example.realestate.model.Payment;
import com.example.realestate.model.User;
import com.example.realestate.model.Property;
import com.example.realestate.repository.PaymentRepository;
import com.example.realestate.user.domain.PaymentStatus;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private RazorpayClient razorpayClient;

    @Autowired
    private PaymentRepository paymentRepository;

    public String createOrder(User user, Property property, Double amount) throws RazorpayException {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // Amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_receipt_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setProperty(property);
        payment.setRazorpayOrderId(order.get("id"));
        payment.setStatus(PaymentStatus.PENDING); // Set initial status to PENDING
        payment.setAmount(amount);
        paymentRepository.save(payment);

        return order.toString();
    }

    public void handlePaymentCallback(String razorpayPaymentId, String razorpayOrderId) {
        Optional<Payment> paymentOptional = paymentRepository.findByRazorpayOrderId(razorpayOrderId);

        if (paymentOptional.isPresent()) {
            Payment payment = paymentOptional.get();
            payment.setRazorpayPaymentId(razorpayPaymentId);
            payment.setStatus(PaymentStatus.COMPLETED); // Update status to COMPLETED
            paymentRepository.save(payment);
        } else {
            throw new RuntimeException("Payment not found for order ID: " + razorpayOrderId);
        }
    }
}