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

__Review Question:__ Page 56 __Answer:__ Page 490

__Global Infrastructure__  
You can achieve high availability by deploying your application across multiple _Availability Zones_. Redundant instances for each tier (for example, web, application and database) of an application should be placed in distinct _Availability Zones_, thereby creating a multisite solution. At a minimum, the goal is to have an independent copy of each application stack in two or more _Availability Zones__   

__Accessing the Platform__   
To access AWS Cloud services, you can use the
* AWS Management Console (Web)
* AWS Command Line Interface (CLI)
* AWS Software Development Kits (SDKs)  

__Compute and Networking Services__  

| Service                | Use                                                                                  |
|------------------------|--------------------------------------------------------------------------------------|
| Amazon EC2             | Compute capacity to build and host software systems                                  |
| AWS Lambda             | AWS compute fleet of EC2 for running backend code                                    |  
| Auto Scaling           | Allows organization to scale EC2 capacity up or down automatically                   |
| Elastic Load Balancing | Automatically distributes incoming traffic across multiple EC2 instances.            |
| AWS Elastic Beanstalk  | Hosting of web application in a fully managed environment.                           |
| Amazon VPC             | Isolated section of AWS for organization to lunch AWS resources in a virtual network |
| AWS Direct Connect     | Dedicated network connection from an organization data center to AWS                 |
| Amazon Route 53        | Domain Name System(DNS) web service and domain registrar                             |

__Storage and Content Delivery__   

| Service             | Use                                                                              |
|---------------------|----------------------------------------------------------------------------------|
| Amazon S3           | General purpose storage infrastructure                                           |
| Amazon Glacier      | Storage for data archiving and long term backup and infrequently accessed data.  |
| Amazon EBS          | Persistent block-level storage volumes for use with ECS instances                |
| AWS Storage Gateway | Connects an on-premise software with cloud based storage on Amazon S3 or Glacier |
| Amazon CloudFront   | Content delivery service                                                         |

__Database Services__   

| Service            | Use                                                                              |
|--------------------|----------------------------------------------------------------------------------|
| Amazon RDS         | Provides a fully managed relational database service                             |
| Amazon DynamoDB    | Provides a fully managed NoSQL database service                                  |
| Amazon Redshift    | Fully managed petabyte-scale data warehouse service                              |  
| Amazon ElastiCache | Used for scaling of an in-memory cache on the cloud. Support Memcached and Redis |


__Management Tools__    

| Service            | Use                                                                              |  
|--------------------|----------------------------------------------------------------------------------|
| Amazon CloudWatch  | A monitoring service for AWS Clouse resources and applications                   |
| AWS CloudFormation | Used to create and manage a collection of related AWS resources or stack         |
| AWS CloudTrail     | Records AWS API calls for an account and delivers log files for audit and review |
| AWS Config         | For AWS resource inventory, config history, and config change notification       |

__Security and Identity__    

| Service                 | Use                                                                    |
|-------------------------|------------------------------------------------------------------------|
| AWS IAM                 | Used to create and manage AWS users and group and to grant permissions |
| AWS KMS                 | Used to create and control the encryption key used to encrypt data     |  
| AWS Directory Service   | To setup and run Microsoft Active  Directory in the AWS Cloud          |
| AWS Certificate Manager | Used to provision, deploy and manage SSL/TLS certificates and renewals |
| AWS WAF                 | Used to protect web applications from common attacks and exploitation  |  

__Application Services__   

| Service                   | Use                                                                                                  |
|---------------------------|------------------------------------------------------------------------------------------------------|
| Amazon API Gateway        | To create, publish maintain, monitor and secure APIs at scale                                        |
| Amazon Elastic Transcoder | To convert (or transcode) media files from their source formats into other version/format            |
| Amazon SNS                | To coordinate and manage the sending and delivery of messages                                        |
| Amazon SES                | Email service for sending transactional email, marketing message or any type of content to customers |
| Amazon SWF                | Fully manages state tracker and task coordinator used to build, run and scale background jobs        |
| Amazon SQS                | Fully managed message queuing service.                                                               |


## Chapter 2: Amazon Simple Storage Service (Amazon S3) and Glacier Storage  
__Introduction__
Nearly any application running in AWS uses _Amazon S3_, either directly or indirectly.  
_Amazon S3_ offers a range of storage classed designed for various generic use cases: general purpose, infrequent access, and archive.
To help manage data through its lifecycle, Amazon S3 offers configurable lifecycle policies. By using lifecycle policies, you can have your data automatically migrated to the most appropriate storage class, without modifying your application code.  

_Amazon Glacier_ can be used bot as a storage class of AmazonS3 and as an independent archival storage service.  

__Object Storage versus Traditional Block and File Storage__  
In Amazon S3, you _GET_ an object or _PUT_ an object, operating on the whole object at once, instead of incrementally updating portions of the object as you would with a file.
Amazon S3 objects are automatically replicated on multiple devices in multiple facilities within a region

