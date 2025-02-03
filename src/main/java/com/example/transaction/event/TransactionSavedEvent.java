package com.example.transaction.event;

import com.example.transaction.model.Transaction;
import com.example.transaction.request.TransactionRequest;
import org.springframework.context.ApplicationEvent;

public class TransactionSavedEvent extends ApplicationEvent {
    private final Transaction transaction;

    public TransactionSavedEvent(Object source, Transaction transaction) {
        super(source);
        this.transaction = transaction;
    }

    public Transaction getTransaction() {
        return transaction;
    }
}