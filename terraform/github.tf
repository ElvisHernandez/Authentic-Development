
provider "github" {
  # You need to provide a token that has the necessary permissions
  token        = var.github_token
}

# resource "tls_private_key" "deploy_key" {
#   algorithm = "RSA"
#   rsa_bits  = 4096
# }

data "github_repository" "repo" {
  full_name = "ElvisHernandez/Authentic-Development"
}

resource "tls_private_key" "do_droplet_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "do_droplet_private_key" {
  content  = tls_private_key.do_droplet_key.private_key_pem
  filename = "${path.module}/../private/do_droplet_key"
  file_permission = "0600"
}

resource "local_file" "do_droplet_public_key" {
  content  = tls_private_key.do_droplet_key.public_key_openssh
  filename = "${path.module}/../private/do_droplet_key.pub"
}

resource "github_actions_secret" "host" {
  repository       = data.github_repository.repo.name
  secret_name      = "HOST"
  plaintext_value  = digitalocean_droplet.web.ipv4_address
}

resource "github_actions_secret" "ssh_key" {
  repository       = data.github_repository.repo.name
  secret_name      = "SSH_KEY"
  plaintext_value  = tls_private_key.do_droplet_key.private_key_pem
}

resource "github_actions_secret" "database_url" {
  repository       = data.github_repository.repo.name
  secret_name      = "DATABASE_URL"
  plaintext_value  = var.database_url
}

resource "github_actions_secret" "session_secret_key" {
  repository       = data.github_repository.repo.name
  secret_name      = "SESSION_SECRET_KEY"
  plaintext_value  = var.session_secret_key
}

resource "github_actions_secret" "admin_email" {
  repository       = data.github_repository.repo.name
  secret_name      = "ADMIN_EMAIL"
  plaintext_value  = var.admin_email
}

resource "github_actions_secret" "aws_s3_image_host" {
  repository       = data.github_repository.repo.name
  secret_name      = "AWS_S3_IMAGE_HOST"
  plaintext_value  = var.aws_s3_image_host
}

resource "github_actions_secret" "aws_bucket_name" {
  repository       = data.github_repository.repo.name
  secret_name      = "AWS_BUCKET_NAME"
  plaintext_value  = var.aws_bucket_name
}

resource "github_actions_secret" "aws_key_id" {
  repository       = data.github_repository.repo.name
  secret_name      = "AWS_KEY_ID"
  plaintext_value  = var.aws_key_id
}

resource "github_actions_secret" "aws_secret_key" {
  repository       = data.github_repository.repo.name
  secret_name      = "AWS_SECRET_KEY"
  plaintext_value  = var.aws_secret_key
}

resource "github_actions_secret" "sendgrid_api_key" {
  repository       = data.github_repository.repo.name
  secret_name      = "SENDGRID_API_KEY"
  plaintext_value  = var.sendgrid_api_key
}

resource "github_actions_secret" "sentry_auth_token" {
  repository       = data.github_repository.repo.name
  secret_name      = "SENTRY_AUTH_TOKEN"
  plaintext_value  = var.sentry_auth_token
}

# resource "github_repository_deploy_key" "deploy_key" {
#   title       = "ec2-deploy-key"
#   repository  = var.github_repository
#   key         = tls_private_key.deploy_key.public_key_openssh
#   read_only   = true
# }