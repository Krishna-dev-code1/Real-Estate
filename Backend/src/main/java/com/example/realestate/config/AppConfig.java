package com.example.realestate.config;

//retpackage com.example.realestate.config;

import com.example.realestate.security.JwtFilter;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Value("secret") // Inject Razorpay key ID from application.properties
    private String razorpayKeyId;

    @Value("secret") // Inject Razorpay key secret from application.properties
    private String razorpayKeySecret;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Apply CORS config
            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless authentication
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/auth/register", "/auth/login").permitAll() // Public authentication endpoints
                .requestMatchers("/api/properties/type/BUY", "/api/properties/type/RENT").permitAll() // Allow public access to Buy/Rent properties
                .requestMatchers("/property/**", "/users", "/api/properties/all", "/users/*/role").permitAll() // Allow access to property listings and user roles
                .requestMatchers("/uploads/**").permitAll() // Allow access to uploaded files
                .requestMatchers("/ratings/**").permitAll() // Allow access to ratings endpoints

                

                .anyRequest().authenticated() // Secure all other endpoints
            )
            .addFilterBefore(jwtFilter, BasicAuthenticationFilter.class) // Register JwtFilter
            .httpBasic(); // Enable HTTP Basic authentication (optional)

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Allow frontend origin
            config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allow these methods
            config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // Allow specific headers
            config.setAllowCredentials(true); // Allow credentials (e.g., cookies)
            config.setExposedHeaders(Arrays.asList("Authorization")); // Expose Authorization header
            config.setMaxAge(3600L); // Cache CORS configuration for 1 hour
            return config;
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt for password encoding
    }

    @Bean
    public RazorpayClient razorpayClient() throws RazorpayException {
        // Initialize RazorpayClient with key ID and secret
        return new RazorpayClient(razorpayKeyId, razorpayKeySecret);
    }

    // Static file configuration to serve files from the upload directory
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configure static resource handler for serving uploaded files
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:C:\\Manipal_Project\\RealEstate\\Backend\\uploads");
    }
}
