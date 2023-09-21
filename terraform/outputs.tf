output "public_ip" {
    description = "The public IP of the EC2 instance"
    value = aws_instance.web.public_ip
}

// deploy key is private
output "deploy_key" {
  value = tls_private_key.deploy_key.private_key_pem
  sensitive = true
}

// deploy key is private
output "ec2_key" {
  value = tls_private_key.ec2_key.private_key_pem
  sensitive = true
}