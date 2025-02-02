package com.example.transaction.controller;

import com.example.transaction.exception.TransactionException;
import com.example.transaction.request.TransactionRequest;
import com.example.transaction.service.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {


    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    /**
     * Endpoint to process a transaction.
     *
     * @param transactionRequest the transaction details
     * @return ResponseEntity indicating success or failure
     */
    @PostMapping("/process")
    public ResponseEntity<String> processTransaction(@Valid @RequestBody TransactionRequest transactionRequest) {
        try {
            // Enqueue the transaction request to Redis for processing
            transactionService.enqueueTransaction(transactionRequest);
            return ResponseEntity.ok("Transaction is being processed");
        } catch (TransactionException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing transaction: " + e.getMessage());
        }
    }

    /**
     * Endpoint to get transaction status by ID.
     *
     * @param transactionId the ID of the transaction
     * @return the status of the transaction
     */
    @GetMapping("/{transactionId}/status")
    public ResponseEntity<String> getTransactionStatus(@PathVariable String transactionId) {
        try {
            String status = transactionService.getTransactionStatus(transactionId);
            return ResponseEntity.ok(status);
        } catch (TransactionException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found: " + e.getMessage());
        }
    }
}

