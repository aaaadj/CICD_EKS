
data "aws_availability_zones" "azs" {

}
# 获取 EKS 集群的认证信息
data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_name
}

# 获取 EKS 集群的认证令牌
data "aws_eks_cluster_auth" "cluster" {
  name = data.aws_eks_cluster.cluster.name
}
