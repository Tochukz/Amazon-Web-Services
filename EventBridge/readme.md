# Amazon EventBridge
[Docs](https://docs.aws.amazon.com/eventbridge/index.html)  
[User Guide](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html)  
[API Reference](https://docs.aws.amazon.com/eventbridge/latest/APIReference/Welcome.html)    
[CLI Reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/index.html)   

__Introduction__  
EventBridge is a serverless event bus that uses events to connect application components together to support event-driven applications.  
EventBridge _event buses_ are well suited for many-to-many routing of events between event-driven services.   

__EventBridge Vs SQS__   

EventBridge             | SQS
------------------------|----------------------------
Processes one at a time | Event processes in batches
Can match multiple rules and be sent to multiple target | Events no longer available after successful processing

### Terminologies
__Event:__ An event is a record of an action that may be represented as a JSON object containing data from the event and meta-data about the event.   
__Event Pattern:__ An event pattern describes the structure of the event.  
__Rule:__ A rule is a data pattern that matches an event to a target based on the event pattern or a schedule.  
__Event Bus:__  An event-bus is a pipeline that receives events. It also act as a convenient grouping for different types of events.   

__NB:__ Amazon EventBridge was formerly called Amazon CloudWatch Events.  

### Getting Started  
The basics of EventBridge is to create rules that route events to a target.  
__Event bus__  
Every AWS account has one default event bus. This default event bus received all the events from AWS services.  

__Custom event bus__
You can create you own custom event bus which you can use to receive events from your custom applications and services
```
$ aws events create-event-bus --name MyEventBus
$ aws events list-event-buses
```
When you create an event bus, you can attach a _resource-based policy_ to grant permission to resources in a different region or a different AWS accounts.    

For list of services that generate event see [service-event-list](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-list.html).  

__AWS Cloud Trail__  
For other AWS services not listed in the _service-event-list_, you can receive events from them via _CloudTrail_.  
CloudTrail records events such as API calls and your can create rules that use the information recorded by CloudTrail.  
Events that are delivered by CloudTrail have `AWS API Call via CloudTrail` as the value for `detail-type`.   


### Working with default event bus
__Writing a rule__  
It is possible to create rules that lead to infinite loops, where a rule is fired repeatedly.
To prevent this, write the rules so that the triggered actions do not re-fire the same rule.
We recommend that you use budgeting, which alerts you when charges exceed your specified limit.  
Checkout [budget-managing-costs](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)

__Create rule__  
Create a rule on your account's default event bus
```
$ aws events put-rule --name EC2InstanceStateChange --event-pattern file://rules/ec2-pattern.json  --description "Event on EC2 instance state change"
```  
This pattern will match any EC2 state change event.  

__Event targets__  
To be able to make API calls against the resources that you own, Amazon EventBridge needs the appropriate permissions.  
EventBridge relies on __resource-based policies__ for
* Lambda
* SNS

EventBridge relies on __IAM roles__ for
* EC2 instances
* Kinesis Data Streams,
* Step Functions state machines
* API Gateway APIs

#### Working with targets
__Lambda Function target__  
```bash
# Assign an existing Lambda function as a target
$ aws events put-targets --rule EC2InstanceStateChange --targets "Id"="1","Arn"="arn:aws:lambda:eu-west-2:966727776968:function:hello-world"
```  

__SNS Topic target__  
```bash
# Create an SNS topic
$ aws sns create-topic --name MonitoringTopic
# Subscribe to the topic. Remember to verify the subscription in your email after this command
$ aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:966727776968:MonitoringTopic --protocol email --notification-endpoint bbdchucks@gmail.com
# Assign the SNS topic as an event target
$ aws events put-targets --rule EC2InstanceStateChange --targets "Id"="2","Arn"="arn:aws:sns:eu-west-2:966727776968:MonitoringTopic"
```  

__CloudWatch LogGroup target__  
Here we use a CloudWatch Log group for an event target.
```bash
# First create the log group
$ aws logs create-log-group --log-group-name test-default-events-logs
# Assign the log group as a target
$ aws events put-targets --rule EC2InstanceStateChange --targets "Id"="3","Arn"="arn:aws:logs:eu-west-2:966727776968:log-group:test-default-events-logs:*"
```

__All assigned targets__   
To see all the assigned target of an rule:
```bash
# Show all targets associated with the rule
$ aws events list-targets-by-rule --rule EC2InstanceStateChange
```  
A rule can have up to five (5) targets associated with it at one time.  
In most CLI operation the `--event-bus-name` value may be omitted, in which case the default event is assumed.  

__Event/Rule matching__   
To test if a pattern matches an event  
```
$ aws events test-event-pattern --event-pattern file://rules/ec2-pattern-1.json --event file://events/ec2-event-1.json
$ aws events test-event-pattern --event-pattern file://rules/auto-scaling-pattern.json --event file://events/auto-scaling-event.json
```

__Test events__  
To test the default event bus, we launch and EC2 instance
```
$ aws ec2 run-instances --image-id ami-02fb3e77af3bea031 --count 1 \
  --instance-type t2.nano --key-name AmzLinuxKey2 \
  --security-group-ids sg-097302308e8550121
```  
For now, only the _SNS topic_ target receives the event. This can be seen in the email is is subscribed to the SNS topic.   

To trigger the EC2 events again, try stopping the EC2 instance
```
$ aws ec2 stop-instances --instance-ids i-014ff1735ee24a3a1
```  

__Cleanup__   
Remove a target
```
$ aws events remove-targets --rule EC2InstanceStateChange --ids 3
```
Delete a rule
```
$ aws events delete-rule --name EC2InstanceStateChange
```  

### Working with custom event bus
__Create your custom event bus__  
```
$ aws events create-event-bus --name VideoPlatformBus
$ aws events list-event-buses
```

__Create rule__  
Create a rules on your custom event bus
```
$ aws events put-rule --name BookOrdered --description 'Book order event pattern' --event-bus-name VideoPlatformBus --event-pattern file://rules/custom-pattern.json
```

__CloudWatch Log groups target__   
Use cloudwatch log group as an event target
```bash
# Create log-group to be used for custom event-bust
$ aws logs create-log-group --log-group-name video-platform-event-logs  
# Get the log-group ARN
$ aws logs describe-log-groups --log-group-name-prefix video-platform-event-logs
# Assign the LogGroup as target for the custom event bus
$ aws events put-targets --rule BookOrdered --event-bus VideoPlatformBus --targets 'Id=2,Arn=arn:aws:logs:eu-west-2:966727776968:log-group:video-platform-event-logs:*'
```

__SNS topic target__   
```bash
# Create SNS topic
$ aws sns create-topic --name shopping-orders-topic
# Subscribe to the topic. And verify the subscription in you email
$ aws sns subscribe --topic-arn arn:aws:sns:eu-west-2:966727776968:shopping-orders-topic --protocol email --notification-endpoint truetochukz@gmail.com
# Assign the SNS topic as target for custom event bus
$ aws events put-targets --rule BookOrdered --event-bus VideoPlatformBus --targets "Id"="1","Arn"="arn:aws:sns:eu-west-2:966727776968:shopping-orders-topic"
```

__Show all targets__   
```bash
# Show all targets associated with the rule in the custom event bus
$ aws events list-targets-by-rule --rule BookOrdered --event-bus VideoPlatformBus    
```  

__Custom events__  
When you create custom events they must include the following fields:
```
{
  "detail-type": "event name",
  "source": "event source",
  "detail": {
  }
}
```
For an event pattern to match an event, the event must contain all the field names listed in the event pattern. I'd say, the event pattern must be a subset of the event.  

__Event/Rule matching__   
To test if a pattern matches an event  
```
$ aws events test-event-pattern --event-pattern file://rules/custom-pattern.json --event file://events/custom-event.json
```  

__Test events__  
To test custom event bus, we emit a custom event
```
$ aws events put-events --entries file://events/custom-entries.json
```

__Clean up__  
Remove event target
```
$ aws events remove-targets --event-bus VideoPlatformBus --rule BookOrdered2 --ids 3
```
Remove rule
```
$ aws events delete-rule --name BookOrdered2 --event-bus VideoPlatformBus
```

### Assigning Permission
__To validate a policy document__   
```
$ aws accessanalyzer validate-policy --policy-type RESOURCE_POLICY --policy-document file://policies/events-trust-policy.json  
```  

```bash
# Create a role with a trust policy
$ aws iam create-role --role-name EventsPublishSNSRole --assume-role-policy-document file://policies/events-trust-policy.json
# Attach a policy to the role
$ aws iam put-role-policy --role-name EventsPublishSNSRole --policy-name AllowSNSTopicPublish --policy-document file://policies/sns-permission.json
# List the policies attached to the role
$ aws iam list-role-policies --role-name EventsPublishSNSRole
```
