# Use JDK 1.8 base image
FROM openjdk:8-jdk-alpine

# Install bash, curl, and telnet
RUN apk update && apk add --no-cache \
    bash \
    curl \
    busybox-extras

# Set working directory
WORKDIR /app

# Copy the locally built JAR file into the image
COPY target/real-time-balance-1.0-SNAPSHOT.jar /app/real-time-balance.jar

# Expose port
EXPOSE 8080

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/real-time-balance.jar"]
