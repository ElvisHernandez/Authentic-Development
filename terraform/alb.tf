resource "aws_default_vpc" "default" {
    tags = {
      Name = "Default VPC"
    }

}

data "aws_subnets" "default" {}

resource "aws_lb" "lb" {
  name = "adb-lb"
  internal = false
  load_balancer_type = "application"
  security_groups = [aws_security_group.allow_lb.id]
  subnets = tolist(data.aws_subnets.default.ids)
}

// redirect http traffic to https
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}


resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.lb.arn
  port = "443"
  protocol = "HTTPS"
  certificate_arn = aws_acm_certificate.ssl_cert.arn

  default_action {
    type             = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Not found"
      status_code  = "404"
    }
  }
}

resource "aws_lb_listener_rule" "frontend" {
  listener_arn = aws_lb_listener.front_end.arn

  action {
    type = "forward"
    target_group_arn = aws_lb_target_group.nextjs-tg.arn
  }

  condition {
    host_header {
      values = [var.website_domain]
    }
  }
}

resource "aws_lb_listener_rule" "backend" {
  listener_arn = aws_lb_listener.front_end.arn

  action {
    type = "forward"
    target_group_arn = aws_lb_target_group.strapijs-tg.arn
  }

  condition {
    host_header {
      values = ["admin.${var.website_domain}"]
    }
  }
}

resource "aws_lb_target_group" "nextjs-tg" {
  name = "adb-nextjs-tg"
  port = 3000
  protocol = "HTTP"
  vpc_id = aws_default_vpc.default.id
}

resource "aws_lb_target_group_attachment" "nextjstg-attach" {
  target_group_arn = aws_lb_target_group.nextjs-tg.arn
  target_id = aws_instance.web.id
  port = 3000
}

resource "aws_lb_target_group" "strapijs-tg" {
  name = "adb-strapijs-tg"
  port = 1337
  protocol = "HTTP"
  vpc_id = aws_default_vpc.default.id
}

resource "aws_lb_target_group_attachment" "strapijstg-attach" {
  target_group_arn = aws_lb_target_group.strapijs-tg.arn
  target_id = aws_instance.web.id
  port = 1337
}