__Objects__
User metadata for an object is optional, and it can only be specified at the time the object is created.  

__Durability and Availability__  
Amazon S3 achieves high durability by automatically storing data redundantly in multiple devices in multiple facilities within a region.  
If you need to store non-critical or easily reproducible derives data (such as image thumbnails) that doesn't require this high level durability, you can choose to use Reduced Redundancy Storage (RRS) as a lower cost. RRS offers 99.99% durability with a lower cost of storage than traditional Amazon S3 storage.  
__Tip__: Even though Amazon S3 storage offers very high durability at the infrastructure level, it is still a best practice to protect against user-level accidental deletion or overwriting of data by using additional features such as versioning, cross-region replication, and _MFA Delete (Multi Factor Authentication)_.   

__Data Consistency__  
For _PUTs_ to new objects, Amazon S3 provided read-after write consistency. However, for _PUTs_ to existing object (object overwrite to an existing key) and for object _DELETEs_, Amazon S3 provided _eventual consistency_. In all cases, updated to a single key are atomic.

__Access Control__    
To provide access to your bucket to others you can use one of the following
1. Amazon S3 Access Control Lists (ACLs)
2. Amazon S3 bucket policies (recommended)
3. AWS IAM policies
4. Query-string authentication  

_Amazon S3 ACLs_ grant certain coarse-grained permissions: READ, WRITE or FULL-CONTROL at the object or bucket level. It is a legacy access control. It may be used to enable bucket logging or make bucket to host static website to be world-readable.    

_Amazon S3 bucket policies_ provide fine-grained control. They are similar to IAM policies but are associated with bucket resources instead of an IAM principal. They also include an explicit reference to the IAM principal and allows cross-account access to the S3 resources.  

_IAM Policies_ which provide permissions to an Amazon S3 bucket may in turn provide access to any IAM principal which is associated with the policy.   

__Static Website Hosting__    
To configure an Amazon S3 bucket for static website hosting:  
1. Create a bucket with the same name as the desired website hostname.  
2. Upload the static files to the bucket.  
3. Make all the file public (world readable)
4. Enable static website hosting for the bucker. This includes specifying an Index document and an Error document.  
5. The website will now be available at the s3 website URL: <bucket-name>.s3-website-<AWS-region>.amazonaws.com.  
6. Create a friendly DNS name in your domain for the website using DNS CNAME or an Amazon Route 53 alias that resolves to the Amazon S3 website URL.  
7. The website will now be available at you website domain name.

#### Amazon S3 Advanced Features
__Tip__: Use delimiters and object prefixes to hierarchically organize the objects in your Amazon S3 bucket, but always remember that Amazon S3 is not really a file system.  
__Storage Classes__   

| Storage Class         | Suitability                                                             |
|-----------------------|-------------------------------------------------------------------------|
| Amazon S3 Standard    | General purpose                                                         |
| Amazon S3 Standard IA | For long lived, less frequently accessed data                           |
| Amazon S3 RRS         | For derived data that can be easily reproduced such as images thumbnails|
| Amazon Glacier        | For archives and long-term backups                                      |

__Note__: Amazon Glacier allows you to retrieve up to 5% of Amazon S3 data store in Amazon Glacier for free each month; restore beyond the daily restore allowance incur a restore fee.  
__Tip__: Set a data retrieval policy to limit restores to the free tier or to a maximum GB-per-hour limit to avoid or minimize Amazon Glacier restore fees.  

__Object Lifecycle Management__  
Reduce storage cost by automatically transitioning data from one storage class to another or even automatically deleing data after a period of time. This is done with Lifecycle configuration.  

__Review Questions__  
Question Page [87], Answer Page [492]  

## Chapter 3: Amazon Elastic Compute Cloud (Amazon EC2) and Amazon Elastic Block Store (Amazon EBS)  
__Amazon Elastic Compute Cloud (Amazon EC2)__   
Amazon EC2 is AWS primary web service that provides resizable compute capacity in the cloud.  

__Compute Basics__  
Because you are paying for the computing power of the instance, you are charges per hour while the instance is running. When you stop the instance, you are no longer charged.  
They key to launching instances are   
1. the amount of virtual hardware dedicated to the instance  
2. the software loaded on the instance  
These two dimensions of a new instance are controlled, respectively, by the instance type and the AMI(Amazon Machine Image).  

__Sample Instance Type Families__    

| Type | Summary                                                                          |  
|------|----------------------------------------------------------------------------------|
| c4   | __Compute optimized__ - For workloads requiring significant processing           |
| r3   | __Memory optimized__ - For memory-intensive workloads                            |  
| i2   | __Storage optimized__ - For workloads requiring high amounts of fast SSD storage |  
| g2   | __GPU-based instances__ - Intended for graphics and general-purpose GPU compute   |
