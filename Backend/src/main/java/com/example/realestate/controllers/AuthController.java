package com.example.realestate.controllers;

import com.example.realestate.exception.UserException;
import com.example.realestate.model.User;
import com.example.realestate.repository.UserRepository;
import com.example.realestate.request.LoginRequest;
import com.example.realestate.response.AuthResponse;
import com.example.realestate.security.JwtUtil;
import com.example.realestate.user.domain.UserRole;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody User user) throws UserException {
        // Check if email is already used
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserException("Email is already used with another account.");
        }

        // Create new user
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(user.getRole());



        userRepository.save(newUser);

        // Generate JWT token with userId
        String token = jwtUtil.generateToken(newUser.getUserId(), newUser.getEmail());

        // Create response
        AuthResponse authResponse = new AuthResponse(token, true, newUser);

        return ResponseEntity.ok(authResponse);
    }

    // Authenticate a user (Login)
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, true, user));
    }
}
