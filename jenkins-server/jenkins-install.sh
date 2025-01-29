#!/bin/bash
# Update package list
sudo apt update

# Java installation for Jenkins
sudo apt install openjdk-11-jre -y

# Jenkins installation
curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkinskeyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkinskeyring.asc] https://pkg.jenkins.io/debian binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins -y

# Terraform Installation
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
wget -qO- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
# Optionally show the fingerprint if needed
# gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update
sudo apt-get install terraform -y

# Installing kubernetes
K8S_VERSION=$(curl -L -s https://dl.k8s.io/release/stable.txt)
curl -LO "https://dl.k8s.io/release/${K8S_VERSION}/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/release/${K8S_VERSION}/bin/linux/amd64/kubectl.sha256"

# Ensure the sha256 file is downloaded before checking
if [ -f "kubectl.sha256" ]; then
    echo "$(cat kubectl.sha256) kubectl" | sha256sum --check
else
    echo "SHA256 checksum file is missing!"
    exit 1
fi

sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
