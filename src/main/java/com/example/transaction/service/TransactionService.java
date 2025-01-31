package com.example.transaction.service;

import com.example.transaction.exception.TransactionException;
import com.example.transaction.model.Account;
import com.example.transaction.model.Transaction;
import com.example.transaction.repository.TransactionRepository;
import com.example.transaction.request.TransactionRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountService accountService;

    public TransactionService(TransactionRepository transactionRepository, AccountService accountService) {
        this.transactionRepository = transactionRepository;
        this.accountService = accountService;
    }

    /**
     * Processes a financial transaction by updating source and destination account balances.
     *
     * @param transactionRequest the transaction details
     * @throws TransactionException if the transaction fails validation or processing
     */
    public void processTransaction(TransactionRequest transactionRequest) throws TransactionException {
        // Validate transaction details
        validateTransactionRequest(transactionRequest);

        // Retrieve source and destination accounts
        Account sourceAccount = accountService.getAccountById(transactionRequest.getSourceAccountId());
        Account destinationAccount = accountService.getAccountById(transactionRequest.getDestinationAccountId());

        // Check for sufficient funds in the source account
        if (sourceAccount.getBalance().compareTo(transactionRequest.getAmount()) < 0) {
            throw new TransactionException("Insufficient funds in source account.");
        }

        // Perform the transaction
        synchronized (this) {
            accountService.updateAccountBalance(sourceAccount.getAccountId(), sourceAccount.getBalance().subtract(transactionRequest.getAmount()));
            accountService.updateAccountBalance(destinationAccount.getAccountId(), destinationAccount.getBalance().add(transactionRequest.getAmount()));
        }

        // Save transaction record
        Transaction transaction = new Transaction();
        transaction.setTransactionId(transactionRequest.getTransactionId());
        transaction.setSourceAccountId(transactionRequest.getSourceAccountId());
        transaction.setDestinationAccountId(transactionRequest.getDestinationAccountId());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setTimestamp(transactionRequest.getTimestamp());
        transactionRepository.save(transaction);
    }

    /**
     * Retrieves the status of a transaction by its ID.
     *
     * @param transactionId the ID of the transaction
     * @return the transaction status
     * @throws TransactionException if the transaction is not found
     */
    public String getTransactionStatus(String transactionId) throws TransactionException {
        Transaction transaction = transactionRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new TransactionException("Transaction not found."));
        return "Transaction ID: " + transaction.getTransactionId() + ", Status: SUCCESS";
    }

    /**
     * Validates the transaction request.
     *
     * @param transactionRequest the transaction details
     * @throws TransactionException if the validation fails
     */
    private void validateTransactionRequest(TransactionRequest transactionRequest) throws TransactionException {
        if (transactionRequest.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new TransactionException("Transaction amount must be greater than zero.");
        }
        if (transactionRequest.getSourceAccountId().equals(transactionRequest.getDestinationAccountId())) {
            throw new TransactionException("Source and destination accounts must be different.");
        }
    }
}
