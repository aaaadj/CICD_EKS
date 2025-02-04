package com.example.transaction.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

public class AccountRequest {

    @NotEmpty(message = "Account ID must not be empty.")
    private String accountId;

    @NotNull(message = "Balance must not be null.")
    @Positive(message = "Balance must be a positive value.")
    private BigDecimal balance;

    // Getters and Setters
    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}
