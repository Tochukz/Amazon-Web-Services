# AWS Certified Solutions Architech Official Study Guide  (2019)
Assessment Test Page [27], Answers to Assessment Page [33]

## Chapter 1: Introduction to Cloud Computing and AWS  
#### Cloud Computing Optimization
__Scalability__  
AWS offers its autoscaling service through which you define a machine image that can be instantly and automatically replicated and launched into multiple instances to meet demand.  
__Elasticity__  
n elastic infrastructure will automatically reduce capacity when demand drops.  

__Cost Management__  
Cloud computing transitions your IT spending from capital expenditure(capex) framework into something closer to operational expenditure(opex).  See [AWS Calculator](https://calculator.aws/) to estimate the cost of your architecture.  

#### AWS Platform Architecture  
It is important to always be conscious of the particular region you have selected when you launch new AWS resources, as pricing and service availability can vary from one to next.    
Endpoint addresses are used to access your AWS resources remotely from within application code or scripts. Prefixes like _ec2_, _apigateway_ or _cloudformation_ are often added to the endpoint to specify a particular AWS service e.g _cloudformation.us-east-2.amazonaws.com_. See [full list](https://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region) of endpoints.  

A VPC is effectively a network address space within which you can create network subnets and associate then with particular availability zones. When configures properly, this architecture can provide effective resource solation and durable replication.  

__The AWS Service Level Agreement__  
The important thing to remember is that it's not if things will fail but when. Build your applications to be geographically disperses and fault tolerant so that when things do break, your users will barely notice.  

__AWS CLI__  
List buckets available in your AWS account
```
$ aws s3 ls
```  
Create a new Bucket
```
$ aws s3 mb s3://chucks.xyz
```
Here my bucket name will be `chucks.xy`

Copy a file from you local machine to the bucket  
```
$ aws s3 cp folder/filename.txt s3://chucks.xyz
```  

__Other Support Resources__  
* [AWS community forums](https://forums.aws.amazon.com/)
* [AWS Documentation](https://docs.aws.amazon.com/)  
* [AWS Well-Architected page](https://aws.amazon.com/architecture/well-architected)  

List of AWS Regions and endpoints Page[47]
Exercise Page[52]  
Review Question Page[53]  
Answer Page[356]

## Chapter 2: Amazon Elastic Compute Cloud and Amazon Elastic Block Store  
__EC2 Amazon Machine Images__   
A particular AMI will be available in only a single region - although there will often be images with identical functionality in all regions. Keep this in mind as you plan your deployments: invoking the ID of an AMI in one region while working from within a different region will fail.    

__Instance Types__  
See table 2.1 page[58] for EC2 instance type family and their top level designation.  
See [AWS Instance types](https://aws.amazon.com/ec2/instance-types/) for the most recent collection  

__Note__: T2s are burstable, which means you can accumulate CPU credits when your instance is underutilized that can be applied during high-demand periods in the form of higher CPU performance.  

__Configuring an Environment for Your Instance__  
Here there are three primary details to get right: geographic region, virtual private cloud (VPC), and tenancy model.   

__AWS Regions__  
EC2 resources can be managed only when you're "located within" their region. you set the active region in the console through the drop-down menu at the top of the page and through default configuration values in the AWS CLI or your SDK. You can update your CLI configuration by running `aws configure`.   
Bear in mind that the costs and even functionality of service and features might vary between regions. It's always a good idea to consult the most up-to-date official documentation.  

__Virtual Private Cloud (VPCs)__    
VPCs are AWS network organizers and great tool to organize your infrastructure. You might want to create a new VPC for each ne of your projects or project stages. e.g VPC-Testing, VPC-Staging and VPC-Production.

__Tenancy__  
The dedicated Host option allows you to actually identify and control the physical server you've been assigned to meet more restrictive licensing or regulatory requirements.   

__To Login to an EC2 instance using SSH__    
If you go to the EC2 management console, you click the `Instances` link on the left navigation bar to see your list of instances. Check the box beside the instance you want to connect to and drop down the __Action__ selector, then select _Connect_ and then click on the __SSH client__ tab to find instruction on how to connect.  

The will be instructed to make your key not publicly viewable by running the command.  
```
$ chmod 400 my-key-file.pem
```
The command to connect using SSH should look like this:
```
$ ssh -i my-key-file.pem my-user@ec2-xx-xxx-xx-xxx.eu-west-2.compute.amazonaws.com
```     
__Instance Pricing__  
It will often make sense to combine multiple models within a single application infrastructure. An online store might, for instance, purchase one or two instances to cover its normal customer demand but also allow autoscaling to automatically launch on-demand instances during periods of unusually high demand.

__Instance Lifecycle__  
A stopped instance that had been using a nonpersistent public IP address will most likely be assigned a different address when it's restarted. If you need a predictable IP address that can survive restart, allocate an Elastic IP address and associate it with your instance.  

__Resource Tags__  
The best way to keep track of your resources when they become many is by establishing a consistent naming convention and applying it to tags. For example, the key of the tag may represent the resource's environment and the value will then represent what the resource is. Like this:

| Key               | Value           |
|-------------------|-----------------|
| production-server | server 1        |
| production-server | server 2        |  
| production-server | security-group1 |
| staging-server    | server 1        |
| staging-server    | security-group1 |

__Service Limits__   
For example you're allowed only five VPCs per region and 5,000 key pairs across your account.  
You can find up-to-date details regarding the limits of all AWS services at [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).  

__Elastic Block Store Volumes__   
The AWS SLA guarantees the reliability of the data you store on its EBS volumes with a promise of at least 99.999 percent availability.  
There are currently four EBS volume types, two using solid-state-drive (SSD) technologies and tow using the older spinning hard drives (HDDs).  Performance is measured in IOPS.   

__EBS-Provisioned IOPS SSD__  
Provisioned IOPS which in some contexts is referred to as EBS Optimized may provide a maximum IOPS/volume of 32,000 and maximum throughput/volume of 500MB/s. It can cost $0.125/GB/month in addition to $0.065/provisioned IOPS.  

__EBS General-Purpose SSD__   
A general purpose SSD can get to a maximum of 10,000 IOPS/volume costing $0.10GB/month. A SSD used as a typical 8 GB boot drive for Linux instance would, at current rates, cost you $9.60/year.   

__Throughput-Optimized HDD__    
For throughput-intensive workloads including log processing and big data operations. These volume can deliver only 500 IPS/volume but with a 500 MB/s maximum throughput/volume at $0.045/GB/month


#### Accessing your EC2 Instance
You can create and then attach on or more virtual Elastic Network Interfaces to your instance. You can optionally assign a static IP address within the subnet range.  Also an instance can be assigned a public IP through which full Internet access is possible. There is not charge for elastic IPs.  

Run the following command in when logged into an instance  
```
$ curl http://169.254.169.254/latest/meta-data
```  
This will give you a list of phrases that you can then append to the command to lean more about that item. For example
```
$ curl http://169.254.169.254/latest/meta-data/instance-type
```

#### Securing Your EC2 Instance  
AWS provides four tools to help you manage access to you EC2 instances: _Security Groups_, _Identity and Access Management (IAM) roles_, _network address translation (NAT)_ and _key pairs_.  

__Security Groups__  
Security groups controls traffic at the instance level. However, AWS also provides you with network access control lists (NACLs) that are associated with entire subnets rather than individual instances.    

__IAM Roles__  
You can assign an IAM role to an EC2 instance so that processes running within it can access the external tools -- like an RDS database instance -- it needs to do its work.  

__NAT Devices__  
If you want your EC2 instance to be private (no public IP) but also provide a limited Internet access to it, you can do so by routing the traffic through a NAT instance or NAT gateway.  Both approaches will incur monthly charges.  The NAT gateway is a managed service which you do not need to maintain.  

__Key Pairs__  
Each key pair that AWS generates for your will remain installed within its original region and available for use with newly launched instances until you delete it. You should delete the AWS copy in the event your public key is lost or exposed.  

#### Other EC2-Releated Services  
__AWS Systems Manager__  
Use System manager to group and manager your AWS resources.    

__Placement Groups__    
Use placement groups for multiple EC2 instances to achieve low-latency network connectivity. You can use one of tow strategies:  
* _Cluster groups_ which associate instances within a single availability zone in close physical proximity  
* _Spread groups_ which separate instances across hardware to reduce risk of data lose when failure occurs.  

__AWS Elastic Beanstalk__  
Elastic Beanstalk lets you upload your application code, define a few parameter and AWS will configure, launch and maintain all the infrastructure required to keep it running. The charges are the same as running the individual services involved.   

__Amazon Elastic Container Service and AWS Fargate__  
Amazon Elastic Container Service (ECS) lets you launch a prebuilt Docket host instance and define the way you want your Docker containers to behave (called a task).  
The new _Fargate_ tool further abstracts the EC2 configuration process, removing the need for you to run and configure instances for your containers.  

__AWS Lambda__  
Lambda allow you to instantly perform almost any operation on demand at almost any time but without having to provision and pay for always-on servers.  

__VM Import/Export__   
VM Import/Export can make it much simpler to manage hybrid environment.    

__Elastic Load Balancing and Auto Scaling__  
Elastic Load Balancing (ELB) and Auto Scaling can be closely integrated with your EC2 infrastructure, making for simple and seamless operation.   

__Launching an EC2 instance__  
```
$ aws ec2 run-instances --image-id ami-xxxxxxxx --count 1 \
  --instance-type t2.micro --key-name MyKeyPair \
  --security-group-ids sg-xxxxxxxx --subnet-id subnet-xxxxxxxx \
  --user-data file://my_script.sh \
  --tag-specifications \
  'ResourceType=instance,Tags=[{Key=webserver,Value=production}]' \
  'ResourceType=volume,Tags=[{Key=cost-center,Value=cc123}]'
```

__Review Questions__   
Question on Page[76], Answer on Page[357]

## Chapter 3: Amazon Simple Storage Service and Amazon Glacier Storage  
#### S3 Service Architecture  
By default, you're allowed to create as many as 100 buckets for each of your AWS accounts. You can ask AWS to raise that limit.  
The URL to access a file called _filename_ in a bucket called _bucketname_ over http looks like this  `https://s3.amazonaws.com/bucketname/filename`.   
In AWS CLI file would be addressed as `s3://bucketname/filename`  

__Working with Large Objects__  
A single object may be no larger than 5TB. Individual uploads can be no larger than 5GB.   
AWS recommends that you use _Multipart Upload_ for object larger than 100MB to reduce the risk of data loss or aborted uploads. Object larger than 5GB _must_ use Multipart Upload.   


__Encryption__  
For non public data, use Amazon's encryption API endpoint for transfers. You can use either server-side or client-side encryption for data at rest.

__Server-Side Encryption__   
You can use one of three encryption options:  
* Server-Side Encryption with Amazon S3-Mnanged Keys (SSE-S3)
* Server-Side Encryption with AWS KMS-Managed Keys (SSE-KMS)
* Server-Side Encryption with Customer=Provided Keys (SSE-C)

__Client-Side Encryption__   
You can use AWS KMS-Managed Customer Master Key (CMK) or Client-Side Master Key which you provide through Amazon S3 encryption client.

__Durability__  
The high durability rates delivered by S3 are largely because they automatically replicate your data across at least three availability zones.  
Amazon S3 _One Zoned-Infrequent Access_ (S3 One Zone-IA) stores data in only a single availability zone.  
Reduced Redundancy Storage (RRS) is rated at only 99.99 percent durability, and it replicates it data across fewer servers than other classes.  

__Availability__  
Amazon S3 Standard class guarantees 99.99% availability per year. _S3 One Zone-IA_ has an availability of 99.5%.  

__Eventually Consistent Data__  
Expect a delay of two seconds or less for newly updated or deleted file to propagate across the system.  
S3 also provides read-after-write consistency for the creation (PUT) of new objects.    

__Lifecycle Management__  
You should be aware that there are minimum times (30 days, for instance) an object must remain within one class before it can be moved.  

__Access Control__  
As a rule, Amazon recommends applying S3 bucket policies or IAM policies instead of ACLs.  

__Presigned URLs__  
A presigned URL includes the required authentication string. To generate a presigned URL
```
$ aws s3 presign s3://MyBucketName/PrivateObject --expires-in 600
```  
This presigned URL will expire in 600s (10 Minutes).  

__Static Website Hosting__   
```
aws s3api put-bucket-acl --bucket my-bucket --acl public-read
aws s3 website s3://my-bucket/ --index-document index.html --error-document error.html
```

__S3 and Glacier Select__  
_SELECT_ lets you apply SQL-like queries to stored object so that only relevant data from within objects is retrieved. This can help to reduce cost of your requests.

#### Amazon Glacier
Glacier supports archives as large as 40TB rather than the 5TB limit in S3 and it archives are encrypted by default witch machine0generated IDs for key names.   
Glacier does offer Expedited retrieval in minute but at a premium cost.   
In Glacier we have `archive` instead on `object` in S3, `vaults` instead of `buckets` in S3.  Vault names do not have to be globally unique.  

Note that aside from storage cost, you will also be charges for operations including data retrievals: PUT, COPY, POST, or LIST requests and lifecycle transition requests.  

Use the AWS [Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html) to estimate monthly costs for different scenarios.   
See also [AWS Pricing Calculator](https://calculator.aws/) which seem to be the more recent tool for cost estimation as Simple Monthly Calculator will be deprecated soon.  

#### Other Storage-Related Services   
__Amazon Elastic File System__   
EFS provides automatically scalable and shared file storage. EFS-based files designed to be accessed from within a virtual private cloud (VPC) via Network File System (NFS).  

__AWS Storage Gateway__  
AWS Storage Gateway provides software gateway appliances (based on VMware ESXi, Microsoft Hyper-v, or EC2 images) with multiple virtual connectivity interface for you to backup your local data to the cloud as though it's a physical backup device.

__AWS Snowball__    
If you are looking to move terabyte or even petabytes-scaled data for backup or active use within AWS, ordering a Snowball device might be the best option. You copy your data to the physical 256-bit encrypted storage device and ship it back to Amazon where the data is then uploaded to your S3 bucket(s).  

#### AWS CLI Example
Create an S3 Bucket
```
$ aws s3 mb s3://my-bucket
```
Recursively copy files to the bucket  
```
$ aws s3 cp --recursive my-local-dir/ s3://my-bucket
```
Use the low-level s3api CLI to check the current lifecycle configuration  
```
$ aws s3api get-bucket-lifecycle-configuration --bucket my-bucket
```
This will throw and error if the lifecycle configuration has not be set before.  

First you must make sure that the `Prefix` which is referenced by the configuration is in the bucket. In this case our prefix is "sales-docs/" as seen in the JSON string below so you must have a file that reflects that prefix in your bucket.
Add a lifecycle configuration to the bucket  
```
$ aws s3api put-bucket-lifecycle-configuration --bucket my-bucket --lifecycle-configuration
'{
  "Rules": [
    {
      "Filter": {
        "Prefix": "sales-docs/"
      },
     "Status": "Enabled",
     "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 60,
          "StorageClass": "GLACIER"
        }
      ],
      "Expiration": {
        "Days": 100
      },
      "ID": "My Bucket Lifecycle Name."
    }
  ]
}
'
```  
Alternately, you can save the configuration into a JSON file (say _bucket-config.json_) and use the file as follows  
```
$ aws s3api put-bucket-lifecycle-configuration --bucket my-bucket --lifecycle-configuration file://relative/path/to/bucket-config.json
```
Check the newly configure lifecycle policy  
```
$ aws s3api get-bucket-lifecycle-configuration --bucket my-bucket  
```

__Review Questions__  
Question Page[96], Answer Page[359]  

## Chapter 4: Amazon Virtual Private Cloud  
#### Introduction   
Amazon's Virtual Private Cloud service provides the networking layer of EC2. A VPC is a virtual network that can contain EC2 instances as well as network resources for other AWS services.  

#### VPC CIDR (Classless Interdomain Routing) Blocks
You must assign a primary CIDR block when creating a VPC.   
Although you can specify any valid IP range for your VPC CIDR, it's best to use one in the RFC 1918 range to avoid conflicts with public internet addresses.   
* 10.0.0.0–10.255.255.255 (10.0.0.0/8)
* 172.16.0.0–172.31.255.255 (172.16.0.0/12)
* 192.168.0.0–192.168.255.255 (192.168.0.0/16)  
Be sure that the VPC CIDR you choose doesn't overlap with addresses already in use in your other network on-premise or on cloud.

You can't change the primary CIDR block, so think carefully about your address requirements before creating a VPC.  
