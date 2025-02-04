package com.example.transaction.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.transaction.controller.TransactionController;
import com.example.transaction.exception.TransactionException;
import com.example.transaction.request.TransactionRequest;
import com.example.transaction.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

@WebMvcTest(TransactionController.class)
@TestPropertySource(locations = "classpath:application-test.properties") // use my h2 database do test for clean rds database
public class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService transactionService;

    @Autowired
    private ObjectMapper objectMapper;

    private TransactionRequest transactionRequest;

    @BeforeEach
    public void setUp() {
        transactionRequest = new TransactionRequest();
        transactionRequest.setSourceAccountId("test-123");
        transactionRequest.setDestinationAccountId("test-456");
        transactionRequest.setAmount(BigDecimal.valueOf(100));
    }

    @Test
    void processTransaction_shouldReturnSuccess() throws Exception {
        doNothing().when(transactionService).enqueueTransaction(any(TransactionRequest.class));

        mockMvc.perform(post("/api/v1/transactions/process")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(transactionRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("Transaction accepted"));
    }

    @Test
    void getTransactionStatus_shouldReturnStatus() throws Exception {
        when(transactionService.getTransactionStatus(anyString())).thenReturn("PENDING");

        mockMvc.perform(get("/api/v1/transactions/{transactionId}/status", "txn123"))
                .andExpect(status().isOk())
                .andExpect(content().string("PENDING"));
    }

    @Test
    void getTransactionStatus_shouldReturnNotFound() throws Exception {
        when(transactionService.getTransactionStatus(anyString())).thenThrow(new TransactionException("Transaction not found"));

        mockMvc.perform(get("/api/v1/transactions/{transactionId}/status", "txn123"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Transaction not found: Transaction not found"));
    }

    @Test
    void processTransaction_shouldReturnBadRequest_whenMissingRequiredField() throws Exception {
        // Missing sourceAccountId
        transactionRequest.setSourceAccountId(null);

        mockMvc.perform(post("/api/v1/transactions/process")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(transactionRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void processTransaction_shouldReturnBadRequest_whenInvalidAmount() throws Exception {
        // Invalid amount (less than 0.01)
        transactionRequest.setAmount(BigDecimal.valueOf(0));

        mockMvc.perform(post("/api/v1/transactions/process")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(transactionRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void processTransaction_shouldReturnInternalServerError_whenUnexpectedError() throws Exception {
        doThrow(new RuntimeException("Unexpected error")).when(transactionService).enqueueTransaction(any(TransactionRequest.class));

        mockMvc.perform(post("/api/v1/transactions/process")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(transactionRequest)))
                .andExpect(status().isInternalServerError());
    }

}
