package com.example.realestate.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JwtTokenProvider {

    private final SecretKey key;
    private final long expirationTime;

    // Use @Value to inject the JWT secret and expiration time from application.properties
    public JwtTokenProvider(
            @Value("${jwt.secret}") String jwtSecret,
            @Value("${jwt.expiration}") long expirationTime
    ) {
        if (jwtSecret == null || jwtSecret.isEmpty()) {
            throw new IllegalStateException("JWT secret is not configured. Please set 'jwt.secret' in application.properties.");
        }
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        this.expirationTime = expirationTime;
    }

    public String generateToken(Authentication auth) {
        String roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(auth.getName()) // User's email as subject
                .claim("roles", roles) // Store roles in the token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getEmailFromJwtToken(String jwt) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt.replace("Bearer ", ""))
                    .getBody();
            return claims.getSubject(); // Email is stored in Subject
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("JWT Token has expired", e);
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT Token", e);
        }
    }

    public Set<String> getRolesFromJwtToken(String jwt) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt.replace("Bearer ", ""))
                    .getBody();

            String roles = claims.get("roles", String.class);
            return roles != null ? Set.of(roles.split(",")) : Set.of();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT Token", e);
        }
    }
}