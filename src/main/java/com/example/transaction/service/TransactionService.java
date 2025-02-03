package com.example.transaction.service;

import com.alibaba.fastjson.JSONObject;
import com.example.transaction.enums.TransactionStatus;
import com.example.transaction.event.TransactionSavedEvent;
import com.example.transaction.exception.TransactionException;
import com.example.transaction.model.Account;
import com.example.transaction.model.Transaction;
import com.example.transaction.repository.TransactionRepository;
import com.example.transaction.request.TransactionRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.task.TaskExecutor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class TransactionService {

    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate; // Redis client

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    private static final String TRANSACTION_LOCK_KEY = "transaction_lock:";

    private static final String TASK_LOCK_KEY = "PENDING_TRANSACTION_TASK_LOCK"; // Redis key for task lock


    @Transactional
    public void enqueueTransaction(TransactionRequest transactionRequest) throws TransactionException {
        if (StringUtils.isEmpty(transactionRequest.getTransactionId())) {
            transactionRequest.setTransactionId(UUID.randomUUID().toString());
        }
        transactionRequest.setTimestamp(LocalDateTime.now());

        // Save the transaction to DB immediately upon receiving the request
        Transaction transaction = new Transaction();
        transaction.setTransactionId(transactionRequest.getTransactionId());
        transaction.setSourceAccountId(transactionRequest.getSourceAccountId());
        transaction.setDestinationAccountId(transactionRequest.getDestinationAccountId());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setTimestamp(transactionRequest.getTimestamp());
        transaction.setStatus(TransactionStatus.PENDING);
        transactionRepository.save(transaction);

        logger.info("Transaction {} has been saved to DB", transactionRequest.getTransactionId());

        // Now process the transaction asynchronously in an event
        eventPublisher.publishEvent(
                new TransactionSavedEvent(this, transaction)
        );
    }

    // Asynchronous method for processing transaction after it has been saved in the DB
    @Async("transactionTaskExecutor")
    @Transactional
    public void processTransactionAsync(Transaction transaction) {
        String lockKey = TRANSACTION_LOCK_KEY + transaction.getTransactionId();

        // Attempt to acquire the distributed lock to ensure only one instance is processing the transaction
        boolean lockAcquired = acquireLock(lockKey);
        if (!lockAcquired) {
            logger.info("Transaction {} is being processed by another instance", transaction.getTransactionId());
            return; // Exit if another instance is already processing
        }

        try {

            // Skip processing if transaction is already completed
            if (transaction.getStatus() == TransactionStatus.COMPLETED) {
                logger.debug("Transaction {} already completed", transaction.getTransactionId());
                return;
            }

            // Update transaction status to IN_PROGRESS
            updateTransactionStatus(transaction, TransactionStatus.IN_PROGRESS);

            // Execute core funds transfer logic
            processFundsTransfer(transaction);

            // Mark transaction as completed after successful processing
            updateTransactionStatus(transaction, TransactionStatus.COMPLETED);

        } catch (TransactionException e) {
            // Handle business logic failures (e.g., insufficient funds)
            handleTransactionFailure(transaction, e);
        } finally {
            // Ensure lock release even if exceptions occur
            releaseLock(lockKey);
        }
    }

    // Acquires distributed lock using Redis
    private boolean acquireLock(String lockKey) {
        return Boolean.TRUE.equals(
                redisTemplate.opsForValue().setIfAbsent(lockKey, "locked", 30, TimeUnit.SECONDS)
        );
    }

    // Releases the distributed lock
    private void releaseLock(String lockKey) {
        try {
            redisTemplate.delete(lockKey);
            logger.debug("Released lock for {}", lockKey);
        } catch (Exception e) {
            logger.error("Failed to release lock {}: {}", lockKey, e.getMessage());
        }
    }

    private void updateTransactionStatus(Transaction transaction, TransactionStatus status) {
        transaction.setStatus(status);
        transactionRepository.save(transaction);
        logger.info("Transaction {} status updated to {}", transaction.getTransactionId(), status);
    }

    private void processFundsTransfer(Transaction request) throws TransactionException {
        // Retrieve account entities
        Account source = accountService.getAccountById(request.getSourceAccountId());
        Account dest = accountService.getAccountById(request.getDestinationAccountId());

        // Validate source account balance
        if (source.getBalance().compareTo(request.getAmount()) < 0) {
            throw new TransactionException("Insufficient funds in account " + source.getAccountId());
        }

        // Perform balance adjustments
        source.setBalance(source.getBalance().subtract(request.getAmount()));
        dest.setBalance(dest.getBalance().add(request.getAmount()));

        // Persist account changes
        accountService.save(source);
        accountService.save(dest);
        logger.debug("Funds transfer completed: {} from {} to {}",
                request.getAmount(), source.getAccountId(), dest.getAccountId());
    }

    private void handleTransactionFailure(Transaction request, Exception e) {
        logger.error("Transaction {} failed: {}", request.getTransactionId(), e.getMessage());

        transactionRepository.findByTransactionId(request.getTransactionId()).ifPresent(t -> {
            t.setStatus(TransactionStatus.FAILED);
            transactionRepository.save(t);
            logger.info("Marked transaction {} as FAILED", request.getTransactionId());
        });
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

    /**
     * Scheduled task to process pending transactions.
     * This task ensures that only one instance is processing transactions at any given time.
     * It uses Redis to acquire a distributed lock, preventing other instances from executing at the same time.
     */
    @Scheduled(fixedRateString = "${transaction.scheduled.fixedRate}")
    public void processPendingTransactions() {
        // Attempt to acquire a Redis lock for processing the pending transactions
        Boolean taskLockAcquired = redisTemplate.opsForValue().setIfAbsent(TASK_LOCK_KEY, "LOCKED", 60, TimeUnit.SECONDS);

        if (!taskLockAcquired) {
            logger.info("Another instance is already processing transactions. Skipping this cycle.");
            return; // If the lock is not acquired, skip this execution
        }

        try {
            logger.info("Starting to process pending transactions...");

            List<Transaction> pendingTransactions = transactionRepository.findByStatusIn(Arrays.asList(TransactionStatus.PENDING, TransactionStatus.IN_PROGRESS));

            for (Transaction transaction : pendingTransactions) {
                String lockKey = TRANSACTION_LOCK_KEY + transaction.getTransactionId();
                boolean lockAcquired = acquireLock(lockKey);

                if (lockAcquired) {
                    try {
                        //
                        if (transaction.getStatus() == TransactionStatus.PENDING || transaction.getStatus() == TransactionStatus.IN_PROGRESS) {
                            logger.info("Processing pending or in-progress transaction {}", transaction.getTransactionId());
                            //
                            processFundsTransfer(transaction);
                            //
                            updateTransactionStatus(transaction, TransactionStatus.COMPLETED);
                        }
                    } catch (TransactionException e) {
                        //
                        handleTransactionFailure(transaction, e);
                    } finally {
                        //
                        releaseLock(lockKey);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("transaction scheduled error,{}",e.getMessage());
        }
    }
}

