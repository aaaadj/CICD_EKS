# Financial Product Project + CI/CD Setup

This project demonstrates a financial product application with a fully automated CI/CD pipeline. It leverages Terraform to provision AWS infrastructure (VPC, subnets, EKS cluster, and Jenkins server) and Jenkins for continuous integration/deployment. The pipeline automatically builds a Java Spring Boot application, packages it into a Docker image, pushes it to AWS ECR, and deploys it to a Kubernetes cluster.

---
### Interview Materials

To facilitate the review of this project, the following folders have been created in the root directory, each containing relevant resources:

- **Source code repository**: current repository url.
- **Kubernetes deployment manifests or Helm charts**: Includes the Kubernetes deployment manifests .
- **Test coverage report**: Contains the code coverage report generated by running automated tests on the project. This provides insights into the percentage of code covered by unit and integration tests.
- **Resilience test results**: Includes the results from resilience tests performed on the deployed application, verifying how well the system handles failure scenarios and ensures high availability and reliability.
- **Performance test results**: Contains the results from performance testing, showing how the application behaves under load and its performance characteristics.
- **Documentation**: Provides project documentation, including tech instructions, usage details, and any additional information that helps you understand this project is done. 

You can find the resources in the corresponding folders above.But it is **strongly recommended that you download** these six folders and watch them, as report files (such as the HTML for JMeter testing) need to be downloaded before they can be displayed correctly in the browser. If you have any further questions, feel free to me.



## Architecture Overview

1. **Infrastructure Layer**:
    - Terraform-managed AWS resources:
        - **VPC** with public/private subnets
        - **EKS Cluster** for Kubernetes orchestration
        - **EC2 Instance** hosting Jenkins server
        - **ECR Module** store Docker images
        - **ElastiCache Module** for system data cache and lock use
        - **RDS Module** for system database
    - Security groups configured for SSH, HTTP, and Kubernetes access
    - S3 bucket place terraform state file
2. **CI/CD Layer**:
    - **Jenkins Pipeline** with stages for:
        - Code checkout
        - Maven build & testing
        - Docker image creation & ECR push
        - Kubernetes deployment

3. **Application Layer**:
    - Java Spring Boot application (`FinancialTransactionServiceApplication`)
    - Dockerized service deployed as 4-replica pods in EKS
    - LoadBalancer service for external access

---
## Project Structure

- **/jenkins-server**: Contains the Terraform code for creating the VPC, subnets, security groups, and EC2 instance for Jenkins.
- **/jenkins-server/jenkins-install.sh**: Script for installing Jenkins, Java, Terraform, AWS CLI, and kubectl on the EC2 instance.
- **/EKS**: Contains the Terraform configuration for provisioning the AWS EKS cluster.
- **/src/**: The Spring Boot application codes and configs.
- **/Dockerfile**: Dockerfile used for building the application image.
- **/eks-deploy-k8s.yaml**: Kubernetes deployment and service YAML files to deploy the application to EKS.
- **/pom.xml**: Maven configuration for the Java application.
- **/jenkins-pipeline**: Jenkins pipeline file for automating the CI/CD process.
- **/mock_generator_create_account**:simple python script generate huge numbers of data for testing purpose.
- **/chaos-experiment.json**:kubechaos experiment config file,with pipeline easily do resilience test on EKS Cluster.
---


This is a diagram showing the flow of requests in my project.

## Prerequisites

Before running the setup, ensure you have the following:
- **Terraform**: Used for provisioning infrastructure.
- **AWS CLI**: Used to interact with AWS services.
- **AWS S3 repo**: Used to save terraform configuration.

Ensure you have appropriate IAM roles and permissions to create and manage resources in AWS.

## Steps to Set Up

### 1. Provision the Infrastructure with Terraform

#### Set up Terraform and AWS provider:
- Install Terraform and configure your AWS CLI with appropriate credentials.
- Edit `variables.tf` to set values for your AWS region, instance types, and other necessary parameters.

#### Initialize Terraform:
```bash
cd /EKS
terraform init
```
#### Apply the Terraform configuration:
- This will set up the VPC, subnets, security groups, EC2 instance for Jenkins, and EKS cluster.
```bash
terraform apply --autoapprove
```
### 2. Jenkins Installation and Setup

#### EC2 Instance and Jenkins Installation:
```bash
cd /aws-terrform/jenkins-server
terraform init
terraform apply --autoapprove
```
- The EC2 instance created by Terraform will automatically install Jenkins, Java, Terraform, AWS CLI, and kubectl.
- Jenkins will be accessible on port 8080, and the security group should allow inbound traffic on ports 8080 and 22 (for SSH access).

