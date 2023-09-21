resource "aws_sns_topic" "cpu_alerts" {
  name = "cpu-alerts"
}

resource "aws_sns_topic_subscription" "cpu_alerts_subscription" {
  topic_arn = aws_sns_topic.cpu_alerts.arn
  protocol  = "email"
  endpoint  = var.cloudwatch_email
}

resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "cpu-high"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "60"
  statistic           = "SampleCount"
  threshold           = "80"
  alarm_description   = "This metric checks if CPU utilization is high"
  alarm_actions       = [aws_sns_topic.cpu_alerts.arn]
  dimensions = {
    InstanceId = aws_instance.web.id
  }
}

resource "aws_sns_topic" "instance_down" {
  name = "instance-down"
}

resource "aws_sns_topic_subscription" "instance_down_subscription" {
  topic_arn = aws_sns_topic.instance_down.arn
  protocol  = "email"
  endpoint  = var.cloudwatch_email
}

resource "aws_cloudwatch_metric_alarm" "instance_status_check_failure" {
  alarm_name          = "instance-status-check-failure"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "StatusCheckFailed_Instance"
  namespace           = "AWS/EC2"
  period              = "60"
  statistic           = "SampleCount"
  threshold           = "1"
  alarm_description   = "This metric checks if the instance has failed a status check"
  alarm_actions       = [aws_sns_topic.instance_down.arn]
  dimensions = {
    InstanceId = aws_instance.web.id
  }
}
