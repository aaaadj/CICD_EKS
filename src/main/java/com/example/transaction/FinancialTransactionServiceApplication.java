package com.example.transaction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FinancialTransactionServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinancialTransactionServiceApplication.class, args);
    }
}
