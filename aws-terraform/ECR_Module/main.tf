module "ecr" {
  source = "terraform-aws-modules/ecr/aws"

  repository_name = "my-docker-repo"

  repository_read_write_access_arns = ["arn:aws:iam::954976321856:role/test-admin"]
  repository_lifecycle_policy = jsonencode({
    rules = [
      {
        rulePriority = 1,
        description  = "Keep last 30 images",
        selection = {
          tagStatus     = "tagged",
          tagPrefixList = ["v"],
          countType     = "imageCountMoreThan",
          countNumber   = 30
        },
        action = {
          type = "expire"
        }
      }
    ]
  })

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}