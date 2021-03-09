# Amazon EC2 Cookbook  (2015)
__By  Sekhar Reddy and Autobindo Sarkar__  

## Chapter 1: Selecting and Configuring Amazon EC2 Instances  
__Choosing the right AWS EC2 instance types__  
If you require higher storage performance, then ensure that the EC2 instance type you choose supports SSD.  
There are three distinct purchasing options available for provisioning the AWS EC2 instances:  
* __On-demand instances__: These instances are billed on an hourly basis and no upfront payment are required. This is the default purchasing option in AWS. It is suitable for unpredictable workloads or short-duration requirements.  
* __Spot instances__: The provisioning is done through a bidding process. There are no upfront costs. It is cheaper than the on-demand instances and suited for low compute applications.  
* __Reserved instances__: They are about 50-60% cheaper than on-demand instances. Available for 1-3 year plans and suited for workload that require instances for long duration.

See [EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/) for descriptions and typical use cases for each EC2 instance type.  

On AWS, there are two types of tenancy, _dedicated_ and _shared_. Tenancy can be configured at the instance level or at the VPC level. Once the option is selected, changing the tenancy type (instance or VPC level) is not allowed.    

Amazon EBS-optimized instances deliver dedicated throughput to Amazon EBS, with options ranging between 500 Mbps and 2,000 Mbps ( depending on the instance type selected). EBS OptimizedEC2 instances also allocated dedicated bandwidth to its attached volumes.  

When we use an EBS-backed instance, we have the option of using either the instance's storage device or the root device which is the EBS instance. The instance size may be changes subsequently or stopped to stop billing but any data store in the instance's storage will be lost.  The associated EBS instance on the other hand cannot have it's size changed or stopped but can only be terminated.

__Getting access key ID and secret access key__  
Instead of generating these credentials from the root account, it's always best practice to use IAM users. To generate AWS credential:  
1. Login to the AWS management console.
2. Click on your account name and then click __My Security Credentials__  
3. Click on the `Create Access Key` button to generate your access key.  
4. Download the `.csv` key file and keep it in a safe place.

See page[22] for instruction on how to install AWS CLI on Linux, Windows and Mac.

After installing AWS CLI try the command:  
```
$ aws ec2 describe-regions  
```
This will list the regions available in AWS.

__Launching EC2 instances using EC2-Classic and EC2-VPC__  
If you attach an EIP (Elastic IP) to EC2-Classic instance, it will get dissociated when you stop the instance. But for VPC EC2 instance, it remains associated even after you stop it. We can create subnets, routing tables, and Internet gateways in VPC.  

1. Go to EC2 Management console and click on the `AMI` link under __Images__ on the left navigation bar.  
2. Copy the image ID of your choice image.  
3.

This does not work - InvalidGroup, Security group sg-0240a63b2aa3b8b42 does not exits 
```
$ aws ec2 run-instances --image-id ami-0c84a8adbf86b25cd --count 1 --instance-type t2.micro --key-name ChucksKeyName --security-group-ids sg-0240a63b2aa3b8b42
```
