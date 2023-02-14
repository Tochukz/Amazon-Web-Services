# Amazon Simple Queue Service  
[AWS SQS Docs](https://docs.aws.amazon.com/sqs/?icmpid=docs_homepage_serverless)   
[Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)   
[API Reference](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/Welcome.html)  
[CLI Reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/index.html)    
[JavaScript SDK DeveloperGuide](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)  

## Introduction   
__Basic Architecture__  
A producer sends message1 to a queue, and the message is distributed across the Amazon SQS servers redundantly.   
A consumer consumes messages from the queue, and message1 is returned. While message1 is being processed, it remains in the queue and isn't returned to subsequent receive requests for the duration of the visibility timeout.  
The consumer deletes message1 from the queue to prevent the message from being received and processed again when the visibility timeout expires.  
The default message retention period is 4 days.

## Queue Types  
1. #### Standard Queue   
__Message ordering__  
A standard queue makes a best effort to preserve the order of messages, but more than one copy of a message might be delivered out of order. If your system requires that order be preserved, we recommend using a FIFO queue or adding sequencing information in each message so you can reorder the messages when they're received.  
 __At-least-once Delivery__   
On rare occasions, one of the servers that stores a copy of a message might be unavailable when you receive or delete a message.  
If this occurs, the copy of the message isn't deleted on that unavailable server, and you might get that message copy again when you receive messages.  
Design your applications to be _idempotent_ (they should not be affected adversely when processing the same message more than once).

2. #### FIFO Queue
FIFO queues have all the capabilities of the standard queues, but are designed to enhance messaging between applications when the order of operations and events is critical, or where duplicates can't be tolerated.  
FIFO queues also provide exactly-once processing, but have a limited number of transactions per second (TPS). You can use Amazon SQS high throughput mode with your FIFO queue to increase your transaction limit.

## AWS CLI for SQS
__Create a new Queue__  
```
$ aws sqs create-queue --queue-name shopping-orders.fifo --attributes file://queue-attributes.json
```  
__Get Queue URL__  
```
 $ aws sqs get-queue-url --queue-name shopping-orders.fifo
```

__Send Message__  
```
$ aws sqs send-message --queue-url https://sqs.eu-west-2.amazonaws.com/966727776968/shopping-orders.fifo --message-body "Information about the order item" --message-attributes file://message-attributes.json --message-group-id M001 --message-deduplication-id D001
```  

__Receive message__  
```
$ aws sqs receive-message --queue-url  https://sqs.eu-west-2.amazonaws.com/966727776968/shopping-orders.fifo
```  

__List all Queues__  
```
$ aws sqs list-queues
```
__Delete Queue__  
```
$ aws sqs delete-queue --queue-url https://sqs.eu-west-2.amazonaws.com/966727776968/shopping-orders.fifo
```