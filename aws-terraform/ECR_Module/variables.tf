#
#variable "vpc_id" {
#  description = "The VPC ID where the RDS instance will be created"
#  type        = string
#  default     = data.terraform_remote_state.eks.outputs.vpc_id
#}
#
#variable "private_subnets" {
#  description = "The private subnet IDs where the RDS instance will be placed"
#  type        = list(string)
#  default     = data.terraform_remote_state.eks.outputs.private_subnets
#}