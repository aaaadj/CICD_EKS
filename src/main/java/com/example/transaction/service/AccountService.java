package com.example.transaction.service;

import com.example.transaction.exception.TransactionException;
import com.example.transaction.model.Account;
import com.example.transaction.repository.AccountRepository;
import com.example.transaction.request.AccountRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    /**
     * Retrieve an account by its ID. If not found, throws a custom exception.
     */
    public Account getAccountById(String accountId) throws TransactionException {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new TransactionException("Account not found: " + accountId));
    }

    /**
     * Update the balance of an account by its ID.
     * The new balance is validated before saving.
     */
    public void updateAccountBalance(String accountId, BigDecimal newBalance) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new TransactionException("Account not found: " + accountId));
        account.setBalance(newBalance);
        accountRepository.save(account);
    }

    /**
     * Create a new account. The method checks if the account already exists by its ID.
     * The AccountRequest DTO is used to validate input.
     */
    public Account createAccount(AccountRequest accountRequest) {
        if (accountRepository.existsById(accountRequest.getAccountId())) {
            throw new TransactionException("Account with ID " + accountRequest.getAccountId() + " already exists.");
        }

        // Sanitize and map AccountRequest to Account entity
        Account newAccount = new Account();
        newAccount.setAccountId(accountRequest.getAccountId());
        newAccount.setBalance(accountRequest.getBalance());

        return accountRepository.save(newAccount);
    }

    /**
     * Delete an account by its ID. If the account doesn't exist, an exception is thrown.
     */
    public void deleteAccount(String accountId) {
        if (!accountRepository.existsById(accountId)) {
            throw new TransactionException("Account with ID " + accountId + " does not exist.");
        }
        accountRepository.deleteById(accountId);
    }

    /**
     * Save an account entity. This method could be used for updating or creating accounts.
     */
    public Account save(Account account) {
        return accountRepository.save(account);
    }
}