Once Jenkins is installed, access the Jenkins dashboard by visiting `http://<EC2_Public_IP>:8080`.

Then install other modules:
```bash
cd /aws-terrform/ECR_Module
terraform init
terraform apply --autoapprove
```

```bash
cd /aws-terrform/EKS_Cluster
terraform init
terraform apply --autoapprove
```
```bash
cd /aws-terrform/RDS_Module
terraform init
terraform apply --autoapprove
```
```bash
cd /aws-terrform/ElastiCache_Module
terraform init
terraform apply --autoapprove
```


### 3. Setting up CI/CD Pipeline in Jenkins

- **Jenkins Pipeline**: The provided `jenkins-pipeline` file should be added to your Jenkins instance after initialization,notice you should change pipeline docker repository to your ECR repository.
- **Pipeline Stages**:
    - **Cloning Git**: The pipeline will automatically pull the latest code from the Git repository.
    - **Build**: It will run the Maven build command to compile the Java project.
    - **Building Docker Image**: The pipeline will automatically build the Docker image for the application.
    - **Pushing to ECR**: The Docker image will be pushed to AWS Elastic Container Registry (ECR your owned).
    - **Kubernetes Deployment (EKS)**: The pipeline will use `kubectl` to deploy the latest Docker image to the Kubernetes (EKS) cluster.

### 4. Triggering the CI/CD Pipeline

Each time code is committed, the Jenkins pipeline will automatically perform the following:
1. Clone the latest code.
2. Build the application.
3. Build the Docker image.
4. Push the Docker image to AWS ECR.
5. Deploy the application to the Kubernetes (EKS) cluster.

No manual steps are required for pushing Docker images or deploying to Kubernetes, as the entire process is automated through Jenkins.

### 5. Kubernetes (EKS) Deployment

#### Kubernetes YAML Configuration:
- `eks-deploy-k8s.yaml` contains the Kubernetes deployment configuration for the Spring Boot application.(switch the repo to your ECR)
- The configuration includes:
    - **Deployment**: A Kubernetes deployment with 4 replicas of the Spring Boot application.
    - **Service**: A LoadBalancer service to expose the application on port 80, routing traffic to port 8081 of the containers.

To deploy the application on EKS, the pipeline will automatically apply the Kubernetes YAML configuration using the following command:
```bash
kubectl apply -f eks-deploy-k8s.yaml
```

### 6. Testing and Verification

- **Deployment Verification**:
    - After the pipeline completes, the Spring Boot application should be running on the EKS cluster.
    - To verify the deployment:
        - Use the Kubernetes `kubectl get pods` command to check the status of the deployed pods.
        - Access the application via the LoadBalancer URL (provided by the EKS service) to confirm that the application is correctly deployed and running.

- **Automated Testing**:
    - The project includes comprehensive unit tests and integration tests.
    - To run the tests and generate code coverage reports, use the following Maven command:
    ```bash
    mvn clean test
    ```
    - This will trigger all tests and provide a JaCoCo-generated code coverage report.

- **Build the Java Application (Optional)**:
    - If needed, you can manually build the Java application using Maven:
    ```bash
    mvn clean package
    ```
    - The application will be packaged into a JAR file located in the `/target` directory.

- **Mock Data Generation**:
    - The project includes a Python script, `mock_generator__create_account.py`, located in the root directory, which generates large volumes of mock data in CSV format. This can be used for stress testing the application via JMeter.
    - To generate mock data, run the Python script:
    ```bash
    python mock_generator__create_account.py
    ```
    - This will output a CSV file with mock data ready for use in JMeter.

- **Resilience Testing**:
    - For resilience testing after the Kubernetes deployment, the project includes a `chaos-experiment.json` file in the root directory. This file can be used to simulate various failure scenarios and verify the system's ability to handle them in a production-like environment.
    - To execute the resilience tests, apply the chaos experiment using the appropriate Kubernetes tools or integrate with a chaos engineering framework.

### 7. Troubleshooting

- **ECR Push Failures**: If Docker images are not pushing to ECR, check the AWS credentials and ensure the AWS CLI is properly configured in the Jenkins instance.
- **Kubernetes Deployment Issues**: If the Kubernetes deployment fails, use `kubectl logs` to check the logs of the application pods for errors.

### 8. End

This setup provides a complete, automated CI/CD pipeline for a Java-based financial application, deploying it on AWS infrastructure using Terraform, Jenkins, Docker, and Kubernetes (EKS). The infrastructure is fully managed using Terraform, and Jenkins automates the application build, Docker image creation, and deployment process. Simply commit your code, and the Jenkins pipeline will handle the rest!