package com.example.transaction.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.transaction.model.Account;
import com.example.transaction.request.AccountRequest;
import com.example.transaction.service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

@WebMvcTest(AccountController.class)
@TestPropertySource(locations = "classpath:application-test.properties") // use my h2 database do test for clean rds database
public class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AccountService accountService;

    @Autowired
    private ObjectMapper objectMapper;

    private AccountRequest accountRequest;

    @BeforeEach
    public void setUp() {
        accountRequest = new AccountRequest();
        accountRequest.setAccountId("123test");
        accountRequest.setBalance(BigDecimal.valueOf(1000));
    }

    @Test
    void createAccount_shouldReturnCreatedAccount() throws Exception {
        Account createdAccount = new Account();
        createdAccount.setAccountId(accountRequest.getAccountId());
        createdAccount.setBalance(accountRequest.getBalance());

        when(accountService.createAccount(any(AccountRequest.class))).thenReturn(createdAccount);

        mockMvc.perform(post("/api/v1/accounts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accountId").value(accountRequest.getAccountId()))
                .andExpect(jsonPath("$.balance").value(accountRequest.getBalance()));
    }

    @Test
    void deleteAccount_shouldReturnSuccessMessage() throws Exception {
        doNothing().when(accountService).deleteAccount(anyString());

        mockMvc.perform(delete("/api/v1/accounts/{accountId}", "123"))
                .andExpect(status().isOk())
                .andExpect(content().string("Account deleted successfully."));
    }

    @Test
    void getAccount_shouldReturnAccount() throws Exception {
        Account account = new Account();
        account.setAccountId("123");
        account.setBalance(BigDecimal.valueOf(1000));

        when(accountService.getAccountById(anyString())).thenReturn(account);

        mockMvc.perform(get("/api/v1/accounts/{accountId}", "123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountId").value("123"))
                .andExpect(jsonPath("$.balance").value(1000));
    }


}
