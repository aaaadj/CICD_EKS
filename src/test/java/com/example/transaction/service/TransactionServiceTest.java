package com.example.transaction.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.transaction.enums.TransactionStatus;
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
import java.util.Optional;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
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
    private Transaction transaction;

    @BeforeEach
    void setUp() {
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

        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
    }

    @Test
    void enqueueTransaction_shouldSaveTransaction() {
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        transactionService.enqueueTransaction(transactionRequest);

        verify(transactionRepository, times(1)).save(any(Transaction.class));
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
}
