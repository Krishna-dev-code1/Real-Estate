package com.example.realestate.service;

import com.example.realestate.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByEmail(String email);
    boolean validatePassword(String rawPassword, String encodedPassword);
    Optional<User> findUserById(Long id);
	List<User> getAllUsers();
}