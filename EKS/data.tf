
data "aws_availability_zones" "azs" {

}
# 获取 EKS 集群的认证信息
data "aws_eks_cluster" "cluster" {
  name = "my-eks-cluster"  # EKS 集群的名称
}

# 获取 EKS 集群的认证令牌
data "aws_eks_cluster_auth" "cluster" {
  name = data.aws_eks_cluster.cluster.name
}
