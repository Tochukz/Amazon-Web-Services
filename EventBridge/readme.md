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
The basis of EventBridge is to create rules that route events to a target.  
__Creating Events__  
Every AWS account has one default event bus. This default event bus received all the events from AWS services.  
You can create you own custom event bus which you can use to receive events from your custom applications and services
```
$ aws events create-event-bus --name VideoPlatformBus
```
When you create an event bus, you can attach a _resource-based policy_ to grant permissions resources in a different region or a different AWS accounts.    

For list of services that generate event see [service-event-list](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-list.html).  

__AWS Cloud Trail__  
For other AWS services not listed in the service-event-list, you can receive events from them via _CloudTrail_.  
CloudTrail records events such as API calls and your can create rules that use the information recorded by CloudTrail.


__Writing a rule__  
It is possible to create rules that lead to infinite loops, where a rule is fired repeatedly. To prevent this, write the rules so that the triggered actions do not re-fire the same rule.
We recommend that you use budgeting, which alerts you when charges exceed your specified limit.  

__Create rule__  
Create a rule on your account's default event bus
```
$ aws events put-rule --name EC2InstanceStateChange --event-pattern file://rules/ec2-rule.json  --description "Event on EC2 instance state change"
```  

__Assign targets__  
To be able to make API calls against the resources that you own, Amazon EventBridge needs the appropriate permissions.  
EventBridge relies on __resource-based policies__ for
* Lambda
* SNS

EventBridge relies on __IAM roles__ for
* EC2 instances
* Kinesis Data Streams,
* Step Functions state machines
* API Gateway APIs

Assign targets to the rule
```bash
# Put Lambda Function target on default
$ aws events put-targets --rule EC2InstanceStateChange --targets "Id"="1","Arn"="arn:aws:lambda:eu-west-2:966727776968:function:hello-world"
# Put SNS topic target
$ aws events put-targets --rule EC2InstanceStateChange --targets "Id"="2","Arn"="arn:aws:sns:eu-west-2:966727776968:MonitoringTopic"
# Show all targets associated with the rule
$ aws events list-targets-by-rule --rule EC2InstanceStateChange
```
A rule can have up to five (5) targets associated with it at one time.  
In most CLI operation the `--event-bus-name` value may be omitted, in which case the default event is assumed.  

__Test events__  
To emit an event
```
$
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
