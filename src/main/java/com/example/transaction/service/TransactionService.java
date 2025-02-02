package com.example.transaction.service;

import com.alibaba.fastjson.JSONObject;
import com.example.transaction.enums.TransactionStatus;
import com.example.transaction.exception.TransactionException;
import com.example.transaction.model.Account;
import com.example.transaction.model.Transaction;
import com.example.transaction.repository.TransactionRepository;
import com.example.transaction.request.TransactionRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    private TaskExecutor taskExecutor; // For concurrent task executionLTRIM transaction_queue 1 0

    private static final String TRANSACTION_QUEUE_KEY = "transaction_queue";
    private static final String TRANSACTION_LOCK_KEY = "transaction_lock:";

    @Transactional
    @Async
    public void processTransaction(TransactionRequest request) throws TransactionException {
        // Generate unique lock key for this transaction
        String lockKey = TRANSACTION_LOCK_KEY + request.getTransactionId();

        // Attempt to acquire distributed lock to prevent concurrent processing
        boolean lockAcquired = acquireLock(lockKey);
        if (!lockAcquired) {
            logger.info("Transaction {} is being processed by another instance", request.getTransactionId());
            return; // Exit if another instance is already processing
        }

        try {
            // Retrieve existing transaction or create new record if not exists
            Transaction transaction = getOrCreateTransaction(request);

            // Skip processing if transaction is already completed
            if (transaction.getStatus() == TransactionStatus.COMPLETED) {
                logger.debug("Transaction {} already completed", request.getTransactionId());
                return;
            }

            // Update transaction status to IN_PROGRESS
            updateTransactionStatus(transaction, TransactionStatus.IN_PROGRESS);

            // Execute core funds transfer logic
            processFundsTransfer(request);

            // Mark transaction as completed after successful processing
            updateTransactionStatus(transaction, TransactionStatus.COMPLETED);

            // Remove processed transaction from Redis queue
            removeFromTransactionQueue(request);

        } catch (TransactionException e) {
            // Handle business logic failures (e.g., insufficient funds)
            handleTransactionFailure(request, e);
            throw e; // Re-throw exception for async error handling
        } finally {
            // Ensure lock release even if exceptions occur
            releaseLock(lockKey);
        }
    }

    /**
     * Acquires distributed lock using Redis
     * @param lockKey Unique lock identifier
     * @return true if lock acquired successfully, false otherwise
     */
    private boolean acquireLock(String lockKey) {
        return Boolean.TRUE.equals(
                redisTemplate.opsForValue().setIfAbsent(lockKey, "locked", 30, TimeUnit.SECONDS)
        );
    }

    /**
     * Retrieves existing transaction or creates new transaction record
     * @param request Transaction request data
     * @return Managed transaction entity
     */
    private Transaction getOrCreateTransaction(TransactionRequest request) {
        return transactionRepository.findByTransactionId(request.getTransactionId())
                .orElseGet(() -> createNewTransaction(request));
    }

    /**
     * Creates new transaction record with initial status
     * @param request Transaction request data
     * @return Newly created transaction entity
     */
    private Transaction createNewTransaction(TransactionRequest request) {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(request.getTransactionId());
        transaction.setSourceAccountId(request.getSourceAccountId());
        transaction.setDestinationAccountId(request.getDestinationAccountId());
        transaction.setAmount(request.getAmount());
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus(TransactionStatus.IN_PROGRESS);
        return transactionRepository.save(transaction);
    }

    /**
     * Updates transaction status and persists changes
     * @param transaction Transaction entity to update
     * @param status New status to set
     */
    private void updateTransactionStatus(Transaction transaction, TransactionStatus status) {
        transaction.setStatus(status);
        transactionRepository.save(transaction);
        logger.info("Transaction {} status updated to {}", transaction.getTransactionId(), status);
    }

    /**
     * Executes the core funds transfer between accounts
     * @param request Transaction request containing transfer details
     * @throws TransactionException if business rules are violated
     */
    private void processFundsTransfer(TransactionRequest request) throws TransactionException {
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

    /**
     * Removes processed transaction from Redis queue
     * @param request Processed transaction request
     */
    private void removeFromTransactionQueue(TransactionRequest request) {
        try {
            String queueValue = JSONObject.toJSONString(request);
            // Remove ALL occurrences of this transaction from the queue
            redisTemplate.opsForList().remove(TRANSACTION_QUEUE_KEY, 0, queueValue);
        } catch (Exception e) {
            logger.warn("Failed to remove transaction {} from queue: {}",
                    request.getTransactionId(), e.getMessage());
        }
    }

    /**
     * Handles transaction failure scenarios
     * @param request Failed transaction request
     * @param e Exception causing the failure
     */
    private void handleTransactionFailure(TransactionRequest request, Exception e) {
        logger.error("Transaction {} failed: {}", request.getTransactionId(), e.getMessage());

        transactionRepository.findByTransactionId(request.getTransactionId()).ifPresent(t -> {
            t.setStatus(TransactionStatus.FAILED);
            transactionRepository.save(t);
            logger.info("Marked transaction {} as FAILED", request.getTransactionId());
        });
    }

    /**
     * Releases the distributed lock
     * @param lockKey Lock identifier to release
     */
    private void releaseLock(String lockKey) {
        try {
            redisTemplate.delete(lockKey);
            logger.debug("Released lock for {}", lockKey);
        } catch (Exception e) {
            logger.error("Failed to release lock {}: {}", lockKey, e.getMessage());
        }
    }


    public void enqueueTransaction(TransactionRequest transactionRequest) {
        if (StringUtils.isEmpty(transactionRequest.getTransactionId())) {
            transactionRequest.setTransactionId(UUID.randomUUID().toString());
        }
        transactionRequest.setTimestamp(LocalDateTime.now());

        // Serialize the transaction request to JSON
        try {
            String transactionRequestJson = JSONObject.toJSONString(transactionRequest);

            // Store the entire transaction request object in Redis
            redisTemplate.opsForList().leftPush(TRANSACTION_QUEUE_KEY, transactionRequestJson);
        } catch (Exception e) {
            logger.error("Error serializing transaction request", e);
        }
    }


    // Start task processor thread to listen for tasks and process them asynchronously
    @PostConstruct
    public void startTransactionProcessor() {
        taskExecutor.execute(() -> {
            while (true) {
                // Pop the transaction request JSON string from the Redis queue
                String transactionRequestJson = redisTemplate.opsForList().rightPop(TRANSACTION_QUEUE_KEY);

                if (transactionRequestJson != null) {
                    try {
                        // Deserialize the transaction request from JSON
                        TransactionRequest transactionRequest = JSONObject.parseObject(transactionRequestJson, TransactionRequest.class);

                        // Process the transaction
                        processTransaction(transactionRequest);
                    } catch (Exception e) {
                        logger.error("Error deserializing transaction request", e);
                    }
                }

                try {
                    // Sleep to avoid tight loop, but won't block the entire system
                    Thread.sleep(1000); // Check queue every 1 second (adjust as needed)
                } catch (InterruptedException e) {
                    logger.error("Transaction processor error", e);
                }
            }
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
}
