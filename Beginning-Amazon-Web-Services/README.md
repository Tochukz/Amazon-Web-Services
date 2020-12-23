# Beginning Amazon Web Services with Node.js (2015)
__by Adam Shackelford__   
[Github Code](https://github.com/apress/beg-amazon-web-services-w-node.js)  

## Chapter 1: Getting Started with Amazon Web Services  
__Benefits of the Cloud__  
 * _Scalability_ - The ability to rapidly deploy additional resources to support your application. With your application hosted on AWS, you can allocate resources on demand and launch new servers and keeping your application online.   
 The ability to respond to demand for your application is known as _elasticity_.

There are three approaches for interacting with AWS services:  
1. Using the AWS Console  
2. Programmatically with the SDK
3. Using the AWS CLI
Routine tasks is best done with the SDK such as logging.  
One-time tasks may be done on the AWS console such as creating notification for use to be alerted when our app is slow to respond to request.
If your application is unresponsive, you can check the status of all AWS services at [http://status.aws.amazon.com](http://status.aws.amazon.com)

Review your expenditure at any time at [https://console.aws.amazon.com/billing/home](https://console.aws.amazon.com/billing/home)  

Review all free tier services [aws.amazon.com/free](aws.amazon.com/free)
__Tip__ To save money, you can shut down many of your resources when you aren't working on the lessons.  

__IAM Users__  
The _ARN (Amazon Resource Name)_ is essentially a global identifier for all AWS resources of any kind. Anytime any resource, such as a user, an EC2 instance, a database instance, etc., is created, an ARN is automatically generated.
A _policy_ is essentially a declaration of one or more permissions for a user, group, role, or other resources.  

## Chapter 2: Working with AWS OpsWorks  
__Understanding OpsWorks__  
The technological underpinning of _OpsWorks_ is _Chef[www.chef.io]_, a framework for configuring, automating, and streamlining server deployments Programmatically.  

__Deployment options (in order of convenience/control)__
1. AWS Elastic Beanstalk
2. AWS OpsWorks  
3. AWS CloudFormation
4. Amazon EC2+ CloudWatch + AutoScaling + Custom AMIs  
1 Gives you the most convenience and least control while 4 gives you the most control and least convenience.

__Allocating Resources__  
To review the specs of EC2 instance types, a breakdown is provided at [http://aws.amazon.com/ec2/instance-types/](http://aws.amazon.com/ec2/instance-types/)
Cross reference the instance types with the pricing here: [https://aws.amazon.com/ec2/pricing/](https://aws.amazon.com/ec2/pricing/)

__Regions and Availability Zones__   
You can find more detaild information at [https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).  
Your best bet is to host your application in the region(s) closest to your expected user base.  

AWS has _Regions_, which is made up of one or more  _Availability Zones_. The _Availability Zones_ is a data center that houses the hardware on which AWS services run.  

__Additional IAM Roles__  
To avoid the security risk of storing credentials locally or in our code, we can instead use IAM roles to manage authentication with other services. By creating a role for our instances, generally referred to as an _instance role_, we can programmatically access other AWS SERVICES VIA THE AWS API, without storing security credentials in our source code.   

__Service Role__
Service roles generally gives an AWS Service(e.g _OpsWorks_) the permission to create and manage AWS resources on our behalf.
For example we can gives our application stack the permission to carryout routine task, such as rebooting instances, reporting metrics to the AWS Console etc .  
You may use the convention in naming role _[service]-[app]-[role]_.  
to follow best practices, Amazon recommends that root account access keys be revoked and multifactor authentication be enabled for root accounts. Follow these guidelines at your discretion, but you should at least learn how to manager your architecture via a user account rather than the root account.  
However, when creating our first application stack in Opsworks, we must have _IAM Administrator Access_.
Wile you may have root access to the AWS account, it is best to get into the habit of working as a user on any AWS account i.e., your employer's or client's account.  

__SSH Keys__  
Amazon allows us to create an SSH key in the AWS Console and set it as the default key for all instances in a stack. You could theoretically use one master key for all stacks, but one key per stack seems to make a lot more sense.
__Note__ If you delete a key pair, it will not affect the instance already using them. You will still be able to connect to your instances if you have a copy of the private key. However, you will not be able to provision new instances with a deleted key pair.  

__Amazon Linux__  
By default, the only way to remote access an Amazon Linux instance is via SSH. Additional methods can be opened vis AWS Console.   
Learn more about Amazon Linux here [http://aws.amazon.com/amazon-linux-ami/](http://aws.amazon.com/amazon-linux-ami/)

__Instance vs. EBS__
_ECS_ instances are ephemeral, when an instance is stopped, all the data stored on the instance is lost.  As such, it not a good idea to depend on an _EC2_ instance for data persistence. With _EBS (Elastic Block Storage)_ , you can provision a scalable disk drive for persistent data storage. You cam only attach an _EBS_ instance to one _EC2_ instance at a time, but you can take a snapshot of our EBS and use it to instantiate a new EBS.

__Layers__  
In a traditional environment, a layer could be a runtime like Node.js or a database server like MySQL. They are components that makes up our application stack. In _OpsWorks_, each layer will require resources allocated to it.   
Every stack must have at least one layer, of which there are toe type:  
1. _OpsWorks layers_:
2. _Service Layer_
An _OpsWorks layer_ is simple the blueprint for EC2 instances assigned to it. Opsworks layer provides your with a number of preset layer types categories as:
* Load Balancer
* App Server
* DB
* Other  
_Service layers_ allow you to add other AWS services as layers in your OpsWorks stack. Service layer type includes:  
* RDS
* ?

For instance specs you can cross-refernce this list here [https://aws.amazon.com/ec2/instance-types/#Instance_Types](https://aws.amazon.com/ec2/instance-types/#Instance_Types).
__Instances__  
An instance represents a server. It belongs to one or more layers that define the instance's settings, resources, installed packages profiles and security group. When you start an instance OpsWorks uses the associated layer's blueprint to create and configure a corresponding EC2 instance.

__OpsWorks Application Configuration Flow__  
OpsWorks  
Create Stack
Add Layer
Add Instance to the Layer.
Add App



"If you were feeling ambitious after finishing the lessons, you could probably script many of the AWS Console tasks in the book."  
