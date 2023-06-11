#!/bin/bash
# Filename: s3-events-config.sh
# Description: This configures S3 to send a notification when an Amazon S3 object is created

# Create an SNS Topic to use for Notification of S3 events.
aws sns create-topic --name S3Tochukwu1BucketEventsTopic
# The TopicArn from the result of this action must be used to update the TopicArn of notification-config.json

# Subscribe to the SNS Topic
aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:966727776968:S3Tochukwu1BucketEventsTopic --protocol email --notification-endpoint tochukwu.nwachukwu@sovtech.com
# Open up your email and confirm the subscription

# Attach an IAM policy to the topic to allows Amazon S3 to publish to the topic.
aws sns set-topic-attributes --topic-arn arn:aws:sns:eu-west-2:966727776968:S3Tochukwu1BucketEventsTopic --attribute-name Policy --attribute-value file://sns-iam-policy1.json
# Remember to update the IAM policy in sns-iam-policy.json so that the Resource references your TopicARN and the ArnLike condition is applicable to your bucket

# Enable Event Notifications for the S3 Bucket
aws s3api put-bucket-notification-configuration --bucket tochukwu1-bucket --notification-configuration file://notification-config.json
# The notification-config.json file configures notification for EventBridge and SNS Topic

# Create another SNS topic, subscribe to it and attach an IAM policy to it
aws sns create-topic --name EventsBridgeTargetTopic
aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:966727776968:EventsBridgeTargetTopic --protocol EMAIL --notification-endpoint t.nwachukwu@outlook.com
aws sns set-topic-attributes --topic-arn arn:aws:sns:eu-west-2:966727776968:EventsBridgeTargetTopic --attribute-name Policy --attribute-value file://sns-iam-policy2.json


# Create a rule on the default event bridge of you AWS account
aws events put-rule --name S3BucketObjectUploadRule --event-pattern file://s3-upload-rule.json  --description "S3 bucket upload events for tochukwu1-bucket only"

# Use the second SNS Topic, EventsBridgeTargetTopic, as target for the S3BucketObjectUploadRule event rule/pattern
aws events put-targets --rule S3BucketObjectUploadRule --targets "Id"="1","Arn"="arn:aws:sns:eu-west-2:966727776968:EventsBridgeTargetTopic"

# Create a CloudWatch LogGroup to be a second target for the event rule
aws logs create-log-group --log-group-name /tochukwu/s3/logs
aws logs put-resource-policy --policy-name S3EventsLogPolicy --policy-document file://loggroup-iam-policy.json
aws logs describe-resource-policies
aws events put-targets --rule S3BucketObjectUploadRule --targets "Id=2,Arn=arn:aws:logs:eu-west-2:966727776968:log-group:/tochukwu/s3/logs:*"

# Test the events notifications by uploading a file to the S3 bucket tochukwu1-bucket
aws s3 cp hello-s3.txt s3://tochukwu1-bucket

## Summary
# This setup configures the following resources
# 1. SNS Topic (S3Tochukwu1BucketEventsTopic) with one subscription to email address (tochukwu.nwachukwu@sovtech.com)
# 2. SNS Topic (EventsBridgeTargetTopic) with one subscription to email address (t.nwachukwu@outlook.com)
# 3. CloudWatch LogGroup (/tochukwu/s3/logs)
# 4. An EventBridge rule (S3BucketObjectUploadRule) for the default event bus

## Configuration
# 1. An existing S3 bucket's (tochukwu1-bucket) notification is configured to send notification directly to the Topic 1 and also to the event EventBridge
# 2. The SNS Topic 1 (S3Tochukwu1BucketEventsTopic) is assign to the S3 notification configuration
# 3. The SNS Topic 2 (EventsBridgeTargetTopic) is assigned as a target of the event rule S3BucketObjectUploadRule
# 4. The CloudWatch LogGroup (/tochukwu/s3/logs)  is assigned as a target of the event rule S3BucketObjectUploadRule

## Testing
# 1. An object is uploaded to the s3 bucket (tochukwu1-bucket) which triggers the ObjectCreated event

## Results
# s3-to-sns-notify.json: A copy of the event recieved by the first email address via the S3Tochukwu1BucketEventsTopic SNS topic is seen in s3-to-sns-notify.json file
# s3-to-eb-sns-notify.json: A copy of the event received by the second email address via the default event bridge and then through the EventsBridgeTargetTopic sns topic is seen in s3-to-eb-sns-notify.json
# s3-to-eb-logs-notify.json: A copy of the event received by the /tochukwu/s3/logs via the default event bridge is seen in s3-to-eb-logs-notify.json
