resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "myelasticcache"
  engine               = "redis"
  engine_version       = "6.x"
  node_type            = "cache.t3.micro"  # Free tier instance
  num_cache_nodes      = 1
  subnet_group_name    = aws_db_subnet_group.redis_subnet_group.name  # already provided
  security_group_ids  = [aws_security_group.redis_sg.id]
  parameter_group_name = "default.redis6.x"

  tags = {
    Name = "my-redis-cluster"
  }
}

resource "aws_security_group" "redis_sg" {
  name        = "redis-sg"
  description = "Allow access to Redis from EKS"
  vpc_id      = data.terraform_remote_state.eks.outputs.vpc_id  # directly use EKS VPC

  ingress {
    from_port   = 6379
    to_port     = 6379
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
    Name = "redis-sg"
  }
}

resource "aws_db_subnet_group" "redis_subnet_group" {
  name       = "my-redis-subnet-group"
  subnet_ids = data.terraform_remote_state.eks.outputs.private_subnets  # directly use EKS subnet_id

  tags = {
    Name        = "my-redis-subnet-group"
    Environment = "dev"
  }
}