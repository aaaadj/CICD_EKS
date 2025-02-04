package com.example.transaction.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.Optional;

import com.example.transaction.exception.TransactionException;
import com.example.transaction.model.Account;
import com.example.transaction.repository.AccountRepository;
import com.example.transaction.request.AccountRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountService accountService;

    private Account account;
    private AccountRequest accountRequest;

    @BeforeEach
    void setUp() {
        account = new Account();
        account.setAccountId("12345");
        account.setBalance(BigDecimal.valueOf(1000.00));
        account.setAccountType("Saving");
        account.setCurrency("USD");

        accountRequest = new AccountRequest();
        accountRequest.setAccountId("12345");
        accountRequest.setBalance(BigDecimal.valueOf(1000.00));
        accountRequest.setAccountType("Saving");
        accountRequest.setCurrency("USD");
    }

    @Test
    void testGetAccountById_Success() {
        when(accountRepository.findById("12345")).thenReturn(Optional.of(account));
        Account result = accountService.getAccountById("12345");
        assertNotNull(result);
        assertEquals("12345", result.getAccountId());
    }

    @Test
    void testGetAccountById_NotFound() {
        when(accountRepository.findById("12345")).thenReturn(Optional.empty());
        assertThrows(TransactionException.class, () -> accountService.getAccountById("12345"));
    }

    @Test
    void testUpdateAccountBalance_Success() {
        when(accountRepository.findById("12345")).thenReturn(Optional.of(account));
        accountService.updateAccountBalance("12345", BigDecimal.valueOf(2000.00));
        assertEquals(BigDecimal.valueOf(2000.00), account.getBalance());
        verify(accountRepository).save(account);
    }

    @Test
    void testUpdateAccountBalance_AccountNotFound() {
        when(accountRepository.findById("12345")).thenReturn(Optional.empty());
        assertThrows(TransactionException.class, () -> accountService.updateAccountBalance("12345", BigDecimal.valueOf(2000.00)));
    }

    @Test
    void testCreateAccount_Success() {
        when(accountRepository.existsById("12345")).thenReturn(false);
        when(accountRepository.save(any(Account.class))).thenReturn(account);

        Account result = accountService.createAccount(accountRequest);
        assertNotNull(result);
        assertEquals("12345", result.getAccountId());
    }

    @Test
    void testCreateAccount_AlreadyExists() {
        when(accountRepository.existsById("12345")).thenReturn(true);
        assertThrows(TransactionException.class, () -> accountService.createAccount(accountRequest));
    }

    @Test
    void testDeleteAccount_Success() {
        when(accountRepository.existsById("12345")).thenReturn(true);
        doNothing().when(accountRepository).deleteById("12345");

        accountService.deleteAccount("12345");
        verify(accountRepository).deleteById("12345");
    }

    @Test
    void testDeleteAccount_NotFound() {
        when(accountRepository.existsById("12345")).thenReturn(false);
        assertThrows(TransactionException.class, () -> accountService.deleteAccount("12345"));
    }

    @Test
    void testSaveAccount_Success() {
        when(accountRepository.save(account)).thenReturn(account);
        Account result = accountService.save(account);
        assertNotNull(result);
        assertEquals("12345", result.getAccountId());
    }
}

