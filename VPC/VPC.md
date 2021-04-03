# Amazon Virtual Private Cloud   
### Virtual Private Cloud
__VPC Structure__  
* A VPC resides in a region. It can not span 2 or more regions.  
* You may have one or more VPC in a given region
* A VPC can contain one or more subnets  
* The default Amazon VPC contain one public subnet in every Availability Zone within the region with netmask of /20/
* You must assign an IP range also know as CIDR block to your VPC
* Your IP range must not overlap with the IP range of any network you intent to connect with your VPC.
* Every VPC has an implicit router and comes with an automatic route table that you can modify


#### Subnet
__Subnet structure__
* A subnet is a segment of a VPC
* A subnet resided in an availability zone. It can not span 2 or mote availability zone  
* A subnet may contain one or more EC2 instances
* A subnet must be associated with a route table. If you don't explicitly associate a subnet with a route table, the subnet uses the main route table.  
* The internal IP address range of all subnet types(private or otherwise) is always private (that is, non-routable on the Internet).

__Types of Subnets__  
__Public Subnet__: A public subnet is one in which the associated route table directs the subnet's traffic to the Amazon VPC's IGW.  
__Private Subnet__: A private subnet is one in which the associated route table does not direct the subnet's traffic to the Amazon VPC's IGW.   
__VPC-only__: A VPC-only subnet is one in which the associated route table directs the subnet's traffic to the Amazon VPC's VPG and does not have a route to the IGW.

#### Route Tables  
__Route Table Structure__  
* A route table resides in a VPC
* You can create additional route tables for your VPC
* A route table has rules called routes
* The rules (routes) are applied to subnets and used to determine where traffic is directed.
* The rules (routes) facilitates communication between EC2 instances on different subnets  
* Each route table contains a default route (local route) that enable communication within the Amazon VPC. The default route cannot be modified or removed  
* You may add route to direct traffic to the IGW, VPG or the  NAT instance.
* You can replace the main route table with your custom table so that every new subnet is automatically associated with it.

#### Internet Gateway  (IGW)
__Internet Gateway Structure__  
* An IGW provides a target in your amazon VPC route tables for internet routable traffic
* It performs network address translation for instances that have been assigned public IP
* It maintains the one-to-one map of instance private IP address and public IP address  

__To create a public subnet with Internet access__  
* Attach an IGW to you Amazon VPC
* Create a subnet route table rule to send all non-local traffic(0.0.0.0/0) to the internet gateway
* Configure you network ACLs and security group rules to allow relevant traffic to flow to and from you instance.

__To Enable Amazon EC2 to send and receive traffic from the internet__  
* Assign a public IP address or EIP.  

#### Dynamic Host Configuration Protocol (DHCP) Option Sets  
DHCP provides a standard for passing configuration information to the host On TCP/IP network. The configuration parameter of the option field include `domain-name`, `domain-name-server` and the `netbios-node-type`.  
AWS automatically creates and associate a DHCP option set for you VPC upon creation and set two options: `domain-name-server` and `domain-name`.

__To assign you own domain name to you instances__  
* Create a custom DHCP option set and assign it to you Amazon VPC
* You can configure the following values within you DHCP option set
  * domain-name-server  
  * domain-name
  * ntp-server
  * netbios-name-server
  * netbios-node-type  

Every Amazon VPC must have only one DHCP assigned to it.

#### Elastic IP Addresses (EIPs)
* You must first allocate an EIP for use within a VPC and then assign it to an instance
* EIPs are specific to a region.  
* There is a one-to-one relationship between network interfaces and EIPs  
* EIPs remains associated with you AWS account until you explicitly release them.  

#### Elastic Network Interfaces (ENIs)
__Structure of an ENI__    
* You can attach an ENI to an EC2 instance in you VPC
* An ENI is associated with a subnet upon creation
* They can have a public IP and multiple private IPs where one is the primary IP
* If you assign a second ENI t an instance it becomes dual-homes i.e it will have network presence in different subnet
* If an ENU is created independently of an instance, it will persist regardless of the lifetime of any instance you attach to it.
* If the underlying instance attached to an ENI fails, you can preserve the IP address by attaching the ENI to a replacement instance.
* ENI allows you to create a low-budget, high-availability solution.

#### Endpoints  
An Amazon VPC endpoint enables you to create a private connection between your Amazon VPC and another AWS service without requiring access over the internet or NAT instance VPC connection or AWS Direct Connect.  

#### Peering
An Amazon VPC peering connection is a networking connection between two Amazon VPCs that enable instances in either Amazon VPC to communicate with each other as if they are within the same network.  
__Rules for Peering__  
* You cannot create a peering connection between Amazon VPCs that have matching or overlapping CIDR blocks.  
* You cannot create a peering connection between Amazon VC in different regions.
* Amazon VPC peering connections do not support transitive routing
* You cannot have more than one peering connection between the same two Amazon VPCs at the same time.

#### Security Groups  
A security group is a virtual stateful firewall that controls inbound and outbound network traffic to AWS resources and Amazon EC2 instances.
__Rules for Security group__  
* You can create up to 500 security group for each Amazon VPC.
* You can add up to 50 inbound and outbound rules to each security group.  
* You can specify allow rules but not deny rule. This is an important difference between security groups and ACLs  
* You can specify separate rules for inbound and outbound traffic.  
* By default, no inbound traffic is allowed until you add inbound rules to the security group  
* By default, new security groups have an outbound rule that allows all outbound traffic. You can remove the rule and add outbound rules that allow specific outbound traffic only.  
* Security groups are stateful. This means that responses to allowed inbound traffic are allowed to flow outbound regardless of the outbound rules and vise versa. This is an important difference between security groups and network ACLs.
* Instances associated with the same security group can't talk to each other unless you add rules allowing it (with the exception being the default security group)
* You can change the security groups with which an instance is associated after launch and the changes will take effect immediately.  

#### Network Access Control Lists (ACLs)  
A network _access control list (ACL)_ is another layer of security that acta as a stateless firewall on a subnet level. Amazon VPCs are created with a modifiable default network ACL associated with every subnet that allows all inbound and outbound traffic.  When you create a custom network ACL, its initial configuration will deny all inbound and outbound traffic until you create rules that allow otherwise.  
Overall, every subnet must be associated with a network ACL.   

__Comparison of Security Group and Access Control List__

| Security Group                                                        | Network ACL                                            |  
|-----------------------------------------------------------------------|--------------------------------------------------------|  
| Operates at the instance level (first layer of defense)               | Operates at the subnet level (second layer of defense) |
| Supports allow rules only                                             | Supports allow rules and deny rules                    |
| Stateful: Return traffic is automatically allowed regardless of rules | Stateless: Return traffic must be explicitly allowed by rules |  
| Applied selectively to individual instances | Automatically applied to all instances in the associated subnets; this is a backup layer of defense, so you don't have to rely on someone specifying the security group |

#### Network Address Translation (NAT) instances and NAT Gateways
AWS provides NAT instances and NAT gateways to allow instances deployed in private subnets to gain Internet access. For common use cases, we recommend that you use a NAT gateway instead of a NAT instance. The NAT gateway provides better availability and higher bandwidth, and requires less administrative effort than NAT instances.

__NAT instance__  
A NAT instance is an Amazon Linux AMI that is designed to accept traffic from instances within a private subnet, translate the source IP address to the public IP address of the NAT instance, and forward the traffic to the IGW. The NAT instance is stateful, they have the string `amzn-ami-vpc-nat` in their names which is searchable in the Amazon EC2 console.  
