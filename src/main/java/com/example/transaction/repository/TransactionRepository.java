package com.example.transaction.repository;

import com.example.transaction.enums.TransactionStatus;
import com.example.transaction.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    Optional<Transaction> findByTransactionId(String transactionId);

    List<Transaction> findByStatusIn(List<TransactionStatus> statuses);

}
