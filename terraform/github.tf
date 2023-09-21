
provider "github" {
  # You need to provide a token that has the necessary permissions
  token        = var.github_token
}

resource "tls_private_key" "deploy_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "tls_private_key" "ec2_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "ec2_private_key" {
  content = tls_private_key.ec2_key.private_key_pem
  filename = "${path.module}/../private/ec2_private_key.pem"
}

resource "github_repository_deploy_key" "deploy_key" {
  title       = "ec2-deploy-key"
  repository  = var.github_repository
  key         = tls_private_key.deploy_key.public_key_openssh
  read_only   = true
}