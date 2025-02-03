data "terraform_remote_state" "eks" {
  backend = "s3"
  config = {
    bucket = "eksbucketforboyu"
    key    = "eks/terraform.tfstate"
    region = "ap-east-1"
  }
}

