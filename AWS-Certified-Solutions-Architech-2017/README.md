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

__Review Question:__
Question - Page [56]  
Answers  - Page [490]

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
| Amazon EBS          | Persistent block-level storage volumes for use with EC2 instances                |
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
| g2   | __GPU-based instances__ - Intended for graphics and general-purpose GPU compute  |

See [AWS Instance types](https://aws.amazon.com/ec2/instance-types/) to for the current list.  
Enabling enhanced networking on an instance involves ensuring the correct drivers are installed and modifying an instance attribute.  Enhances networking is available only for instances launched in an Amazon Virtual Private cloud (Amazon VPC).  

__Amazon Machine Images (AMIs)__   
The _Amazon Machine Image (AMI)_ defines the initial software that will be on an instance when it is launched.  Am AMU defined every aspect of the software state at instance launch.  
There are four sources of AMIs:  
1. __Published by AWS__ - These include multiple distributions of Linux (including Ubuntu, Red Hat, and Amazon's own distribution) and Windows 2008 and Windows 2012. As with any OS installation, you should immediately apply all appropriate patches upon launch.  
2. __The AWS Marketplace__  - Instances launched from an AWS Marketplace AMI incur the standard hourly cost of the instance type plus an additional per-hour charge for the additional software except for open-source packages which have no additional charge.  
3. __Generating from Existing Instances__ - Am AMI can be created from an existing Amazon EC2 instance. A launched instance is first configured to meet all the customer's corporate standards and the an AMI is then generated from the configured instances and used to generate all instances of that OS.  
4. __Uploading Virtual Servers__ - Using AWSVM Import/Export service, customers can create images from various virtualization formats, including raw, VHD, VMDK, and OVA.  Make sure you are compliant with the licensing terms of your OS vendor.   

__Addressing an Instance__
There are several ways that an instance may be addressed over the web upon creation:  
* __Public Domain Name System (DNS) Name__ This DNS name can not be specified and persists only while the instance is running and cannot be transferred to another instance.  
* __Public IP__  This address persists only while the instance is running and cannot be transferred to another instance.   
* __Elastic IP__  This address is a public address that can be reserved and associated with an Amazon EC2 instance. This IP address persists until the customer releases it and can be transferred to a replacement another instance.   

In the context of an Amazon VPC, we also have __Private IP addresses__ and __Elastic Network Interfaces__ (ENIs).  

__Virtual Firewall Protection page__  
Security groups are applied at the instance level, as opposed to a traditional on-premises firewall that protects at the perimeter.  

#### The Lifecycle of Instances  
__Bootstrapping__  
The process of providing code to be run on an instance at launch is called _bootstrapping__.  
One of the parameters when an instance is launched is a string value called _UserData_. This string is passed to the operating system to be executed as part of the launch process the first time the instance is booted. ON Linux instances this can be shell script, and on Windows instances this can be a batch style scrip r a PowerShell script. The script can perform tasks such as:  
* Installing _Chef_ or _Puppet_ and assigning the instance a role as the configuration management software can configure the instance.

__Tip__: UserData is store with the instance and is not encrypted, so it is important to not include any secret such as password or keys in the UserData.

__To Lanch EC2 instance with UserData__  
Todo...

__VM Import/Export__
VM Import/Export enables you to easily import Virtual Machines (VMs) from you existing environment as an Amazon EC2 instance and export then back to your on-premise environment. You can only export previously imported Amazon EC2 instances. Instances launched within AWS from AMIs cannot be exported.   

__Instance Metadata__  
```
$ curl http://169.254.169.254/latest/meta-data
```

__Managing Instances__  
Tags can be used to identify attributes of an instance like projects, environment, billable department, and so forth. You can apply up to 10 tags per instance.  

__Modifying an Instance__  
To change the _Instance Type__  
* Stop the instance
* Select the desired instance type
* Restart the instance

You can change the _Security Groups_ associated with an instance while the instance is running. For `EC2-Classic`, you can not change the security group after launch.

__Termination Protection__  
In order to prevent termination via the AWS Management Console, CLI, or API, _termination protection_ can be enabled for an instance. While enabled, calls to terminate the instance will fail until termination protected is disabled.  
Note that _termination protection_ does not prevent termination triggered by an OS shutdown command, termination from an Auto Scaling group, or termination of a Spot Instance due to Spot price changes.  

__Pricing Options__  
1. __On-Demand Instances__: It is the most flexible and the least cost effective pricing option per compute hour.  
2. __Reserves Instances__: You can save up to 75 percent over the on-demand hourly rate. Two factors determines the cost of the reservation:
  * __Term commitment__: It can be either one or three years. The longer the commitment, the bigger the discount.  
  * __Payment options__:
    1. All Upfront - No monthly charge
    2. Partial Upfront - Pay a portion of the charge and the rest in monthly installment
    3. No Upfront - Pay the entire reservation in monthly installments.  

 You can change you reserves instance's from on Availability zone to another. You can also change the instance type within the same instance family if you instance AMI is Linux.  
3. __Spot Instances__: Offers the greatest discount for non-critical and interruption tolerant workload. If Amazon EC2 needs to terminate a Sport Instance, the instance will receive a termination notice providing a two-minute warning prior to Amazon EC2 terminating the instance.

__Tenancy Options__  
__Shared Tenancy__  Shared tenancy is the default tenancy model for all Amazon EC2 instances  
__Dedicated Instances__ Dedicated Instances run n hardware that is dedicated to a single customer.
__Dedicated Host__  Dedicated Hosts can help you address licensing requirements and reduce costs by allowing you to use your existing server bound software licenses.  This differs from Dedicated Instances in that s Dedicated Instance can launch on any hardware that has been dedicated to the account.    

__Placement Groups__   
A _placement group_ is a logical grouping of instances within a single Availability Zone. Placement groups enable applications to participate in a low-latency, 10 Gbps network. To fully use this network performance for your placement group, choose an instance type that supports enhanced networking and 10 Gbps network performance.   

__Instance Stores__   
An _instance store_ is also referred to as _ehpemeral storage_. Storage available with various instance types ranges from no instance store up to 242 TN instance store. The data will be lost of an instance is stopped but will persist if an instance reboots.

#### Amazon Elastic Block Storage (Amazon EBS)
__Elastic Block Store Basics__   
Each Amazon EBS volume is automatically replicated within its Availability Zone. Multiple Amazon EBS volume can be attached to a single Amazon EC2 instance, although a volume can only be attached to a single instance at a time.  

##### Types of Amazon EBS Volumes  
Types vary in areas such as underlying hardware, performance, and cost.  
__Magnetic Volumes__  
Magnetic volumes are the cheapest and also have the lowest performances. A magnetic EBS volume can range in size from 1 GB to 1TB and will average 100 IOPS, but has the ability to burst to hundreds of IOPS. They are best suited for:
* Cold workloads where data is accesses infrequently
* Sequential reads  
* Situation where low-cost storage is a requirement
Magnetic volumes are billed based on the amount of data space provisioned, regardless of how much data you actually store on the volume.

__General-Purpose SSD__   
General-purpose SSD volumes  deliver strong performance at a moderate price point that is suitable for a wide range of workloads.   
A general-purpose SSD volume can range in size from 1 GB to 16 TB and provision a baseline performance of 3 IOPS per gigabyte provisioned, capping at 10,000 IOPS.   
If you provision a 1TB volume, you can expect a baseline performance of 3,000 IOPS because 3 IOPS per gigabyte provisioned.  
If you provision a 5TB volume, you can expect a baseline performance of 10,000 IOPS not 15,000 IOPS because the capping is at 10,000 IOPS.   
If you provision less than  1TB you volume can burst up to 3,000 IOPS for extended periods of time because when you are not using IOPS, they accumulate as I/O credits and is used during heavy traffic up to a rate of 3,000 IPS until they are depleted and then return to baseline performance of the volume.   
At  1TB, the baseline performance of the volume is already 3, 000 IOPS, so bursting behavior does not apply.   

General-purpose SSD volumes are billed based on the amount of space provisioned regardless of how much data you actually store on the volume. They are suited for:
* workloads where very high disk performance is not critical.   
* System boot volume
* Virtual desktops
* Small-to-medium size database
* Development and test environment

__Provisioned IOPS SSD__  
Provisioned IOPS SSD are the most expensive EBS volume type per gigabyte and they provide the highest performance. A provisioned IOPS SSD volume range in size from 4GB to 16TB.   
When you provision a Provisioned IOPS SSD volume, you specify the size and the desired number of IOPS, up to the lowest of the maximum of 30 times the number of GB of the volume, or 20, 000 IOPS. You can strip multiple volumes together in a RAID configuration for larger size and greater performance.   
Pricing is based on the size of the volume and the amount of IOPS reserves. An additional monthly fee is applied based on the number of IOPS provisioned, whether they are consumed or not.  
Provisioned IOPS SSD are well suited for:
* applications requiring sustained IOPS performance
* critical application requiring mote than 10, 000 IOPS or 160MB of throughput per volume
* large database workloads.

__EBS Volume Type Comparison__  

Characteristic     | Magnetic                | General-Purpose SSD | Provisioned IOPS SSD |
-------------------|-------------------------|---------------------|----------------------|
Volume size        | 1 GiB - 1 TiB           | 1 GiB - 16 TiB      | 4 GiB - 16 TiB       |
Maximum throughput | 40-90MB                 | 160MB               | 320MB                |
IOPS performance   | Avg. 100 IOPS burstable | baseline 3 IOPS/GiB up to 10,000 IOPS | provision level up to 20,000 IOPS max. |

##### Other EBS Volume (HDD)
Overtime it is expected that _Throughput-Optimized HDD_ and _Cold HDD_ will replace the current magnetic volume type.
__Throughput-Optimized HDD__  
Throughput-Optimized HHD volumes are low-cost HDD volume designed for frequent-access, throughput-intensive workload. It is well suited for
* big data,
* data warehouse
* log processing
Throughput-Optimized are significantly less expensive than general purpose SSD volumes.
__Cold HDD__  
Cold HHD volumes are designed for less frequently accessed workloads, such as colder data requiring fewer scans per day. It is significantly less expensive then Throughput-Optimized HDD volumes.

__EBS HHD volume comparison__  

Characteristic     | Magnetic      | Cold HDD    | Throughput-Optimized HDD |
-------------------|---------------|-------------|--------------------------|
Volume Size        | 1 GiB - 1 TiB | 16 TiB max. | 16 TiB max               |
Maximum throughput | 40-90MB       | 250MB       | 500 MB                   |
IOPS performance   | 100           | 250         | 500                      |

__Amazon EBS-Optimized Instances__   
When you select Amazon EBS-optimized for an instance, you pay an additional hourly charge for that instance. Check the AWS documentation to confirm which instance types are available as Amazon EBS-optimized instance.  

#### Protecting Data
__Backup/Recovery (Snapshots)__  
Snapshots are incremental backups. You can take snapshots though the Console, CLI, API or by setting up a schedule of regular snapshots.   
Snapshot are free. Data for the snapshot is stores using Amazon S3 and you pay only for the storage cost.  
When you request a snapshot, the point-in-time snapshot is created immediately and the volume may continue to be used.  
Snapshots are stores using Amazon S3 in AWS-controlled storage. You must use the Amazon EBS snapshot feature to manage them. You can use snapshots to create new volumes only in the same region or you can copy the snapshot to another region to use it in that region.  

__Creating a Volume from a Snapshot__  
When you create a new Amazon EBS volume from a snapshot, the volume is created immediately but the data is loaded lazily. Because of this, it is a best practice to initialize a volume created from a snapshot by accessing all the blocks in the volume.  
You can increase the size of an Amazon EBS volume as follows:
1. take a snapshot of the volume
2. create a new volume of the desired size from the snapshot  
3. replace the original volume with the new volume  

__Recovering Volumes__   
If an Amazon EBS-backed instance fails and there is data on the bot drive, it is relatively straightforward to detach the volume from the instance. The volume can then be attached as a data volume to another instance and the data read and recovered.  

__Encryption Options__  
Amazon EBS offers native encryption on all volume types.  
When you launch an encrypted Amazon EBS volume, Amazon uses the _AWS Key Management Service (KMS)_ to handle key management. A new master key will be created unless you select a master key that you created separately in the service. You data and associated key are encrypted using the industry-standard _AES-256_ algorithm. The data is actually encrypted in transit between the host and the storage media and also on the media. Consult the AWS documentation for a list of instance types that support Amazon EBS encryption.  
Encryption is transparent, so all data access is the same as unencrypted volumes, and you can expect the same IOPS performance on encrypted volumes as you would with unencrypted volumes, with a minimal effect on latency.

__Learn More__  
[AWS EC2 Linux Guide ](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)   
[AWS EC2 Windows Guide](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/concepts.html)  
[AWS EBS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html)    

__Summary__  
Instance stores may be used only for temporal data or in architectures providing redundancy such as Hadoop's HDFS.

__Exam Essentials__  
Page [113]

__Exercises__
Page 115 - 123

__Review Questions__  
Questions - Page [127], Answers - Page[494]

## Chapter 4: Amazon Virtual Private Cloud (Amazon VPC)  
See [VPC.md](https://github.com/Tochukz/AWS/blob/master/VPC/VPC.md)  

__Review Questions__   
Questions - Page[160], Answers - Page[496]

## Chapter 6: AWS Identity and Access Management (IAM)
#### Introduction   
The control provided by IAM is granular enough to limit a single user to the ability to perform a single action on a specific resource from a specific IP address during a specific time window.
If your application identities are bases on Active Directory, your on-premise Active Directory can be extended into the cloud to continue to fill that need. A great solution for using Active Directory in the cloud is _AWS Directory Service_, which is an Active Directory-compatible directory service that can work on its own or integrate with your on-premise Active Directory.  
Finally, if you are working with a mobile app, consider _Amazon Congito_ for identity management for mobile applications.  

__Authentication Technologies__    

Use Case                | Technology Solutions                                            |  
------------------------|-----------------------------------------------------------------|
Operating System Access | Active Directory, LDPA Machine-Specific accounts                |
Application Access      | Active Directory, Application User Repositories, Amazon Cognito |
AWS Resources           | IAM                                                             |

The AWS Partner Network (APN) includes a rich ecosystem of tools to manage and extend IAM.  

__Principals__  
A _principal_ is an IAM entity that is allowed to interact with AWS resources. There are three types of principals: root users, IAM users, and roles/temporary security tokens.  

__Root User__  
It is recommended to not use the root user for your everyday task, but instead to create IAM users and the securely lock away the root user credentials.  

__IAM Users__  
IAM users can be created by principals with IAM administrative privileges at any time and delete at any time. Users are an excellent way to enforce the principle of least privilege. Users can be associated with very granular policies that define these permission.

__Roles/Temporary Security Tokens__  
Roles are used to grant specific privileges to specific actors for a set duration of time. These actors can be authenticated by AWS or some trusted external system. When one of these actors assumes a tole, AWS provides the actor with a temporary security token from the _AWS Security Token Service (STS)_ that the actor can use to access AWS Cloud services. The range of a temporary security token lifetime is 15 minutes to 36 hours.  
Roles and temporary security tokens enable a number of use cases:    
* __Amazon EC2 Roles__ - Granting permissions to applications running on an Amazon EC2 instance.  
* __Cross-Account Access__ - Granting permission to users from other AWS accounts  
* __Federation__ - Granting permissions to users authenticated by a trusted external system.  

__Amazon EC2 Roles__  
An application running on an EC2 instance can use the access key of an IAM user to access other Amazon services, for example to Read or Write to an S3 bucket. There are a number of problems with this approach because the process foe obtaining, encrypting and storing the access key is complicated and a hinderance to agile development. There are also problems involved with rotating the access key and risk involved with passing the key around.   
Using IAM roles for Amazon EC2 removes the need to store AWS credentials in a configuration file.    
When the Amazon EC2 instance is launched, the role is assigned to the instance. When the application running on the instance uses the API to access the Amazon S3 bucket, it assumes the role assigned to the instance and obtains a temporary token that is sends to the API. The process of obtaining the temporary token and passing it to the API is handled automatically by most of the AWS SDKs, allowing the application to make a call to access the Amazon S3 bucket without worrying about authentication. This removes the need to store an access key in a configuration file. Also there is no need  for a rotation since the APIC access uses a temporary token.  

__Cross-Account Access__  
You can set up an IAM roe with the permissions you want to grant to users in the other account, then users in the other account can assume that role to access your resources. This is highly recommended as a best practice, as opposed to distributing access keys outside your organization.  

__Federation__  
_IAM Identity Providers (IdP)_ provides the ability to federate outside identities with IAM and assign privileges to those users authenticated outside of IAM.   
IAM can integrate with two different types of outside _Identity Providers(IdP)_:
* __OpenID Connect (OIDC)__ - IAM supports integration via OIDC for federating web identities such as Facebook, Google or Login with Amazon . This allow IAM to grant privileges to users authenticated with some of the major web-bases IdPs.  
* __Security Assertion Markeup Language 2.0 (SAML)__ - IAM support SAML for federtin internal identities, such as Active Directory and Lightweight Directory Access Protocol (LDAP). A SAML-compliant IdP such as Active Directory Federation Service (ADFS) is used to federate internal directory to IAM   

In each case, federation works by returning a temporary token associated with role to the IdP for the authenticated identity to use for calls to the AWS API.


#### Authentication
There are three ways that IAM _authenticated_ a principal:
* __User Name/Password__ - IAM allows you to create a password policy enforcing password complexity and expiration.  
* __Access Key__ - An access key is a combination of an access key ID (20 characters) and access secret key (40 characters).  
* __Access Key/Session Token__ - The Temporary security token provides an access key for authentication. In addition to the access key, then token also include a _session token_.  

#### Authorization
Authorization is handled in IAM by defining specific privileges in _policies_ and associating those policies with principals.  

__Policies__  
Policy document contains one or more permissions, with each permission defining:
* __Effect__ - Allow or Deny
* __Service__ - For what service
* __Resource__ - This is specified as an _Amazon Resource Name (ARN)_ which has the format `arn:aws:service:region:account-id:[resourceType:]resource`
* __Action__ - A set of actions can be specified with an enumerated list or by using wildcards
* __Conditins__ - Optionally defined one or more additional restrictions that limit the actions allowed by the permission. See the IAM documentation for lists of supported conditions for each service.  
```
{
  "Version": "2012–10–17",
  "Statement": [
     {
        "Sid": "Stmt1441716043000",
        "Effect": "Allow",
        "Action": [
          "s3:GetObject",
          "s3:ListBucket"
        ],
        "Condition": {
          "IpAddress": {  
             "aws:SourceIp": "192.168.0.1"
          }
        },
        "Resource": [
          "arn:aws:s3:::my_public_bucket/*"
        ]
      }
    ]
}
```
__Associating Policies with Principals__  
A policy can be associated directly with an IAM user in one of two way:  
* __User Policy__ A user policy is entered into the user interface on the IAM user page.  
* __Managed Policies__  There are a large number of predefined managed policies and you can write your own policies.  

There are two ways a policy can be associated with IAM group  
* __Group Policy__ - In the AWS Management Console, a group policy is entered into the user interface on the IAM Group page.
* _Managed Policies__ - A managed policy can be associated to a group same way it is associated to an individual user.  

The final was an actor can be associated with a policy is by assuming a role. I this case, the actor can be:  
* An authenticate IAM user (person or process)
* A person or process authenticated by a trusted service outside of AWS  

After an actor has assumed a role, it is provided with a temporary security token associated with the policies of that tole.

__Multi-Factor Authentication(MFA)__  
MFA, authentication also required entering a One-Time Password (OTP) from a small device. The MFA device can be either a small hardware device you carry with you or a virtual device via an app on your smart phone (for example, the AWS Virtual MFA app).   
MFA can be assigned to any IAM user account, whether the account represents a person or application. It is strongly recommended that AWS customer ass MFA protection to their root user.  

__Rotating Keys__  
It is a security best practice to _rotate access keys_ associated with your IAM users. IAM facilitates this process by allowing tow active keys at a time. Access keys should be rotated on a regular schedule.   

__Resolving Multiple Permissions__    
If an _AssumeRole_ call includes a role and a policy, the policy cannot expand the privileges of the role (for example, the policy cannot overrise any permission that is denied by default in the role.)

#### Exercises
Page [208]

#### Review Questions
Questions - Page [211], Answers Page [500]

## Chapter 7: Databases and AWS  
#### Database Primer
__Relational Databases__   
A relational database can be categorized as either an _Online Transaction Processing (OLTP)_ or _Online Analytic Processing (OLAP)_ database  system.  OLTP refers to transaction-oriented applications that are frequently writing and changing data. OLAP is typically the domain of data warehouses and refers to reporting or analyzing large data sets.

__Data Warehouses__  
Data warehouse are specialized type of relational database that can be used for reporting and analysis via OLAP. Data warehouse are also typically updated on a batch schedule multiple times per day or per hour compared to an OLTP relational database that can be updated thousands of times per second. OLTP transactions may occur frequently and are relatively simple. OLAP transaction occurs much less frequently but are much more complex.    
_Amazon RDS_ is often used for OLTP workloads, but it can also be used for OLAP. _Amazon Redshift_ is a high-performance data warehouse designed specifically for OLAP use cases.

__NoSQL Databases__  
Traditional relational databases are difficult to scale beyond a single server without significant engineering and cost, but a NoSQL architecture allows for horizontal scalability on commodity hardware.   
A common use case for NoSQL is managing user session state, user profile, shopping cart data, or time-series data.    
You can use Amazon Dynamo DB to build a distributed cluster spanning multiple data centers.   

__Amazon Relational Database Service (Amazon RDS)__   
Amazon RDS exposes a database endpoint to which client software can connect and execute SQL. Amazon RDS does not provide shell access to Database Instances, and it restricts access to certain system procedures and tables that require advanced privileges.  

__Database Instances__   
You can launch a new DB Instance by calling the `CreateDBInstance` API or by using the AWS Management Console. Existing DB Instances can be changed or resized using the `ModifyDBInstance` API.   
The range of DB Instance clases extends from `db.t2.micro` with 1 virtual CPU (vCPU) and 1GB of memory, up to a `db.r3.8xlarge` with 32 vCPU and 244 GB of memory.  You can change the instance class and the balance of compute of memory, and Amazon RDS will migrate your data to a larger or smaller instance class.    
Independent from the DB Instance class that you select, you can also control  the size and performance characteristics of the storage used.     
Many features and common configuration settings are exposed and managed using _DB parameter groups_ and _DB option groups_.     

A `DB parameter groups` acts as a container for engine configuration values that can be applied to one or more DB Instances. A reboot is required if you change the _DB parameter group_ for an existing instance.    
A `DB option groups` acts as a container for engine features which is empty by default. In order to enable specific features of a DB engine, you create a new _DB option group_ and configure the settings accordingly.  

__Tip__  
You can use native tools and techniques to migrate your database to Amazon RDS. For example, you can use `mysqldump` to export you MySQL database and import the file into RDS MySQL. You can also use `AWS Database Migration Service`, which has a GUI, for migration of schema and data, it also help convert database from one database engine to another.    

__Operational Benefits__  
In Amazon RDS, you cannot use Secure Shell (SSH) to log into the host instance and install a custom piece of software. You can, however, connect using SQL administrator tools or use _DB option groups_ and _DB parameter groups_ to change the behavior or feature configuration for a DB Instance. If you want fill control of the Operating System or require elevated permissions to run, then consider installing your database on Amazon EC2 instead of Amaon RDS.  

#### Database Engines  
__MySQL__  
Amazon RDS for MySQL runs the open source Community Edition of MySQL with `InnoDB` as the default and  recommended database storage engine. It supports MySQL versions 5.6.x through 8.0.x also supports _Multi-AZ_ deployments for high availability and _read replicas_ for horizontal scaling.  

__PostgreSQL__  
Amazon RDS support PostgreSQL version 9.6.1 through 152.5.x. Amazon RDS PostgreSQL can be managed using standard tools like _pgAdmin_ and supports JDBC/ODBC drivers. Amazon RDS PostgreSQL also support _Multi-AZ_ deployment for high availability _and read replicas_ for horizontal scaling.  

__MariaDB__  
MariaDB adds features that enhance the performance, availability, and scalability of MySQL. Amazon RDS supports MariaDB version 10.x.x, it also supports the `XtraDB` storage engine for MariaDB DB Instances. Also _Multi-AZ_ deployment and _read replicas_ are supported.  

__Oracle__  
Amazon RDS Oracle supports versions 11.2.0.4 through 19.0.0.0 and four editions.

__Comparing Amazon RDS Oracle Editions__  

Edition      | vCPU     | Multi-AZ | Encryption    |
-------------|----------|----------|---------------|
Standard     | up to 32 | Yes      |  KMS          |
Standard One | up to 16 | Yes      |  KMS          |
Standard two | up to 16 | Yes      |               |
Enterprise   |          | Yes      |  KMS and TDE  |

_Standard Edition Two_ is a replacement for _Standard Edition_ and _Standard Edition One_.  

__Microsoft SQL Server__   
Amazon RDS support SQL Server version 2012 through 2019 and four editions  

__Comparing Amazon RDS SQL Server Editions__  

Edition    | Performance | Multi-AZ | Encryption  |  
-----------|-------------|----------|-------------|
Express    | +           | No       | KMS         |
Web        | ++++        | No       | KMS         |
Standard   | ++++        | Yes      | KMS         |
Enterprise | ++++++++    | Yes      | KMD and TDE |

__Licensing for SQL Server and Oracle__  
AWS offers two licensing models: License Included and Bring You Own License (BYOL)   
__License Included__  
For Oracle, License Included provides licensing for Standard Edition one. For SQL Server, License Included provides licensing for SQL Server Express Edition, Web Edition and Standard Edition.  
__Bring You Own License (BYOL)__  
For Oracle, you can bring over Standard Edition, One, Standard Edition and Enterprise Edition. For SQL Server, you provide your won license under the Microsoft License Mobility program. You can bring over Microsoft Standard Edition and also Enterprise Edition.  

__Amazon Aurora__   
Amazon Aurora can deliver up to five times the performance of MySQL without requiring changes to most of your existing web applications.   
When you first create an Amazon Aurora instance, you create a DB cluster.  
An Amazon Aurora cluster volume is a virtual database storage volume that spans multiple Availability Zones, with each Availability Zone having a copy of the cluster data. There are two types of Aurora instances:  
1. __Primary Instance__: The main instance which supports read and write workload. Each DB cluster have one primary instance.
2. __Amazon Aurora__: The secondary instance that supports only read operations. You can have up to 15 Amazon Aurora Replicas.  

#### Storage Options
Amazon RDS uses Amazon EBS for storage. Depending on your database engine and workload, you can scale up to 4TB to 6TB in provisioned storage and up to 30,000 IOPS.  The ere three storage types  

__Amazon RDS Storage Types__  

Storage Type             | Size  | Performance | Cost  |
-------------------------|-------|-------------|-------|
Magnetic / Standard      | +++   | +           | ++    |
Genera Purpose/gp2 (SSD) | +++++ | +++         | +++   |
Provisioned IOPS (SSD)   | +++++ | +++++       | +++++ |

#### Backup and Recovery  
For Backup, you can use _automated backup_, _manual snapshot_ or both. For recovery you need to define you _Recovery Point Objective (RPO)_ and you _Recovery Time Objective (RTO)_.  
__RTO__ is the maximum period of data loss that is acceptable in the event of a failure. For example, a system may backup transaction logs every 15 minutes to minimize data loss in the event of a failure of accidental deletion.
__RTO__ is the maximum amount of downtime that is permitted to recover from backup and to resume processing. For example, a large database may take hours to restore from a full backup.  

__Automated Backups__  
Amazon RDS creates a storage volume snapshot of you DB instance. By default one day of backups will be retained but you can modify the _backup retention period_ up to a maximum of 35 days.  
Automated backups will occur daily during a configurable 30-minute maintenance window called the _backup window_.   

__Manual DB Snapshots__  
DB snapshots can be created with the Amazon RDS console or the `CreateDBSnapshot` action. Unlike automated snapshots that are deleted after the retention period, manual DB snapshots are kept until you explicitly delete them with the Amazon RDS console or the `DeleteSnapshot` action.  

__Tip__: During the backup window, storage I/O may be suspended while your data is being backed up, any your may experience elevated latency. This I/O suspension typically lasts for the duration of the snapshot. This period of I/O suspension is shorter for Multi-A DB deployments.

__Recovery__  
You cannot restore from a DB snapshot to an existing DB Instance; a new DB Instance is created when you restore.  

__High Availability with Multi-AZ__   
Multi-AZ lets you meet the most demanding PRO and RTO targets by using synchronous replication to minimize RPO and fast failover to minimize RTO to minutes.   
When you create a Multi-AZ DB Instance, a primary instance is created in one Availability Zone and a secondary instance is created in another Availability Zone. You are then assigned a database instance endpoint such as _my_app_db.ch6fe7ykq1zd.us-west-2.rds.amazonaws.com_.  
Amazon RDS automatically perform a failover to a standby instance in any event of failure. The time for automatic failover to complete is typically one to two minutes.  
__Tip__: Multi-AZ deployments are for disaster recovery only; they are not meant to enhance database performance. To improve database performance, using multiple DB Instances, use read replicas or other DB caching technologies such as `Amazon ElastiCache`.  

__Scaling Up and Out__  
Amazon RDS allows you to scale compute and storage vertically, and for some DB engine, you can scale horizontally.

__Vertical Scalability__   
Changes can be scheduled to occure during the next maintenance window or to begin immediately using the `ModifyDBInstance` action.  
After you select a larger or smaller DB Instance class, Amazon RDS automated the migration process to a new class with only a short disruption and minimal effort.    
Storage expansion is supported for all of the database engine except for SQL Server.  

__Horizontal Scalability with Partitioning__  
Partitioning, or _sharding_, allows you to scale horizontally to handle more users and requests by using multiple instances but requires additional login in the application layer. NoSQL database like Amazon DynamoDB or Cassandra are designed to scale horizontally.  

__Horizontal Scalability with Read Replicas__  
Amazon RDS supports read replicas DB Instances that allow you to scale out elastically beyond the constraints of a single DB Instance for read-heavy database workload.   
Amazon RDS support Read replicas for MySQL, PostgreSQL, MariaDB, and Amazon Aurora. It uses the built-in replication functionality of the DB engines (MySQL, PostgreSQL, MariaDB)  to create a special type of DB Instance, called a read replica from a source DB Instance.   

__Tip__:  You can use cross-region read replicas to reduce global latencies or migrate database across AWS regions.  

__Security__  
Some key administrator actions that can be controlled in IAM include `CreateDBInstance` and `DeleteDBInstance`.  Encryption at rest is possible for all engine using the _Amazon Key Management Service(KMS)_ or _Transparent Data Encryption (TDE)_.  

#### Amazon Redshift  
With connectivity via ODBC or JDBC, Amazon Redshift integrates well with various data loading, reporting, data mining, and analytics tools. Amazon Redshift is based on industry-standard PostgreSQL, so most SQL client application will work with only minimal changes.  

__Cluster and Nodes__   
An Amazon Redshift cluster is composed of a leader node and one or more compute nodes. The client application interacts directly only with the leader node. Amazon Redshift support six node types which are categorized into _Dense Compute_ and _Dense Storage_. Dense Compute node types supports clusters up to 326TB using fast SSDs, while Dense Storage nodes support clusters up to 2 PB using large magnetic disks.  
Whenever you perform a resize operation, Amazon Redshift will create a new cluster and migrate data from the old to the new one. Curing a resize operation, the database will become read-only until the operation is finished.


__Table Design__  
Amazon Redshift `CREATE TABLE` command also supports specifying compressions encodings, distribution strategy, and sort keys.  

__Compression Encoding__  
You can specify compression encoding on per-column basis as part of the `CREATE TABLE` command or Amazon Redshift will automatically select the best compression schema for each column when you load data for the first time.  

__Distribution Strategy__   
When creating a table, you can chose between one of three distribution styles: EVEN, KEY, or ALL.
__EVEN distribution__ The default, which distribute data across slices uniformly.  
__KEY distribution__  The rows are distributed according to the value in one column.  
__ALL distribution__  This is useful for lookup tables and other large tables that are not updated frequently.  

__Sort Keys__  
The sort keys for a table can be either compound or interleaved.  

__Loading Data__  
For bulk operations, Amazon Redshift provides the `COPY` command as a much more efficient alternative than repeatedly calling `INSERT`.  
After each bulk data load that modifies a significant amount of data, you will need to perform a `VACUUM` command to reorganize you data and reclaim space after deletes. It is also recommended to run an `ANALYZE` command to update table statistics.  
Data can also be exported out of Amazon Redshift using the `UNLOAD` command.  
__TIP__ The fastest way to load data into Amazon Redshift is doing bulk data loads from flat files stores in an Amazon Simple storage Service (Amazon S3) bucket or from an Amazon DynamoDB table.  

__Querying Data__  
You can monitor the performance of the cluster and specific queries using _Amazon CloudWatch_ and the Amazon Redshift web console.   
For large Amazon Redshift clusters supporting may uses, you can configure _Workload Management (WLM)_ to queue and prioritize queries.   

__Snapshots__  
Amazon Redshift support both automated snapshots and manual snapshots just like Amazon RDS.  

__Security__  
There are multiple layers of security
* at the infrastructure level using IAM policies
* at the network level using private subnet, security groups and Access Control Lists.
* at the database level using database users, groups and permissions to database objects.
* with data on transit using encrypti0n such as SSL-encrypted connections
* with data at rest using KMS and _AWS CloudHSM_ for encryption key management.

#### Amazon DynamoDB  
Amazon DynamoDB can provide consistent performance levels by automatically distributing the data and traffic for a table over multiple partitions. As you demand changes overtime, you can adjust the read or write capacity after a table has been created, and  Amazon DynamoDB will add or remove infrastructure and adjust the internal partitioning accordingly.  
Amazon also provides automatic replication of data across multiple Availability Zones with an AWS Region.  

__Data Model__  
Individual items in an Amazon DynamoDB table can have any number of attributes although there is a limit of 400KB on the item size.  
Applications can connect to the Amazon DynamoDB service endpoint and submit request over HTTP/S to read and write items to a table or even to create and delete tabled.  DynamoDB provides a web service API that accept requests in JSON format. You can program directly against the web service API endpoint or you can use AWS SDK to interact with the tables.  

__Data Types__  
When you create a table or secondary index, you must specify the names and datatypes of each primary key attributes (partition key and sort key). Attribute datatypes fall into three major categories:  Scalar, Set, or Document.  

__Scalar Data Types__ Represents exactly one value:   
* String
* Number
* Binary
* Boolean
* Null  

__Set Data Types__ Represents a unique list of one or more scalar value. Each value in a set must be unique and the same data type:  
* String Set
* Number Set
* Binary Set  

__Document Data Types__  Represents multiple nested attributes similar to the structure of a JSON file.  
* List: An ordered list of attributes of any/different data types
* Map: Un unordered list of key/value pair. Can be used to represent JSON  

__Primary Key__  
Amazon supports two types of primary keys, and this configurations cannot be changed after a table has been created:  
__Partition Key__ The primary key is made of one attribute, a partition (or hash)  

__Partition and Sort Key__  The primary key is made of two attributes. A partition kay and a sort (or range) key. Each item in the table is uniquely identified by the combination of its partition and sort key values.  

__Tip__ If you are performing many reads or writes per second on the same primary key, you will not be able to fully use the compute capacity of the Amazon DynamoDB cluster. A best practice is to maximize your throughput by distributing requests across the full range of partition keys.  

__Provisioned Capacity__  
You must provision a certain amount of read write capacity for your workload. This value can be scaled up or down later using an `UpdateTable` action.   
Each operation against an Amazon DynamoDB  table will consume some of the provisioned capacity units the amount of which is dependent on the size of the item and other factors.  
* A read of 4kB or less consumes 1 capacity unit .
* A write of 1KB or less consumes  1 capacity unit.  
* A read operation that is strongly consistent consumes twice the number of capacity unit i.e 2 capacity unit for 4KB.


__Secondary Indexes__  
A secondary index lets you query the data in the table using an alternate key, in addition to queries against the primary Key. Amazon DynamoDB supports tow different kind of indexes:  
* __Global Secondary Index__: an index where partition and sort key can be different   
* __Local Secondary Index__:

Continue from page [239]

##
