# AWS Certified Solutions Architech Official Study Guide  (2017)
__By AWS__   
#### Foreword  
This study guide provides coverage of the basic AWS Cloud services and architectural recommendation and best practices. However, nothing replaces hand on experience building and deploying a variety of cloud applications and controls on AWS.   

#### Interactive Online Learning Environment and Test Bank
Learn more about the [exam](https://aws.amazon.com/certification/certified-solutions-architect-associate/) and find practice exam online.   
Checkout the online [Test Lab](https://aws.amazon.com/training/self-paced-labs/) and [Training](https://aws.amazon.com/training/online-learning/).  

#### Assessment Test  
1. Test: Page 28, Answer: Page 34

## Chapter 1: Introduction to AWS  
__Cloud Computing Deployment Models__  
1. _All-in_ cloud deployment
2. Hybrid deployment

__Review Question__
Page 65

__Global Infrastructure__  
You can achieve high availability by deploying your application across multiple _Availability Zones_. Redundant instances for each tier (for example, web, application and database) of an application should be placed in distinct _Availability Zones_, thereby creating a multisite solution. At a minimum, the goal is to have an independent copy of each application stack in two or more _Availability Zones__   

__Accessing the Platform__   
To access AWS Cloud services, you can use the
* AWS Management Console (Web)
* AWS Command Line Interface (CLI)
* AWS Software Development Kits (SDKs)

## Chapter 2: Amazon Simple Storage Service (Amazon S3) and Glacier Storage  
Nearly any application running in AWS uses _Amazon S3_, either directly or indirectly.  
_Amazon S3_ offers a range of storage classed designed for various generic use cases.  

__Tip__: Set a data retrieval policy to limit restores to the free tier or to a maximum GB-per-hour limit to avoid or minimize Amazon Glacier restore fees.  
