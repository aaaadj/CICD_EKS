package com.example.transaction.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {
    @Value("${transaction.threadPool.corePoolSize}")
    private int corePoolSize;

    @Value("${transaction.threadPool.maxPoolSize}")
    private int maxPoolSize;

    @Value("${transaction.threadPool.queueCapacity}")
    private int queueCapacity;

    @Value("${transaction.threadPool.keepAliveSeconds}")
    private int keepAliveSeconds;

    @Bean("transactionTaskExecutor")
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(corePoolSize);
        taskExecutor.setMaxPoolSize(maxPoolSize);
        taskExecutor.setQueueCapacity(queueCapacity);
        taskExecutor.setKeepAliveSeconds(keepAliveSeconds);
        taskExecutor.setThreadNamePrefix("Transaction-Thread-");
        taskExecutor.initialize();
        return taskExecutor;
    }

}
