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

    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
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

provider "digitalocean" {
    token = var.do_token
}

# Create a new SSH key
resource "digitalocean_ssh_key" "authentic_development" {
  name       = "Authentic Developent Droplet Key"
  public_key = tls_private_key.do_droplet_key.public_key_openssh
}

# Create a new Droplet using the SSH key
resource "digitalocean_droplet" "web" {
  image    = "ubuntu-20-04-x64"
  name     = "authentic-development"
  region   = "nyc1"
  size     = "s-1vcpu-1gb"
  monitoring = true
  ssh_keys = [digitalocean_ssh_key.authentic_development.fingerprint]

  user_data = templatefile("${path.module}/../scripts/bootstrap-droplet.sh", {
    user_password = var.droplet_user_password,
    aws_access_key_id = var.aws_access_key_id,
    aws_secret_access_key = var.aws_secret_access_key,
    website_domain = var.website_domain,
    admin_email = var.admin_email,
    s3_config_bucket = var.s3_config_bucket
  })

  connection {
    type = "ssh"
    user = "root"
    private_key = tls_private_key.do_droplet_key.private_key_pem
    host = self.ipv4_address
  }

  provisioner "file" {
    source = "${path.module}/../scripts/nginx.conf"
    destination = "/tmp/nginx.conf"
  }
}

# resource "digitalocean_domain" "default" {
#   name       = var.website_domain
#   ip_address = digitalocean_droplet.web.ipv4_address
# }

resource "digitalocean_firewall" "authentic_development" {
  name = "adb-only-22-80-and-443"

  droplet_ids = [digitalocean_droplet.web.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

data "aws_route53_zone" "main" {
  name = var.website_domain
}

resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.website_domain
  type    = "A"
  ttl     = "300"
  records = [digitalocean_droplet.web.ipv4_address]
}

output "droplet_ip" {
    description = "The public ipv4 address of the droplet"
    value = digitalocean_droplet.web.ipv4_address
}