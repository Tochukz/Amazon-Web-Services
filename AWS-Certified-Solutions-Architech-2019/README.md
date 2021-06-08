# AWS Certified Solutions Architech Official Study Guide  (2019)
Assessment Test Page [27], Answers to Assessment Page [33]

## Chapter 1: Introduction to Cloud Computing and AWS  
#### Cloud Computing Optimization
__Scalability__  
AWS offers its autoscaling service through which you define a machine image that can be instantly and automatically replicated and launched into multiple instances to meet demand.  
__Elasticity__  
An elastic infrastructure will automatically reduce capacity when demand drops.  

__Cost Management__  
Cloud computing transitions your IT spending from capital expenditure(capex) framework into something closer to operational expenditure(opex).  See [AWS Calculator](https://calculator.aws/) to estimate the cost of your architecture.  

#### AWS Platform Architecture  
It is important to always be conscious of the particular region you have selected when you launch new AWS resources, as pricing and service availability can vary from one to next.    
Endpoint addresses are used to access your AWS resources remotely from within application code or scripts. Prefixes like _ec2_, _apigateway_ or _cloudformation_ are often added to the endpoint to specify a particular AWS service e.g _cloudformation.us-east-2.amazonaws.com_. See [full list](https://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region) of endpoints.  

A VPC is effectively a network address space within which you can create network subnets and associate then with particular availability zones. When configures properly, this architecture can provide effective resource isolation and durable replication.  

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
Here my bucket name will be `chucks.xyz`

Copy a file from you local machine to the bucket  
```
$ aws s3 cp folder/filename.txt s3://chucks.xyz
```  

__Other Support Resources__  
* [AWS community forums](https://forums.aws.amazon.com/)
* [AWS Documentation](https://docs.aws.amazon.com/)  
* [AWS Well-Architected page](https://aws.amazon.com/architecture/well-architected)  

__Reference__
List of AWS Regions and endpoints Page[47]  
Exercise Page[52]  

__Review Questions__
Questions Page[53]  
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
EC2 resources can be managed only when you're "located within" their region. You set the active region in the console through the drop-down menu at the top of the page or through default configuration values for the AWS CLI/SDK. You can update your CLI configuration by running `aws configure`.   
Bear in mind that the costs and even functionality of service and features might vary between regions. It's always a good idea to consult the most up-to-date official documentation.  

__Virtual Private Cloud (VPCs)__    
VPCs are AWS network organizers and great tool to organize your infrastructure. You might want to create a new VPC for each one of your projects or project stages. e.g VPC-Testing, VPC-Staging and VPC-Production.

__Tenancy__  
The dedicated Host option allows you to actually identify and control the physical server you've been assigned to meet more restrictive licensing or regulatory requirements.   

__To Login to an EC2 instance using SSH__    
If you go to the EC2 management console, you click the `Instances` link on the left navigation bar to see your list of instances. Check the box beside the instance you want to connect to and drop down the __Action__ selector, then select _Connect_ and then click on the __SSH client__ tab to find instruction on how to connect.  

You will be instructed to make your key not publicly viewable by running the command.  
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
A stopped instance that had been using a non-persistent public IP address will most likely be assigned a different address when it's restarted. If you need a predictable IP address that can survive restart, allocate an Elastic IP address and associate it with your instance.  

__Resource Tags__  
The best way to keep track of your resources when they become many is by establishing a consistent naming convention and applying it to tags. For example, the key of the tag may represent the resource's environment and the value will then represent what the resource is. For example:

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
There are currently four EBS volume types, two using solid-state-drive (SSD) technologies and two using the older spinning hard drives (HDDs).  Performance is measured in IOPS.   

__EBS-Provisioned IOPS SSD__  
Provisioned IOPS which in some contexts is referred to as EBS Optimized may provide a maximum IOPS/volume of 32,000 and maximum throughput/volume of 500MB/s. It can cost $0.125/GB/month in addition to $0.065/provisioned IOPS.  

__EBS General-Purpose SSD__   
A general purpose SSD can get to a maximum of 10,000 IOPS/volume costing $0.10GB/month. A SSD used as a typical 8 GB boot drive for Linux instance would, at current rates, cost you $9.60/year.   

__Throughput-Optimized HDD__    
For throughput-intensive workloads including log processing and big data operations. These volume can deliver only 500 IOPS/volume but with a 500 MB/s maximum throughput/volume at $0.045/GB/month


#### Accessing your EC2 Instance
You can create and then attach one or more virtual Elastic Network Interfaces to your instance. You can optionally assign a static IP address within the subnet range.  Also an instance can be assigned a public IP through which full Internet access is possible. There is no charge for elastic IPs.  

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
Use placement groups for multiple EC2 instances to achieve low-latency network connectivity. You can use one of two strategies:  
* _Cluster groups_ which associate instances within a single availability zone in close physical proximity  
* _Spread groups_ which separate instances across hardware to reduce risk of data lose when failure occurs.  

__AWS Elastic Beanstalk__  
Elastic Beanstalk lets you upload your application code, define a few parameter and AWS will configure, launch and maintain all the infrastructure required to keep it running. The charges are the same as running the individual services involved.   

__Amazon Elastic Container Service and AWS Fargate__  
Amazon Elastic Container Service (ECS) lets you launch a prebuilt Docker host instance and define the way you want your Docker containers to behave (called a task).  
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
The CIDR block determines which IP address may be assigned to instances and other resources within the VPC.
You must assign a primary CIDR block when creating a VPC.   
Although you can specify any valid IP range for your VPC CIDR, it's best to use one in the RFC 1918 range to avoid conflicts with public internet addresses.   
* 10.0.0.0–10.255.255.255 (10.0.0.0/8)
* 172.16.0.0–172.31.255.255 (172.16.0.0/12)
* 192.168.0.0–192.168.255.255 (192.168.0.0/16)  
Be sure that the VPC CIDR you choose doesn't overlap with addresses already in use in your other network on-premise or in the cloud.

You can't change the primary CIDR block, so think carefully about your address requirements before creating a VPC.  

__Secondary CIDR Bocks__  
If you need a secondary CIDR you must chose a block that does not overlap with the primary or other secondary blocks. For example, if your VPC's primary CIDR is 72.16.0.0/16, you may specify a secondary CIDR of 172.17.0.0/16. Be careful about your choice of primary CIDR. If you choose 192.169.0.0/16 as your primary CIDR, your won't be able to create a secondary CIDR using any of the RFC 1918 ranges.  

__IPv6 CIDR Blocks__  
Unlike primary CIDR, you can't choose your own IPv6 CIDR. AWS assigns one to your VPC at your request. The prefix length of an IPv6 VPC CIDR is always /56 for example, 2600:1f18:2551:8900/56 .  

__Subnets__  
A subnet is a logical container within a VPC that holds your EC2 instances.  For example, you can create one subnet for public web servers that is accessible over the Internet and create another subnet for database servers that only the web instances can access.   
You cannot move and instance from one subnet to another.  

__Subnet CIDR Blocks__  
The CIDR lock your subnet must be a subset of the VPC CIDR that it resides in.  For example, if your VPC has CIDR of 172.0.0/16, one of your subnets may have a CIDR of 172.16.100.0/24.   
AWS reserves the first four and last IP addresses in every subnet. You can't assign these addresses to any instances.  
commonly, each subnet's prefix length will be longer than the VPC's to allow for multiple  subnets to exist in the same VPC.  

__To Creating a VPC using the Management Console__  
* Go to the VPC section  of the management console  
* Click on the  `VPC Dashboard` on the Navigation menu if you are not already on the dashboard page.  
* Click the `Launch VPC Wizard` button.  
* Select the `VPC with a Single Public Subnet` block and click the `Select` button
* You may use the default values and just change the `VPC name` and `Subnet name`.
* Click the `Create VPC` button and wait a few seconds for the VPC to be created.  

__To create a Second Subnet in the VPC__    
* Click on the `Subnets` menu on the Navigation bar  
* Click the `Create Subnet` button, Select the VPC under which you want to create the subnet
* Enter a name for your subnet and an IPv4 CIDR e.g  `10.0.1.0/24`
* You may want to select an `Availability Zone` that is different from the availability one of your first subnet.  
* Click the create subnet button  and wait a few second.     

Learn more [how to create VPC](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/gsg_create_vpc.html)

__To Create A VPC using the CLI__  
```
$ aws ec2 create-vpc—cidr-block 172.16.0.0/16
```  
__To Create A Subnet using the CLI__  
```
$ aws ec2 create-subnet-vpc-id [VPC resource ID] --cidr-block 172.16.100.0/24
--availability-zone us-east-1a
```

__Availability Zones__   
You can achieve resiliency for your applications by creating two subnets in different availability zones and then spreading your instances across those zones. You can redirect traffic from a failed instance to a working instance by detaching the ENIN from the failed instance and reattaching it to the working instance.  

#### Elastic Network Interfaces (ENI)
ENI performs the same basic functions as a network interface on a physical server, although ENIs have more restrictions on how you can configure them.  Every instance must have a _primary network interface_ (also known as _primary ENI_), which is connected to only one subnet. You cannot remove the primary ENI from an instance.  

__Primary and Secondary Private IP Addresses__    
Each instance have a _primary private IP address_ that is bound to the primary ENI of the instance. You can also assign a secondary IP address but you can not change the primary IP address.  
You can attached additional ENIs to an instance but they must be in the same availability zone as the instance.  
Addresses associated with an ENI must come from the subnet to which it is attached.  

__Attaching Elastic Network Interfaces__   
You can create ab ENI in one subnet and then attach it to an instance as the primary ENI when you launch the instance. If you disable the Delete on Termination attribute of the ENI, you can terminate the instance without deleting the ENI. You can then associate the ENU with another instance.  

__To Create an ENI in a subnet__  
* Go to the EC2 management console
* Click on the `Network Interfaces` link under the `Network and Security` section of the navigation bar.  
* Click the `Create Network Interface` button  
* Enter a description, select a subnet, use `Auto-assign` or `Custom` IPv4
* Click the `Create Network interface` button.  

You can inspect you network interfaces using AWS CLI
```
$ aws ec2 describe-network-interfaces
```

__To launch an instance into a subnet and attach the ENI to the instance__  
* Go to the EC2 console and lick the `Lunch Instance` button
* When you get to the `Configure Instance` step (Step 3),
* Under the network selection choose your VPC
* Under Subnet choose the subnet under which you created the ENI  
* At the `Network interfaces` section, select your network interface to be attached.  
* Configure other options as necessary and launch the instance.  

#### Internet Gateways  
You can create an Internet gateway and associate it with a VPC manually. This will give you instances a public IP address.  An Internet gateway doesn't have a management IP address or network interface, instead, AWS identifies an Internet gateway by its resource IP, which begins with `igw-`.   
To use an Internet gateway, you must create a `default router` in a `route table` that points to the Internet gateway as a target.  

#### Route Tables  
Each route table consists of on or more routes and at least one subnet association.  
When you create a VPC, AWS automatically creates a default route table called the _main route table_ and associated it with every subnet in that VPC.  You can use the main route table or create a custom one that you can manually associate with one or more subnets.  
If you do not explicitly associate a subnet with a route table you've created, AWS will implicitly associate it with the main route table. A subnet cannot exists without a route table association.  

__Routes__  
The local route is the only mandatory route that exists in every route table.  It's what allows communication between instances in the same VPC.  

__The Default Route__  
To enable Internet access for your instance, you must create a default route pointing to the Internet gateway. Any subnet that is associated with a route table containing a default route pointing to an Internet gateway is called a _public subnet_. A _private subnet_ does not have a default route.  

__To create an Internet Gateway and Default Route__    
* Go to the VPC management console and click on the `Internet Gateway` link on the navigation bar  
* Click the `Create internet gateway`  button  
* Enter a tag name and click `Create internet gateway`  
* Go back to your list of internet gateways and selected your newly created internet gateway  
* Click on `Action` > `Attach to VPC`
* Select your VPC and click `Attach internet gateway`  

__To create a default route in the route table__  
* Go to the VPC management console and click `Route Tables` on the navigation bar  
* Select the route table that is Main and have the relevant VPC ID
* Click on Action > Edit routes  
* Click the `Add route` button
* Enter `0.0.0.0/0` for the `Destination` and select `Internet Gateway` for the `Target`
* Click the `Save routes` button  

#### Security Groups  
Every ENI must have at least one security group associated with it. When an instance has multiple ENI, take care to note whether those ENIs use different security groups.  

#### Network Access Control Lists  (NACL)
Instead of being attached to an ENI (as is Security groups), a NACL is attached to a subnet. This means that NACLs can't be used to control traffic between instances in the same subnet like you can do with security groups.  
You can associate the same NACL with multiple subnets, provided those subnets are all in the same VPC as the NACL.  Unlike a security group, a NACL is stateless which means it wont't automatically allow return traffic. Therefor if you permit HTTPS traffic with an inbound rule, you must also explicitly permit the return traffic using an outbound rule.

__Inbound Rules__  
NACL rules are processed in ascending order of the rule number.  You can't delete or otherwise change the default rule.


__To create a NACL rule to allow remote access from any IP address___  
* On the VPC management console click the `Network ACLs` link under `Security` on the navigation bar  
* Click the `Create network ACL` button  
* Enter a name for your ACL, select your VPC and click the `Create network ACL` button
* Go back to the `Network ACLs` list and select your newly created ACL  
* Click `Action` > `Edit inbound rules`  
* Add a new rule and click the `Save changes` button  

__Outbound Rules__  
_Ehpermeral ports_ are reserved TCP or UDP ports that clients listen for reply traffic on. As an example, when a client sends an HTTPS request to your instance over TCP  port 80, that client may listen for reply on TCP port 36034. Your NACL's outbound rules must allow traffic to egress the subnet on TCP port 36034.    
To maintain compatibility, do not restrict outbound traffic using a NACL. Use a security group instead.  

#### Public IP Addresses  
Even if you don't plan to stop your instance, keep in mind that AWS may perform maintenance events that cause your instance to restart. If this happens, its public IP address will change.  

#### Elastic IP Addresses (EIP)
Once your request for an EIP and AWS allocates it to your account, you have exclusive use of that address until you manually release it.  When an EIP is allocated to you, initially it is not bound to any instance. Instead, you must associate it with an ENI. You can associated it with only one ENI at a time.

__To allocate and Use an Elastic IP Address__   
* Go to the VPC management console and click on the `Elastic IPs` link on the navigation bar.
* Click the `Allocate Elastic IP address` button  
* Click the `Allocate` button
* Go back to the list of `Elastic IP addresses` and select your newly created EIP
* Go to `Action` > `Associate Elastic IP address`
* Select either `instance` or `Network interface` for the `Resource type`
* Select your desired instance or network interface.  
* Click the `Associate` button

#### Network Address Translation   
When you associate an ENI with a public IP address, the ENI maintains its private IP address.  Network address translation occurs automatically at the Internet gateway when an instance has a public IP address. NAT is also sometimes called _one-to-one NAT_ because one private IP address gets mapped to one public address.  

#### Network Address Translation Devices  
Network address translation occurs at the Internet gateway. Also there are two other resources that can also perform NAT.  
* NAT gateway  
* NAT instance  
Multiple instances can use the same NAT device, thus sharing the same public IP address for outbound connections. The function that NAT devices perform is also called _port address translation_ (PAT).  

__Configuring Route Tables to Use NAT Devices__  
The NAT device and the instance that use it must use different default routes, they must use different route tables and hence reside in separate subnets.  
A route target must be a VPC resource such as instance, Internet gateway, or ENI.

__NAT Gateway__  
A NET gateway is a NAT device managed by AWS. It automatically scales to accommodate your bandwidth requirements. When you create a NET gateway, you must assign it an EIP and must reside only in one subnet which must be a public subnet for it to access the Internet.

__NAT Instance__  
Unlike a NET gateway, a NAT instance doesn't automatically scale to accommodate increased bandwidth requirements. Also, a NAT instance has an ENI, so you must apply a security group to it and a public IP address. An also disable the _source/destination check_ on the NAT instance's ENI.   
One advantage of a NAT instance is that you can use it as a _bastion host_ sometimes called a _jump host_ to connect to instances that don't have a public IP. You can't do this with a NET gateway.   

__VPC Peering__  
You can connect instances in one VPC to instances in another or even in a different region of belonging to another customer.  Peered VPCs must not have overlapping CIDR block.  
VPC peering connection allows only instance-to-instance communication. You can't use it to share Internet gateways or NAT devices. You can, however, use it to share a Network Load Balancer (NLB).
If you have more than two VPCs you need to connect, you must create a peering connection between each pair. This configuration is called transitive routing.   
To use a peering connection, you must create new routes in both VPCs to allow traffic to travel in both directions. The target of each route must be the peering connection's identifier, which begins with `pcx-`.  
Inter-region VPC peering is not available for some AWS regions. Peering connections between regions have a maximum transmission unit (MTU) of 1500 bytes and do not support IPv6.

__Review Question__  
Questions - Page[124] , Answers - Page[360]   

## Chapter 5:  Databases  
__Storing Data__    
You can use the `COPY` command to copy data from a properly formatted file into the table you specify.  

__Online Transaction Processing vs. Online Analytic Processing__   
Depending on its configuration, a relational database can fall into one of two categories: _online transaction processing_ (OLTP) or _online analytic processing_ (OLAP).  

__OLTP__   
OLTP databases are suited to applications that read and write data frequently, in the order of multiple times per second. Generally, a single server with ample memory and compute power handles all write to an OLTP database.

__OLAP__  
OLAP database are optimized for complex queries against large data sets. As a result, OLAP databases tend to have heavy compute and storage requirements. With a large OLAP database, it's common for multiple database servers to share computational load of complex queries. In a process called _partitioning_, each server gets a potion of the database for which it's responsible.  

#### Amazon Relational Database Service (RDS)  
To deploy a database using RDS, you start by configuring a database instance, which is an isolated database environment. A database instance exists in a virtual private cloud (VPC) that you specify, but unlike an EC2 instance, AWS fully manages database instances. You can't SSH into them, and they don't show up under your EC2 instances.  

__Database Engines__  
Each database instance runs only one database engine.  RDB offers the following six database engines:  
__MySQL__ MySQL offers tow storage engines - _MyISAM_ and _InnoDB_. You should use _innoDB_ as  it is the only one compatible with RDS-manageed automatic backups.  Version includes 5.5, 5.6 and 5.7.  
__MariaDB__ MariaDB supports the _XtraDB_ and _InnoDB_ storeage engines. You should use _InnoDB_ as recommended by AWS for maximum compatibility with RDS. Versions include 10.0.7 through 10.2.  
__Oracle__ RDS provides the editions SE, SE1, SE2, and EE  
__PostgreSQL__  RDS offers versions 9.3.12-R1 through 10.4-R1  
__Amazon Aurora__  Aurora is Amazon's drop-in binary replacement for MySQL or PostgreSQL depending on the edition you choose.  
__Microsoft SQL Server__ RDS offers version 2008 R2, 2012, 2014, 2016 and 2017. For edition you can choose Express, Web, Standard or Enterprise.

__Licensing Considerations__  
__License Included__ All version and editions of Microsoft SQL Server running on RDS include a license as do Oracle SE2 AND SE2.  
__Bring Your Own License__ Oracle Database editions EE, SE, SE1 and SE2 allow you to bring your license.  

__Database Option Groups__  
Options require more memory, so make sure your instances have amply memory and enable only the options you need.  

__Database Instance Classes__   
You can switch you instance to a different class if you want. There are three database instance classes:
__Standard__  
Tee latest-generation  instance class is `db.m4` , which provides up to
* 256 GB Memory
* 64 vCPU
* 25 Gbps network bandwidth
* 10, 000 Mbps (1,280 MBps) disk throughput  

__Memory Optimized__    
For database that have hefty performance requirements. The latest-generation instance class is `db.xle` and it provided up to:  
* 3,904 GB memory
* 128 vCPU
* 25 Gbps network bandwidth  
* 14,000 Mbps (1,750 MBps) disk throughput

Both standard and memory-optimized instance class types are ES-optimized.

__Burst Capable (Burstable)__  
For development and testing. The only burstable instance class available is `db.t2`, and gives you up to:
* 32 GB memory  
* 8 vCPU
* say, less than 1Gbps network bandwidth
* not more than 3,200 Mbps (400 MBps) disk throughput

__Storage__   
__Understanding Input/Output operations Per Second__  
The speed of your database storage is limited by the number of IOPS allocated to it. The amount of data you can transfer in a single I/O operation depends on the page size that the database engine uses.   
MySQL and MariaDB have a page size of 16KB. Hence, writing 16 KB of data to disk would constitute one I/O operation. Oracle, PostgreSQL, and Microsoft SQL Server use a page size of 8KB. Writing 16KB of data using one of those database engines would consume tow I/O operations.  
__NB__: If your database engine write more than 32 KB in a single I/OM operation, WS counts that as two I/O operations.  

The number of IOPS you can achieve depends on the type of storage you select. RDS offers the following three different types of storage.   

__General-Purpose SSD (gp2)__  
You can allocate a volume of up to 16 TB. For each gigabyte of data that you allocate to a volume, RD allocates that volume a baseline performance of three IOPS, up to a total of 10,000 IOPS per volume.   
The minimum storage volume you can create depends on the database engine. For SQL Server Enterprise and Standard, it is 200 GB, and for all others, it is 20 GB.  

__To Create an RDS Database Instance from the Console__  
* Go to the RDS Management Console  
* Click the `Create Database` button
* Select a database creation method, Engine type, Edition, Capacity and Engine Version
* Select other options
* Click the `Create Database` button  

__To create an RDS database Instance using the CLI__  
```
$ aws rds create-db-instance --db-instance-identifier my_instance_identifier --db-instance-class db.t2.micro --engine mysql --allocated-storage 20 --storage-type gp2 --max-allocated-storage 1000 --master-username my_user --master-user-password my_pass --vpc-security-group-ids sg-xxxxxxxx
```  
If you want a database to be created after the instance is launched you can use the `--db-name` flag
The ` --master-username` and `--master-user-password` flags are options.

See [RDS command reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/index.html) for more.
__To Connect to RDB Instance__  
* Go to the RDS management console.
* Click and the `Databases` link on the navigation bar
* Click on the database instance name (under the `DB identifier` column)
* Copy the endpoint and take note of the port shown under the `Connectivity & security` tab
* Use the endpoint and port together with your user credential to connect to the database.

Alternatively, you can use the AWS CLI to view the details of your Database instances by running the command
```
$ aws rds describe-db-instances
```
From the output you can copy out the endpoint and port and also see the security group under the `VpcSecurityGroups`.

To connect from your local machine, make sure
* the database instance is publicly accessible. See `Public accessibility` under the security section
* the security group inbound rule allows traffic from your local machine
You can use your preferred database client to connect



__Provision IOPS SSD (io1)__    
_Provisioned IOPS SS_ lets you simply allocate the number of IOPS you need when you create your instance.  The number of IOPS you provision is what you get and what you pay for, whether you use it or not. You must specify IOPS in increments of 1,000.
The maximum number of IOPS you can achieve and how much storage you can allocated are constrained by the database engine you select.   
Oracle, PostgreSQL, MariaDB, MySQL and Aurora let you choose 100GB to 16TB of storage and allocated 1,000 to 10,000 provisioned IOPS.    
Microsoft SQL Server gives you up to 16TB of storage and lets you choose between 1,000 and 32,000 provisioned IOPS. The ratio of storage in gigabytes to IOPS must be at least 1:50.

__Magnetic Storage__  
RDS offers magnetic storage for backward compatibility with older instances. It is limited to maximum size of 4TB and 1,000 IOPS.

__Read Replicas__  
_Scaling verticaly_ also called _scaling up_ is done by upgrading one or more resources (memory, compute, network speed, disk throughput) of your database instance.  
_Scaling horizontally_, also known as _scaling out_ entails creating additional database instances called _read replicas_. All database engine except for Oracle and Microsoft SQL Server support read replicas. Aurora exclusively support a specific type of read replica called an _Aurora replica_.  Read replicas are usefu for read-heavy applications as they take some of the query load off of the _master database instance_ .   
You can have up to five read replicas and up to fifteen Aurora replicas. Read replicas are unsuitable for disaster recovery because of the delay in synchronization with the master.  
When you create a read replica, RDS gives  you a read-only endpoint which is a domain name that resolves only to your read replica.

__To Create a Read Replica__  
* Go to the RDS management console
* Click the radio button of the instance to select the instance
* Click `Action` > `Create read replica`
* The `Read replica source` should already be the name of the instances you are replicating
* Enter a name as an identifier under `DB instance identifier`
* Enter/select other DB options where applicable
* Click the `Create read replica` button

A read replica and the master may be in different availability zones, and even in different regions. In the event of the master instance failing, you can promote a read replica to the master. But keep in mind that because of the asynchronous nature of replication, you may lose data this way.  

__To promote a Read replica to a Master__   
* Go the RDS management console
* Click on the radio button beside the `Read replica` that you have created
* Click `Action` > `Promote`
* Click `Continue`
* Click `Promote Read Replica`  
Note that the promotion of a read replica is an irreversible process and it may take a few minutes to complete.

__High Availability (Multi-AZ)__   
You can deploy multiple database instances in different availability zones using `multi-AZ deployment`. In a multi-AZ deployment, you have a _primary database instance_ in one availability zone that handles read and writes to the database, and you have a _standby database instance_ in a different availability zone. If you are to enable `multi-AZ` on an existing instance, you should do it during a maintenance window.  


__Multi-AZ with Oracle, PostgreSQL, MariaDB, MySQL, and Microsoft SQL Server__    
In _multi-AZ_ deployment, all instances must reside in the same region. RDS synchronously replicated data from the primary to the standby instance. This replication can introduce some latency, so be sure to use EBS-optimized instances  and provisioned IOPS SSD storage.  The standby instance is not a read replica and cannot serve read traffic. When a failover occurs, RDS changes the DNS record of the endpoint from  the primary instance to the standby instance.  
For MySQL and MariaDB, you can create a multi-AZ read replica in different region. This lets you failover to a different region.    

__Multi-AZ with Amazon Aurora__   
In Amazon Aurora, the primary and replicas share a single cluster volume, which is synchronously replicated across three availability zones. If the primary fails a replica is promoted to primary or a new primary is created if no replica exists.  

__Backup and Recovery__  
You can take EBS volume snapshots of your database instances which is then stores in S3.  Snapshots are kept in multiple zines in the same region for redundancy. Be sure to take your snapshot during off-peak time because I/O operations may be suspended to a few seconds during the process unless you are using multi-AZ with Microsoft SQL Server DB engine.    
The _recovery time objective_ (RTO) is the maximum acceptable time to recover data and resume processing after fa failure.  
The _recovery point objective_ (RPO) is the maximum period of acceptable data loss. Consider your RTO and RPO requirements when choosing your RDS backup options.  
Snapshot restore is done to a new instance and may take several minutes depending on its size. It can be made faster with more provisioned IOPS allocated to your instance.  

__Automated Snapshots__  
Taking snapshots impact performance, so you should choose a time when you database is least busy. Enabling automatic backup enable _point-in-time recovery_ which archives database logs to S3 every 5 minutes. Restoring to a point-in-time can take hours, depending on how much data us in the transaction logs.  
RDS keeps automated snapshots for a limited period of time and then deletes them. You can choose a retention period between 1 day and 35 days.

__Maintenance Items__  
You can specify a 30-minutes weekly maintenance window for RDS. The window cannot overlap with the backup window. Even though the maintenance window is 30 minutes, it's possible for tasks to run beyond this.  

#### Amazon Redshift
_Redshift_ is a managed data warehouse solution designed for OLAP databases. It is based on PostgreSQL and it is not part of RDS. Redshift uses the _columnar storage_.  

__Compute Nodes__  
Redshift cluster _compute nodes_ are divided into tow categories. _Dense compute_ nodes can store up to 325 TB of data on magnetic storage. _Dense storage_ nodes can store up to 2 PB of data on fast SSDs.  

#### Non-relational (No-SQL) Databases  
__DynamoDB__
DynamoDB is a managed nonrelational database service that can handle thousands of read and write per second. I achieves this level of performance by spreading your data across multiple _partitions_. A partition is an allocation of storage for table, and it's backed by solid -state drives in multiple availability zones.   

__Partition and Hash Keys__  
There are two types of primary keys you can create:  _partition key_ and _composite key_.    
A _partition key_ also know as _hash key_ is a primary key that contains a single value.  When you use only a partition key as a primary key, it's called a _simple primary key_. A partition key can store no more than 2,048 B. This partition key is unique.
A _composite key_ is a primary key that is a combination of tow values: a partition key and a _sort_ (or _range_) _key_. This partition key doesn't have to be unique, but the combination must be unique.

__Attributes and Items__    
DynamoDB can store an item size of up to 400 KB, which is roughly equivalent to 50,000 English words.  
DynamoDB trims leading and trailing zeros.   
Data types fall into the following three categories:
* __Scalar__: _string_, _number_, _binary_, _boolean_, _null_
* __Set__: unique _unordered list_ of scalar values
* __Document__: holds different types. Document types include: _list_ and _map_.

__Throughput Capacity__  
The _provisioned throughput_ is the number of reads and write per second you application will require. DynamoDB reserves partitions based on the number of _read capacity units_ (RCUs) and _write capacity units_ you specify when creating a table.   
Whether you use _strongly consistent_ or _eventually consistent_ reads depends on whether your application can tolerate reading stale data.   
For calculations, take note of the following relationships:  
* For an item of 4KB in size, 1 RCU buys you 1 strongly consistent read per second
* For an item of 4KB, one RCU buys you 2 eventually consistent reads per second.  
* For an item of size 1KB,  1 WCU give you one write per second  

The throughput capacity you specify is an upper limit of what DynamoDB delivers. If you exceed your capacity, DynamoDB may throttle your request and yield an HTTP 400 (Bad request) error. AWS SDKs have built-in logic to retry throttled request.

__To Create a Table in DynamoDB using the Console__  
* Go to the DynamoDB management console
* Click on the `Create Table`  button
* Enter a value for the `Table name` and `Primary key`
* Click the `Create` button

__To Create a Table in DynamoDB using the CLI__  
```
$ aws dynamodb create-table --table-name Categories --attribute-definitions AttributeName=categoryId,AttributeType=S AttributeName=categoryName,AttributeType=S --key-schema AttributeName=categoryId,KeyType=HASH AttributeName=categoryName,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
```
__To see all you tables__
```
$ aws dynamodb list-tables
```  
__To view details about a specific table__  
```
$ aws dynamodb describe-table --table-name Categories
```  

__Auto Scaling__
To configure Auto Scaling, you specify a minimum and maximum RCU and WCU. You also specify a desired utilization percentage. DynamoDB will automatically adjust your RCU and WCU to keep your utilization at this percentage.

__Reserved Capacity__  
For 100 or more WCU or RCU you can purchase reserved throughput capacity to save money. You can reserve RCU and WCU separately up to a maximum of 100,000 unit each. You pay a one-time fee and commit to 1-3years.  

__Reading Data__
Return...

__Secondary Indexes__  
Return...
__Global secondary Index__
Return...
__Local Secondary Index__  
Return...

__Review Question__  
Questions - Page[152], Answers = Page[362]

## Chapter 6: Authentication and Authorization - AWS Identity and Access Management    
#### Introduction   
IAM identities are sometimes described as _principals_. An identity represents an AWS user or a role. Roles are identities that can be temporarily assigned to an application, service, user or group.   
Identities can be federated, that is, users or applications without AWS accounts can be authenticated and given temporary access to AWS resources using an external service such as Kerberos, Microsoft Active Directory or the Lightweight Directory Access Protocol (LDAP).  
You can attached policies to either principal (identity-based policies) or resources (resource-based policies).  

#### IAM Identities  
AWS suggests that you protect your root account and delegate specific powers for day-to-day operations to other users.  
The Security Status checklist from IAM page:  
* Delete your root access keys  
* Activate MFA on your root account  
* Create individual IAM users
* Use groups to assign permissions  
* Apply an IAM password policy  

__IAM Policies__  
An IAM policy is a document that identifies one or more `actions` as they relate to one or more AWS `resources` and determines if the `effect` is either _Allow_ or _Deny_. For example, a given policy may _Allow_ the "creation of bucket" `action` within the S3 `resource`.
You can use IAM preset policies or create your own using the Crete policy page or manually using JSON. For example,
```
{
  "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "*",
        "Resource": "*"
      }
    ]
}
```
the identity that holds this policy will be _allowed_ to perform any `action` on any `resource` in your account.        
A single IAM policy can be associated with any number of identities, and a single identity can have as many as 10 managed policies (each no greater than 6,144 characters) attached to it.

__User and Root Accounts__  
The best ways to protect your root account is to lock it down by doing the following.
* Delete any access keys associated with root.
* Assign a long and complex password and store it in a secure password vault.
* Enable multifactor authentication (MFA) for the root account.  
* Wherever possible, don't use root to perform administration operations.
* Create a main admin user and grant it `AdministratorAccess` policy.

 The admin user may be able to do almost  everything but you will need the  root user  to perform some actions such as
 * to create or delete account-wide budgets
 * to enable MFA Delete on an S3 bucket.

On your IAM security Credential page, you can generate X.509 certificates to encrypt Simple Object Access Protocol (SOAP) requests to those AWS services that allow it.  SOAP requests to S3 and Amazon Mechanical Turk are an exception to this rule, as they use regular keys rather than X.509 certificate.

__Key Rotation__   
Key rotation is automated for IAM roles used by EC2 resources to access other AWS services.  But if your keys are designed for you own applications you have to manage your key rotation by yourself. To determine if you application is still using an old access key do:
```
$ aws iam get-access-key-last-used --access-key-id ABCDEFGHIJKLMNOP
```  
Key rotation can be enforced by including rotation in the password policy associated with your IAM user accounts.

__Create, Use and Delete an AWS Access Key__  
If you already configured an access key for AWS CLI, you can add another one in parallel by using the `--profile`  argument  
```
$ aws configure --profile account2
```
And then when you can invoke the profile when issue a command   
```
$ aws s3 ls --profile account2
```

__Groups__  
You can create a separate IAM group for each class of user and then associate each of your users with the group that fits their job description.  Say for example, one group for developers and another for admin.   

__Roles__    
An IAM role is a temporal identity that a user or service seeking access to your account resources can request. You can use it to give temporal access to another AWS account or uses who sign in using a federated authentication service. Am IAM role by default expires after 12 hours.     
To create a new role you must first select one of four _trusted entity_:
* AWS service (EC2, Lambda, etc)
* Another AWS account (identified by its account ID)
* Web Identity (Google, Facebook, Amazon, Amazon Cognito)
* SAML 2.0 federation (Security Assertion Markup Language)  

next, you give it permission y creating and attaching your policy document or one or more preset IAM policies.  When a trusted entity assumed it new role, AWS issues it a time-limited security token using the AWS Security Token Service (STS)  

#### Authentication Tools
The following tools are for user authentication:  
* Amazon Cognito
* AWS Managed Microsoft AD
* AWS Single Sign-On services  
For administration of encryption keys and authentication secrets, AWS have
* AWS Kay Management Service (KMS)
* AWS Secrets Manager
* AWS CloudHSM  

__Amazon Cognitor__  
Cognito provided mobile and web developers with two important functions
* Through Congito's _user pools_, you can add user sign-up and sign-in to your applications  
* Through Cognito's _identity pools_, you can give your application users temporary, controlled access to other services in your AWS account.   

__AWS Managed Microsoft AD__   
Managed Microsoft AD is actually accessed through the AWS Directory Service, as are a number of directory management tools like Amazon Cloud Directory and Cognito.  What the Directory Service tools all share in common is the ability to handle large stores of data and integrated them into AWS operations.

__AWS Single Sign-On__  
Single sign-on (SSO) allows you to provide users with streamlined authentication and authorization through n existing Microsoft Active Directory configures within AWS Directory Service. The service works across multiple AWS accounts within AWS Organizations. Companies with more than one AWS account can use AWS Organizations to unify and integrate the way their assets are exposed and consumed no matter how distributes they might be.  

__AWS Key Management Service__  
K,S deeply integrates with AWS services to create and manage your encryption keys.  The service lets you create, track, rotate, and delete the keys that you'll use to protect your data. For regulatory compliance purposed, KMS is integrated with AWS CloudTrail, which records all key-related events.  

__AWS Secrets Managehttps://dlslab.com/r__  
AWS Secrets Manager can be used to manage your third-party API keys.  The manager can automatically take care of credential rotation for you.  

__AWS CloudHSM__
CloudHSM (Hardware Security Module) launches virtual compute device cluster to perform cryptographic operations on behalf of your web server infrastructure. It off-loads the burden of generating, store and managing cryptographic keys from your web servers.   
You activate an HSM cluster by running the CloudHSM client as a daemon on each of your application hosts. The client is configures to fully encrypt communication with the HSM.  

#### AWS CLI Example   
To create a new user
```
$ aws iam create-user --user-name john
```  
To confirm that a user exists
```
$ aws iam get-user --user-name jacob
```
To attach a policy to a user, use must pass the policy's Amazon Resource Name (ARN) as follows:  
```
$ aws iam attach-user-policy ––policy-arn arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess \
––user-name maxwell
```  
To show the access keys associated with a user
```
$ aws iam list-access-keys --user-name john
```
To create a new access key
```
$ aws iam create-access-key  --user-name john
```
To delete an access key  
```
$ aws iam delete-access-key --user-name john --access-key-id ACCESSKEYID
```

#### Review Questions  
Questions Page[170], Answers Page [364]

## Chapter 7: CloudTrail, CloudWatch, and AWS Config  
#### Introduction
_CloudTrail_, _CloudWatch_, and _AWS Config_ are services that collectively help you keep an eye on your AWS environment by performing the following operational tasks:  
* Tracking Performance  
* Detecting Application Problems
* Detecting Security Problems
* Logging Events
* Maintaining an Inventory of AWS Resources  

They can be configured independently and they can also work together to provide a comprehensive monitoring solution for your AWS resources, application and even on-premise servers.  
* __CloudTrail__ keeps details of logs of every read/write action that occurs against your AWS resources  
* __CloudWatch__ collects numerical performance metrics from AWS and non-AWS resources such as on-premises servers.  
* __AWS Config__ tracks how your AWS resources are configures and how they change over time.

#### CloudTrail  
An event is a record of an action that a principal performs against an AWS resource. _CloudTrail_ logs both API and non-API actions. API events can be performed in the AWS management console, AWS CLI or SDK.  CloudTrail classifies events into _management events_ and _data events_.  

__Management Events__  
AWS also calls management events _control plane operations_. Management events are further grouped into _write-only_ and _read-only_ events. `RunInstances` API operation is a write-only event, and logging into the management console as the root or IAM user is also a write-only event. `DescribeInstance` is a read-only event.

__Data Events__  
Data events track two types of _data plane operations_ that tend to be high volume: S3 object-level activity and Lambda function executions. For S3 object-level operations, _CloudTrail_ distinguishes read-only and write-only events. `GetObject` is read-only event, `DeleteObject` and `PutObject` are write-only events.  

__Events History__  
By default, CloudTrail logs 90 days management events and stores them in a  database called _event history_. The event history does not include data events.  CloudTrail creates a separate event history for each region containing only the activities that occurred in that region. But events for global services such as IAM and Route 53 are included in the event history of every region.

__Tails__  
A trail is a configuration that records specified events and delivers them as CloudTrail log files to an S3 bucket of your choice. With trail, you can do the following:  
* Extends the 90 days event history
* Customize the types of events CloudTrail logs
* exclude specific services or actions
* include data events

For global services, the region is always us-east-1.  

__Creating a Trail__
You can choose to log events from a single region or all regions. You can create up to five trails for a single region.  After creating a trail, it can take up to 15 minutes between the time CloudTrail logs an event and the time it writes a log file to the S3 bucket.

__To Create a Trail__  
* Go the the CloudTrail Management Console  
* Click on the `Dashboard` link on the left navigation bar
* Click the `Create trail` button
* Enter the Trail name and a Bucket name and click `Next`
* Select `Management events` under `Event type`
* Select `Write` under `API activity` and Click `Next`
* Review your chosen options and click `Create trail`  

If you create a trail using the Web console and log management events, the trail will automatically log global service events also. To avoid duplicates global service event in all your trails you can disable logging global service events on an existing trail using the AWS CLI command  
```
$ aws cloudtrail update-trail --name mytrail --no-include-global-service-events
```
Alternately, if a trail is configured to log to all regions and you reconfigure it to log only to a single region, CloudTrail will disable global event logging for that trail.

__To create a trail using the CLI__  
```
$ aws cloudtrail create-trail --name my-second-trail --s3-bucket-name tochukwu.xyz-mwo-trail-bucket --no-include-global-service-events
```
The bucket's bucket policy muse be configured to allow cloud trail to read and write objects to the bucket.  
Todo: Learn the bucket policy and more bucket policy.

__To Activate the new Trail__  
```
$ aws cloudtrail start-logging --name my-second-trail
```
__To see all your trails__  
```
$ aws cloudtrail describe-trails
```  
You are limited to selecting a total of 250 individual object per trail, including Lambda functions and S3 buckets and prefixes.   

__Note__ Don't log data events on the bucket which is storing your CloudTrail logs. Doing so would create an infinite loop.  

__Log File Integrity Validation__   
CloudTrail provides a means to ensure that no log file were modified or deleted after creation.
With log file integrity validation enabled, every time CloudTrail delivers a log file to the S3 bucket, it calculates a cryptographic hash of the file which makes it easy to detech when a file has been modified.    
Every hour, CloudTrail creates a separate file called a `digest file` that contains the cryptographic hashes of all log files delivered within the last hour and signs the _digest file_ using a private key that varies by region and places the signature in the file's S3 object metadata.  

__To validate all log file__  
```
$ aws cloudtrail validate-logs --trail-arn arn:aws:cloudtrail:eu-west-2:123456789012:trail/my-second-trail --start-time 2021-04-19T00:00:00Z
```

#### CloudWatch  
CloudWatch functions a s a metric repository that lets you collect, retrieve, and graph numeric performance metrics from AWS and non-AWS resources. All AWS resources automatically send their metrics to CloudWatch. Optionally you can send custom metrics to CloudWatch from your applcations and on-premise servers.

__CloudWatch Metrics__  
CloudWatch organizes metrics into _namespaces_. Metrics from AWS services are stored in AWS namespaces and use the format AWS/service to allow for easy classification of metrics. For example, AWS/EC2 or AWS/S3.  You can create custom namespaces for custom metrics. Metrics exists only in the region which they were created.    
A metric functions as a variable and contains a time-ordered set of _data points_. Each data point contains a timestamp, a value, and optionally a unit of measure.  Each metric is uniquely defined by a namespace, a name, and optionally a _dimension_. A dimension is a name-value pair.

__Basic and Detailed Monitoring__  
Most services support basic monitoring and some support _basic monitoring_ and _detailed monitoring_.  Basic monitoring send metrics to CloudWatch every five minutes. Detailed monitoring publishes metric to CloudWatch every minute.

__Regular and High-Resolution Metrics__  
