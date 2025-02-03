module "rds" {
  source = "terraform-aws-modules/rds/aws"

  identifier              = "my-rds-instance"    # Change 'name' to 'identifier'
  engine                  = "mysql"
  engine_version          = "8.0.28"
  instance_class          = "db.t3.micro"         # for free tier
  allocated_storage       = 20
  storage_type            = "gp2"
  publicly_accessible     = false
  db_subnet_group_name    = aws_db_subnet_group.rds_subnet_group.name
  subnet_ids              = data.terraform_remote_state.eks.outputs.private_subnets  # already provided
  vpc_security_group_ids       = [aws_security_group.rds_sg.id]  #

  username                = "admin"
  password                = "R7CjTOGtjAJ6G5tFcsoe"  # Insecure password; best to use AWS Secrets Manager
  db_name                 = "real_time_balance"

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }

  skip_final_snapshot = true
}

resource "aws_security_group" "rds_sg" {
  name        = "rds-sg"
  description = "Security group for RDS"
  vpc_id      = data.terraform_remote_state.eks.outputs.vpc_id  # directly use EKS VPC

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    security_groups = [data.terraform_remote_state.eks.outputs.cluster_security_group_id]   # allow from EKS nodes
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-sg"
  }
}

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "my-rds-subnet-group"
  subnet_ids = data.terraform_remote_state.eks.outputs.private_subnets  # directly use EKS subnet_id

  tags = {
    Name        = "my-rds-subnet-group"
    Environment = "dev"
  }
}

