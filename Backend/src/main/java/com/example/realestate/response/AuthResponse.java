package com.example.realestate.response;

import com.example.realestate.model.User;
import com.example.realestate.user.domain.UserRole;

import java.util.HashMap;
import java.util.Map;

public class AuthResponse {
    private String token;
    private boolean authenticated;
    private Map<String, Object> user;

    public AuthResponse(String token, boolean authenticated, User user) {
        this.token = token;
        this.authenticated = authenticated;
        setUser(user);
    }

    public String getToken() {
        return token;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public Map<String, Object> getUser() {
        return user;
    }

    private void setUser(User user) {
        this.user = new HashMap<>();

        if (user != null) {
            this.user.put("id", user.getUserId()); // Updated from getId() to getUserId()
            this.user.put("name", user.getName());
            this.user.put("email", user.getEmail());
            this.user.put("role", user.getRole());
            this.user.put("createdAt", user.getCreatedAt());
            this.user.put("updatedAt", user.getUpdatedAt());

            if (user.getRole() == UserRole.SELLER) {
                this.user.put("sellerId", user.getUserId()); // Updated from getId() to getUserId()
            }
        }
    }
}
