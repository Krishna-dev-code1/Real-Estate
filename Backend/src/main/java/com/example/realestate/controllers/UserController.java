package com.example.realestate.controllers;

import com.example.realestate.response.UserResponse;
import com.example.realestate.model.User;
import com.example.realestate.repository.UserRepository;
import com.example.realestate.security.JwtUtil;
import com.example.realestate.service.UserService;
import com.example.realestate.user.domain.UserRole;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@Valid @RequestBody User user) {
        User registeredUser = userService.saveUser(user);
        String token = jwtUtil.generateToken(registeredUser.getEmail());

        UserResponse userResponse = mapUserToResponse(registeredUser);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", userResponse);
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> userOptional = userService.findByEmail(email);

        if (userOptional.isPresent() && userService.validatePassword(password, userOptional.get().getPassword())) {
            User user = userOptional.get();
            String token = jwtUtil.generateToken(email);

            UserResponse userResponse = mapUserToResponse(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("user", userResponse);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(401).body(response);
        }
    }

    private UserResponse mapUserToResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
    }
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String newRole = request.get("role");

            // Ensure the role is valid
            if (!List.of("BUYER", "SELLER", "AGENT", "ADMIN").contains(newRole.toUpperCase())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid role"));
            }
            user.setRole(UserRole.valueOf(newRole.toUpperCase()));

            //user.setRole(newRole.toUpperCase());
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "Role updated successfully", "newRole", newRole));
        }
        return ResponseEntity.notFound().build();
    }


}
