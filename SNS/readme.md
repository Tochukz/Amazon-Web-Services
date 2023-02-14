# Amazon Simple Notification Service  
[AWS SNS Docs](https://docs.aws.amazon.com/sns/?icmpid=docs_homepage_serverless)  
[Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/index.html)  
[API Reference](https://docs.aws.amazon.com/sns/latest/api/welcome.html)  
[CLI Reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sns/index.html)  
[JavaScript SDK DeveloperGuide](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)  

## Introduction 
Clients can subscribe to the SNS topic and receive published messages using a supported endpoint type, such as 
* Amazon Kinesis Data Firehose
* Amazon SQS
* AWS Lambda 
* HTTP
* Email
* Mobile push notifications, 
* Mobile text messages (SMS).


## Common Amazon SNS scenarios
__Application integration__  
You can develop an application that publishes a message to an SNS topic whenever an order is placed for a product.  
Then, SQS queues that are subscribed to the SNS topic receive identical notifications for the new order.    
An Amazon Elastic Compute Cloud (Amazon EC2) server instance attached to one of the SQS queues can handle the processing or fulfillment of the order. And you can attach another Amazon EC2 server instance to a data warehouse for analysis of all orders received.   

__Application alerts__  
You can receive immediate notification when an event occurs, such as a specific change to your Amazon EC2 Auto Scaling group, a new file uploaded to an Amazon S3 bucket, or a metric threshold breached in Amazon CloudWatch. 

__User notifications__   
Amazon SNS can send push email messages and text messages (SMS messages) to individuals or groups.   

__Mobile push notifications__  
Mobile push notifications enable you to send messages directly to mobile apps. For example, you can use Amazon SNS to send update notifications to an app. The notification message can include a link to download and install the update. 
To learn more see [mobile push notification](https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html)

## Amazon SNS event sources and destinations
Amazon SNS can receive event-driven notifications from many AWS sources and fan out notifications to application-to-application (A2A) and application-to-person (A2P) destinations  

## AWS CLI for SNS  

__Create a new Topic__  
```
$ aws sns create-topic --name shopping-orders-topic 
```
This action is _idempotent_, so if the requester already owns a topic with the specified name, that topic’s ARN is returned without creating a new topic.  

__List all Topics__  
```
$ aws sns list-topics
```  

__Get topic attibutes__  
```
$ aws sns get-topic-attributes --topic-arn arn:aws:sns:eu-west-2:966727776968:shopping-orders-topic
```  

__Subscribe to Topic with email, SMS and HTTP protocols__  
```bash
# subscribe with email protocol
$ aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:966727776968:shopping-orders-topic --protocol email --notification-endpoint truetochukz@gmail.com 
# subscribe with sms protocol   
$ aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:966727776968:shopping-orders-topic --protocol sms --notification-endpoint +27633111000  
# subscribe with http protocol 
$ aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:966727776968:shopping-orders-topic --protocol https --notification-endpoint https://ojlinks.tochukwu.xyz/test-sns-subscription  
```

__List all subscriptions__  
```
$ aws sns list-subscriptions
```

__List subscriptions for a topic__  
```
$ aws sns list-subscriptions-by-topic --topic-arn arn:aws:sns:eu-west-2:966727776968:shopping-orders-topic
```  

__Publish message to a Topic__  
```
$  aws sns publish --topic-arn arn:aws:sns:eu-west-2:966727776968:cart-order-topic --message file://message.txt
```   

