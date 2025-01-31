# 使用 JDK 1.8 基础镜像
FROM openjdk:8-jdk-alpine

# 设置工作目录
WORKDIR /app

# 将本地构建好的 JAR 文件复制到镜像内
COPY target/real-time-balance-1.0-SNAPSHOT.jar /app/real-time-balance.jar

# 暴露端口
EXPOSE 8080

# 启动 Spring Boot 应用
ENTRYPOINT ["java", "-jar", "/app/real-time-balance.jar"]
