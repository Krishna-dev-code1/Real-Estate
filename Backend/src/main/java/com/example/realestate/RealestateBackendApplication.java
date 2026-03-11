package com.example.realestate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.realestate.model")
@EnableJpaRepositories(basePackages = "com.example.realestate.repository")
public class RealestateBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(RealestateBackendApplication.class, args);
    }
}