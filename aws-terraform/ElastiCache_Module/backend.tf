terraform {
  backend "s3" {
    bucket = "eksbucketforboyu"
    key    = "jenkins/terraform.tfstate"
    region = "ap-east-1"
  }
}