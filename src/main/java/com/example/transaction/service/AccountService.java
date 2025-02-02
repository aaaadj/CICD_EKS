package com.example.transaction.service;

import com.example.transaction.exception.TransactionException;
import com.example.transaction.model.Account;
import com.example.transaction.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account getAccountById(String accountId) throws TransactionException {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new TransactionException("Account not found: " + accountId));
    }

    public void updateAccountBalance(String accountId, BigDecimal newBalance) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new TransactionException("Account not found: " + accountId));
        account.setBalance(newBalance);
        accountRepository.save(account);
    }

    public Account createAccount(Account account) {
        if (accountRepository.existsById(account.getAccountId())) {
            throw new TransactionException("Account with ID " + account.getAccountId() + " already exists.");
        }
        return accountRepository.save(account);
    }

    public void deleteAccount(String accountId) {
        if (!accountRepository.existsById(accountId)) {
            throw new TransactionException("Account with ID " + accountId + " does not exist.");
        }
        accountRepository.deleteById(accountId);
    }

    public Account save(Account account) {
        return accountRepository.save(account);
    }

}
