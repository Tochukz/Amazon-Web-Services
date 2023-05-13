# Amazon CloudWatch
[Docs](https://docs.aws.amazon.com/cloudwatch)  
[User Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)  
[API Reference](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/Welcome.html)  
[CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/index.html)  

## Introduction
You can find performance metrics automatically collected for every AWS service you use on the CloudWatch console > Dashboard > Automatic dashboards.  
You can additionally create custom dashboards to display metrics about your custom applications, and display custom collections of metrics that you choose.  
You can create alarms that watch metrics and send notifications or automatically make changes to the resources you are monitoring when a threshold is breached.  

### Amazon CloudWatch Concept
1. __Namespace__  
A namespace is a container for CloudWatch metrics. Metrics in different namespaces are isolated from each other. The AWS namespaces typically use the following naming convention: _AWS/service_. For example, Amazon EC2 uses the _AWS/EC2_ namespace.
2. __Metrics__  
A metric represents a time-ordered set of data points that are published to CloudWatch. A metric represents a time-ordered set of data points that are published to CloudWatch.  
3. __Time stamps__
Each metric data point must be associated with a time stamp.
Although it is not required, we recommend that you use Coordinated Universal Time (UTC).  
4. __Metrics retention__  
Metrics that have not had any new data points in the past two weeks do not appear in the console.  
The best way to retrieve these metrics is with the get-metric-data or get-metric-statistics commands in the AWS CLI.
5. __Dimensions__   
A dimension is a name/value pair that is part of the identity of a metric. You can assign up to 30 dimensions to a metric.  
6. __Dimension combinations__   
CloudWatch treats each unique combination of dimensions as a separate metric, even if the metrics have the same metric name.  
7. __Resolution__  
8. __Statistics__  
9. __Units__  
10. __Periods__  
11. __Aggregation__  
12. __Percentiles__   
13. __Alarms__   

### Alarms
__Set up an SNS notification__   

```bash
# Create the SNS topic
$ aws sns create-topic --name MonitoringTopic  
# Subscribe to the topic using your email
$ aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:966727776968:MonitoringTopic --protocol email --notification-endpoint bbdchucks@gmail.com
# After confirming the subscription, list subscriptions
$ aws sns list-subscriptions-by-topic --topic-arn arn:aws:sns:eu-west-2:966727776968:MonitoringTopic
# Publish a test message to the topic
$ aws sns publish --message "Just a test message" --topic arn:aws:sns:eu-west-2:966727776968:MonitoringTopic
# Check your email for the newly published message
```

__Setting up a CPU usage alarm__  
Create an alarm using the put-metric-alarm command
```bash
$ aws cloudwatch put-metric-alarm --alarm-name cpu-monitoring --evaluation-periods 2 --comparison-operator GreaterThanThreshold --alarm-description "Alert at 70% utilization" --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --threshold 70 --dimensions Name=InstanceId,Value=i-0b54650d361f9ca84 --alarm-actions arn:aws:sns:eu-west-2:966727776968:MonitoringTopic --unit Percent
```
Test the alarm by forcing an alarm state change using the set-alarm-state command.
```bash
# First change the alarm state from INSUFFICIENT_DATA to OK
$ aws cloudwatch set-alarm-state --alarm-name cpu-monitoring --state-reason "initializing" --state-value OK
# Then change the alarm state from OK to ALARM.
aws cloudwatch set-alarm-state --alarm-name cpu-monitoring --state-reason "initializing" --state-value ALARM
# Check your email to see if you received a notification
```

__Setup Billing alert__
First enable billing alert
1. Go to Billing Console  
2. Under _Preferences_, _Billing Preference_  
3. In the _Preferences_ page , check the _Receive Billing Alerts_ checkbox
4. Click the _Save Preferences_ button.
Next create the billing alarm
```bash
# Not tested yet, need more work
$ aws cloudwatch put-metric-alarm --alarm-name BillingMonitoring --evaluation-periods 6 --comparison-operator GreaterThanOrEqualToThreshold --alarm-description "Alert at $20 billing" --metric-name Billing --namespace AWS/EC2 --statistic Maximum --period 300 --threshold 70 --dimensions Name=InstanceId,Value=i-0b54650d361f9ca84 --alarm-actions arn:aws:sns:eu-west-2:966727776968:MonitoringTopic --unit Percent
```
