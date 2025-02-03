module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "eks_cluster_vpc"
  cidr = var.vpc_cidr

  azs                  = data.aws_availability_zones.azs.names
  public_subnets       = var.public_subnets
  private_subnets      = var.private_subnets
  enable_dns_hostnames = true
  enable_nat_gateway   = true
  single_nat_gateway   = true

  tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
  }
  public_subnet_tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
    "kubernetes.io/role/elb"               = 1
  }
  private_subnet_tags = {
    "kubernetes.io/cluster/my-eks-cluster" = "shared"
    "kubernetes.io/role/private_elb"       = 1
  }
}

#EKS

module "eks" {
  source                         = "terraform-aws-modules/eks/aws"
  cluster_name                   = "my-eks-cluster"
  cluster_version                = "1.29"
  cluster_endpoint_public_access = true
  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_security_group_id = module.eks_nodes_sg.security_group_id

  eks_managed_node_groups = {
    nodes = {
      min_size      = 1
      max_size      = 3
      desired_size  = 2
      instance_type = var.instance_types
    }
  }
  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}

#sg
module "eks_nodes_sg" {
  source = "terraform-aws-modules/security-group/aws//modules/http-80"

  name        = "eks-nodes-sg"
  description = "Security group for EKS nodes"
  vpc_id      = module.vpc.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      description = "MYSQL"
      cidr_block  = "0.0.0.0/0"
    }
  ]
  egress_with_cidr_blocks = [
    {
      from_port  = 0
      to_port    = 0
      protocol   = "-1"
      cidr_block = "0.0.0.0/0"
    }
  ]

  tags = {
    Name = "eks-nodes-sg"
  }
}