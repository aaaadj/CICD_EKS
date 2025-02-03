terraform {
  backend "s3" {
    bucket = "eksbucketforboyu"
    key    = "eks/terraform.tfstate"
    region = "ap-east-1"
  }
}