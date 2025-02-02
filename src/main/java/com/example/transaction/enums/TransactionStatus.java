package com.example.transaction.enums;

public enum TransactionStatus {
    PENDING,         // Transaction has been received but not yet processed
    IN_PROGRESS,     // Transaction is being processed
    COMPLETED,       // Transaction has been completed successfully
    FAILED,          // Transaction has failed
    CANCELLED        // Transaction was cancelled
}
