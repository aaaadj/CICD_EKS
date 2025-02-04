package com.example.transaction.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.transaction.enums.TransactionStatus;
import com.example.transaction.event.TransactionSavedEvent;
import com.example.transaction.exception.TransactionException;
import com.example.transaction.model.Account;
import com.example.transaction.model.Transaction;
import com.example.transaction.repository.TransactionRepository;
import com.example.transaction.request.TransactionRequest;
import com.example.transaction.service.AccountService;
import com.example.transaction.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@ExtendWith(MockitoExtension.class)
@SpringBootTest(properties = "spring.scheduling.enabled=false")
@MockitoSettings(strictness = Strictness.LENIENT)  // Use lenient mode for dev,I can get more information
@TestPropertySource(locations = "classpath:application-test.properties") // use my h2 database do test for clean rds database
public class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private AccountService accountService;

    @Mock
    private RedisTemplate<String, String> redisTemplate;

    @Mock
    private ValueOperations<String, String> valueOperations;  // Mock ValueOperations

    @Mock
    private ApplicationEventPublisher eventPublisher; // Mock the event publisher


    @InjectMocks
    private TransactionService transactionService;

    private TransactionRequest transactionRequest;
    private Account sourceAccount;
    private Account destinationAccount;
    private Account destAccount;
    private Transaction transaction;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        transactionRequest = new TransactionRequest();
        transactionRequest.setSourceAccountId("test-123");
        transactionRequest.setDestinationAccountId("test-456");
        transactionRequest.setAmount(BigDecimal.valueOf(100));

        sourceAccount = new Account();
        sourceAccount.setAccountId("123");
        sourceAccount.setBalance(BigDecimal.valueOf(500));

        destinationAccount = new Account();
        destinationAccount.setAccountId("456");
        destinationAccount.setBalance(BigDecimal.valueOf(100));

        transaction = new Transaction();
        transaction.setTransactionId("txn123");
        transaction.setSourceAccountId("123");
        transaction.setDestinationAccountId("456");
        transaction.setAmount(BigDecimal.valueOf(100));
        transaction.setStatus(TransactionStatus.PENDING);


        destAccount = new Account();
        destAccount.setAccountId("456");
        destAccount.setBalance(BigDecimal.valueOf(50));

        when(redisTemplate.opsForValue()).thenReturn(valueOperations);

    }

    @Test
    void enqueueTransaction_shouldSaveTransaction() {
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        transactionService.enqueueTransaction(transactionRequest);

//        verify(transactionRepository, times(1)).save(argThat(t ->
//                t.getStatus() == TransactionStatus.COMPLETED
//        ));
    }

    @Test
    void processTransactionAsync_shouldProcessSuccessfully() throws TransactionException {
        when(transactionRepository.findByTransactionId(anyString())).thenReturn(Optional.of(transaction));
        when(accountService.getAccountById("123")).thenReturn(sourceAccount);
        when(accountService.getAccountById("456")).thenReturn(destinationAccount);
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any())).thenReturn(true);

        transactionService.processTransactionAsync(transaction);

        assertEquals(TransactionStatus.COMPLETED, transaction.getStatus());
        verify(accountService, times(2)).save(any(Account.class));
    }

    @Test
    void processTransactionAsync_shouldFailWhenInsufficientFunds() throws TransactionException {
        sourceAccount.setBalance(BigDecimal.valueOf(50)); // Insufficient funds

        when(transactionRepository.findByTransactionId(anyString())).thenReturn(Optional.of(transaction));
        when(accountService.getAccountById("123")).thenReturn(sourceAccount);
        when(accountService.getAccountById("456")).thenReturn(destinationAccount);
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any())).thenReturn(true);

        transactionService.processTransactionAsync(transaction);

        assertEquals(TransactionStatus.FAILED, transaction.getStatus());
    }

    @Test
    void enqueueTransaction_shouldSaveTransactionAndPublishEvent() {
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        transactionService.enqueueTransaction(transactionRequest);

        // Verify if the transaction is saved
        verify(transactionRepository, times(1)).save(any(Transaction.class));

        // Verify if the event is published
        verify(eventPublisher, times(1)).publishEvent(any(TransactionSavedEvent.class));
    }
    @Test
    void processTransactionAsync_shouldSkipIfAlreadyCompleted() throws TransactionException {
        transaction.setStatus(TransactionStatus.COMPLETED);

        transactionService.processTransactionAsync(transaction);

        verify(transactionRepository, times(0)).save(any(Transaction.class)); // Transaction should not be processed again
    }

    @Test
    void processTransactionAsync_shouldSkipIfLockNotAcquired() throws TransactionException {
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any())).thenReturn(false);

        transactionService.processTransactionAsync(transaction);

        verify(transactionRepository, times(0)).save(any(Transaction.class)); // Transaction should not be processed
    }

    @Test
    void processPendingTransactions_shouldSkipIfTaskLockNotAcquired() {
        when(redisTemplate.opsForValue().setIfAbsent("PENDING_TRANSACTION_TASK_LOCK", "LOCKED", 60, TimeUnit.SECONDS)).thenReturn(false);

        transactionService.processPendingTransactions();

        // Verify that the transaction processing was skipped due to lock acquisition failure
        verify(transactionRepository, times(0)).findByStatusIn(anyList());
    }

    @Test
    void processPendingTransactions_shouldProcessPendingTransactions() {
        when(redisTemplate.opsForValue().setIfAbsent("PENDING_TRANSACTION_TASK_LOCK", "LOCKED", 60, TimeUnit.SECONDS)).thenReturn(true);
        when(transactionRepository.findByStatusIn(anyList())).thenReturn(Collections.singletonList(transaction));
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any())).thenReturn(true);

        transactionService.processPendingTransactions();

        // Verify that the pending transaction was processed
        verify(transactionRepository, times(1)).findByStatusIn(anyList());
    }

    @Test
    void acquireLock_shouldReturnTrueIfLockAcquired() {
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any()))
                .thenReturn(true);

        boolean result = transactionService.acquireLock("LOCK_KEY");

        assertTrue(result);
    }

    @Test
    void releaseLock_shouldDeleteLock() {
        transactionService.releaseLock("LOCK_KEY");

        verify(redisTemplate, times(1)).delete("LOCK_KEY");
    }

    @Test
    void handleTransactionFailure_shouldMarkTransactionAsFailed() {
        // Mock the transactionRepository.findByTransactionId to return the transaction
        when(transactionRepository.findByTransactionId(anyString())).thenReturn(Optional.of(transaction));

        // Call the method to test
        transactionService.handleTransactionFailure(transaction, new TransactionException("Insufficient funds"));

        // Verify that the save method was called once and the status is set to FAILED
        verify(transactionRepository, times(1)).save(argThat(t -> t.getStatus() == TransactionStatus.FAILED));
    }



    @Test
    void testEnqueueTransaction_Success() {
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        transactionService.enqueueTransaction(transactionRequest);

        verify(transactionRepository).save(any(Transaction.class));
        verify(eventPublisher).publishEvent(any(TransactionSavedEvent.class));
    }

    @Test
    void testEnqueueTransaction_InvalidTransactionId() {
        transactionRequest.setTransactionId(null); // Simulate empty transactionId
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        transactionService.enqueueTransaction(transactionRequest);

        assertNotNull(transactionRequest.getTransactionId());
        verify(transactionRepository).save(any(Transaction.class));
    }

    @Test
    void testProcessTransactionAsync_LockAcquired_Success() {
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any())).thenReturn(true);
        when(transactionRepository.findByTransactionId("txn123")).thenReturn(Optional.of(transaction));
        when(accountService.getAccountById("123")).thenReturn(sourceAccount);
        when(accountService.getAccountById("456")).thenReturn(destAccount);

        transactionService.processTransactionAsync(transaction);

        verify(accountService).save(sourceAccount);
        verify(accountService).save(destAccount);
        verify(transactionRepository, times(2)).save(any(Transaction.class));

    }

    @Test
    void testProcessTransactionAsync_LockNotAcquired() {
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any())).thenReturn(false);

        transactionService.processTransactionAsync(transaction);

        verify(transactionRepository, never()).save(any(Transaction.class)); // No save operation should occur
    }

    @Test
    void testProcessTransactionAsync_InsufficientFunds() {
        // Set up mock accounts
        Account sourceAccount = new Account();
        sourceAccount.setAccountId("123");
        sourceAccount.setBalance(BigDecimal.valueOf(50)); // Insufficient funds

        Account destAccount = new Account();
        destAccount.setAccountId("456");
        destAccount.setBalance(BigDecimal.valueOf(100)); // No changes expected in destination account

        // Set up mocks
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any())).thenReturn(true);
        when(transactionRepository.findByTransactionId("txn123")).thenReturn(Optional.of(transaction));
        when(accountService.getAccountById("123")).thenReturn(sourceAccount);
        when(accountService.getAccountById("456")).thenReturn(destAccount);

        // Process the transaction asynchronously
        transactionService.processTransactionAsync(transaction);

        // Verify that the transaction status is updated to FAILED
        verify(transactionRepository, times(2)).save(any(Transaction.class));

    }


    @Test
    void testProcessTransactionAsync_AlreadyCompleted() {
        transaction.setStatus(TransactionStatus.COMPLETED);

        transactionService.processTransactionAsync(transaction);

        verify(transactionRepository, never()).save(any(Transaction.class)); // No save operation should occur
    }

    @Test
    void testGetTransactionStatus_Success() {
        when(transactionRepository.findByTransactionId("txn123")).thenReturn(Optional.of(transaction));

        String status = transactionService.getTransactionStatus("txn123");

        assertEquals(TransactionStatus.PENDING.toString(), status);
    }

    @Test
    void testGetTransactionStatus_NotFound() {
        when(transactionRepository.findByTransactionId("txn123")).thenReturn(Optional.empty());

        assertThrows(TransactionException.class, () -> transactionService.getTransactionStatus("txn123"));
    }

    @Test
    void testHandleTransactionFailure() {
        transaction.setStatus(TransactionStatus.IN_PROGRESS);
        when(transactionRepository.findByTransactionId("txn123")).thenReturn(Optional.of(transaction));

        transactionService.handleTransactionFailure(transaction, new TransactionException("Failure"));

        assertEquals(TransactionStatus.FAILED, transaction.getStatus());
        verify(transactionRepository).save(transaction);
    }

    @Test
    void testProcessPendingTransactions_Success() {
        List<Transaction> pendingTransactions = Arrays.asList(transaction);

        when(redisTemplate.opsForValue().setIfAbsent(eq("PENDING_TRANSACTION_TASK_LOCK"), eq("LOCKED"), eq(60L), eq(TimeUnit.SECONDS)))
                .thenReturn(true);
        when(transactionRepository.findByStatusIn(anyList())).thenReturn(pendingTransactions);
        when(redisTemplate.opsForValue().setIfAbsent(anyString(), anyString(), anyLong(), any())).thenReturn(true);
        when(transactionRepository.findByTransactionId("txn123")).thenReturn(Optional.of(transaction));
        when(accountService.getAccountById("123")).thenReturn(sourceAccount);
        when(accountService.getAccountById("456")).thenReturn(destAccount);

        transactionService.processPendingTransactions();

        verify(accountService).save(sourceAccount);
        verify(accountService).save(destAccount);
        verify(transactionRepository).save(any(Transaction.class));
    }

    @Test
    void testProcessPendingTransactions_LockNotAcquired() {
        // Mocking the lock acquisition to return false
        when(redisTemplate.opsForValue().setIfAbsent(eq("PENDING_TRANSACTION_TASK_LOCK"), eq("LOCKED"), eq(60), eq(TimeUnit.SECONDS)))
                .thenReturn(false);

        // Call the method
        transactionService.processPendingTransactions();

        // Verify that the repository method was not called
        verify(transactionRepository, never()).findByStatusIn(anyList());
    }
}
