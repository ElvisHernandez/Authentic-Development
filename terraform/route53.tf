
resource "aws_route53_zone" "primary" {
    name = var.website_domain
}

resource "aws_acm_certificate" "ssl_cert" {
  domain_name = var.website_domain
  subject_alternative_names = ["admin.${var.website_domain}"]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

// create CNAME records for certifcate
resource "aws_route53_record" "cert_cnames" {
  for_each = {
    for dvo in aws_acm_certificate.ssl_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.primary.zone_id
}

// validates cert
resource "aws_acm_certificate_validation" "dns_validation" {
  certificate_arn         = aws_acm_certificate.ssl_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_cnames : record.fqdn]
  depends_on = [aws_route53domains_registered_domain.domain_name_servers]
}

resource "aws_route53_record" "frontend_alias" {
  name    = var.website_domain
  type    = "A"
  zone_id = aws_route53_zone.primary.zone_id

  alias {
    name                   = aws_lb.lb.dns_name
    zone_id                = aws_lb.lb.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "backend_alias" {
  name    = "admin.${var.website_domain}"
  type    = "A"
  zone_id = aws_route53_zone.primary.zone_id

  alias {
    name                   = aws_lb.lb.dns_name
    zone_id                = aws_lb.lb.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53domains_registered_domain" "domain_name_servers" {
  domain_name = var.website_domain

  dynamic "name_server" {
    for_each = aws_route53_zone.primary.name_servers
    content {
      name = name_server.value
    }
  }
}