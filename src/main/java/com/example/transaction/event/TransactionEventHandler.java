package com.example.transaction.event;

import com.example.transaction.model.Transaction;
import com.example.transaction.request.TransactionRequest;
import com.example.transaction.service.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class TransactionEventHandler {

    private static final Logger logger = LoggerFactory.getLogger(TransactionEventHandler.class);

    @Autowired
    private TransactionService transactionService;

    @TransactionalEventListener(
            phase = TransactionPhase.AFTER_COMMIT,
            classes = TransactionSavedEvent.class
    )
    public void handleTransactionSavedEvent(TransactionSavedEvent event) {
        Transaction request = event.getTransaction();
        logger.info("Received event for transaction {}", request.getTransactionId());
        transactionService.processTransactionAsync(request);
    }
}
