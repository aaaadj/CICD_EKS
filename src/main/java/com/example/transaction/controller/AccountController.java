package com.example.transaction.controller;

import com.example.transaction.model.Account;
import com.example.transaction.request.AccountRequest;
import com.example.transaction.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    /**
     * Endpoint to create a new account.
     * The input is validated using AccountRequest DTO to prevent malicious input.
     */
    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody @Valid AccountRequest accountRequest) {
        // Validate and sanitize input from the user
        Account createdAccount = accountService.createAccount(accountRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
    }

    /**
     * Endpoint to delete an existing account.
     * The account ID is validated before performing the delete operation.
     */
    @DeleteMapping("/{accountId}")
    public ResponseEntity<String> deleteAccount(@PathVariable String accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.ok("Account deleted successfully.");
    }

    // Endpoint to handle the account query request
    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccount(@PathVariable String accountId) {
        Account account = accountService.getAccountById(accountId);
        return ResponseEntity.ok(account);
    }
}

