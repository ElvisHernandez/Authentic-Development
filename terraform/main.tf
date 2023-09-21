terraform {

    backend "s3" {
      bucket = "adb-terraform-state"
      key = "state"
      region = "us-east-1"
    }
    
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "us-east-1"
}

resource "aws_key_pair" "tf-key-pair" {
  key_name = "adb-key-pair"
  public_key = tls_private_key.ec2_key.public_key_openssh
}

resource "aws_instance" "web" {
  ami           = "ami-053b0d53c279acc90"
  instance_type = "t2.medium"
  key_name = aws_key_pair.tf-key-pair.key_name
  vpc_security_group_ids = [aws_security_group.allow_instance.id]
  iam_instance_profile = aws_iam_instance_profile.profile.name

  user_data = templatefile("../scripts/bootstrap.sh", {
    private_key = tls_private_key.deploy_key.private_key_pem
    github_username = var.github_username
    github_repository = var.github_repository
  })

  connection {
    type = "ssh"
    user = "ubuntu"
    private_key = tls_private_key.ec2_key.private_key_pem
    host = self.public_ip
  }

  provisioner "file" {
    source = "../scripts/install_nvm.sh"
    destination = "/home/ubuntu/install_nvm.sh"
  }

  provisioner "remote-exec" {
    inline = [ 
      "chmod +x /home/ubuntu/install_nvm.sh",
      "bash /home/ubuntu/install_nvm.sh"
    ]
  }

  tags = {
    Name = "authentic-development-blog-server"
  }
}



