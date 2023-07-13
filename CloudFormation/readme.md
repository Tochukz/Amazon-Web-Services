# Amazon Cloud Formation
[Docs](https://docs.aws.amazon.com/cloudformation/index.html)  
[User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)   
[API Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/Welcome.html)   
[CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html)  
[SDK Reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudformation/index.html)  
[Resource and property types reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)

## Introduction  
By using CloudFormation, you easily manage a collection of resources as a single unit.
Reuse your CloudFormation template to create your resources in a consistent and repeatable manner.

### AWS CloudFormation concepts
__Templates__  
A CloudFormation template is a JSON or YAML formatted text file.   
CloudFormation uses these templates as blueprints for building your AWS resources.

__Stacks__  
When you use CloudFormation, you manage related resources as a single unit called a stack.  
All the resources in a stack are defined by the stack's CloudFormation template.  
To create those resources, you create a stack by submitting the template that you created, and CloudFormation provisions all those resources for you.   

__Change sets__   
If you need to make changes to the running resources in a stack, you update the stack.   
Before making changes to your resources, you can generate a change set, which is a summary of your proposed changes.   
Change sets allow you to see how your changes might impact your running resources, especially for critical resources, before implementing them.     

### How AWS CloudFormation workS
1. Use the _AWS CloudFormation Designer_ or your own text editor to create or modify a CloudFormation template in JSON or YAML format. Or use an existing template.  
2. Save the template locally or in an Amazon S3 bucket.  
3. Create a CloudFormation stack by specifying the location of your template file, such as a path on your local computer or an Amazon S3 URL. If the template contains parameters, you can specify input values when you create the stack.  You may use the _CloudFormation console_, API, or AWS CLI to create the stack.  
__NB:__ If you specify a template file stored locally, CloudFormation uploads it to an S3 bucket in your AWS account. CloudFormation creates a bucket for each region in which you upload a template file.

For more information about declaring specific resources, see [AWS resource and property types reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)  

### Tools
#### Rain
Rain is a command line tool for working with AWS CloudFormation templates and stacks.  
[Rain Github](https://github.com/aws-cloudformation/rain)  
[Rain Docs](https://aws-cloudformation.github.io/rain/)  
Rain is a replacement for the now deprecated [AWS CloudFormation Template Builder ](https://github.com/awslabs/aws-cloudformation-template-builder)  

__Installation__  
Install _rain_ using home brew  
```
$ brew install rain
$ rain --help
```
Or download the appropriate binary for your system from the [releases page](https://github.com/aws-cloudformation/rain/releases)  
You can find shell completion scripts in [docs/bash_completion.sh](https://github.com/aws-cloudformation/rain/blob/main/docs/bash_completion.sh) and [docs/zsh_completion.sh](https://github.com/aws-cloudformation/rain/blob/main/docs/zsh_completion.sh).

__Common rain command__  
Use rain to list all the running stacks
```
$ rain ls
```  
Get the CloudFormation template from a running stack
```
$ rain cat MessagingStack
```
Check the events for a given stack
```
$ rain logs MessagingStack --all
```  
The `all` flag is optional.

## Chapter 1: Getting Started  
__Deploying a stack for a WordPress blog__   
1. Pick a template YAML or JSON format [WordPress-Single-Instance.yaml](https://s3.us-west-2.amazonaws.com/cloudformation-templates-us-west-2/WordPress_Single_Instance.yaml) or [WordPress-Single-Instance.json](https://s3.us-west-2.amazonaws.com/cloudformation-templates-us-west-2/WordPress_Single_Instance.template)  
2. Prepare any required pre-existing item or resource. In this case, we need an EC2 key pair so that we can use its KeyName.  
```
$ aws ec2 create-key-pair --key-name WordPressKey --query "KeyMaterial" --region eu-west-1 --output text > ~/WordPressKey.pem
```  
3.  Create the stack
```
$ aws cloudformation create-stack --stack-name WordPressBlogStack --template-url https://s3.us-west-2.amazonaws.com/cloudformation-templates-us-west-2/WordPress_Single_Instance.yaml --parameters file://inputs/cfn-create-params.json --region eu-west-1
```  
4. Monitor the progress of stack creation
```
$ aws cloudformation describe-stack-events --stack-name WordPressBlogStack --region eu-west-1
```
5. Get the output parameter values.
Once the status of all the events are _CREATE_COMPLETE_ your can check the outputs for the stack created.
```
$ aws cloudformation describe-stacks --stack-name WordPressBlogStack  --query 'Stacks[].Outputs' --region eu-west-1
```  
You can copy the value of the _WebsiteURL_ output parameter to your browser address bar.  

__Update the stack__  
To demonstrate the update we can change the _InstanceType_ used from _t2.nano_ to _t2.micro_.  
We do this with the _stack-update-params.json_ file where the _InstanceType_ parameter has been changed to _t2.micro_.  
1. Check the stack parameters before change.
```
$ aws cloudformation describe-stacks --stack-name WordPressBlogStack --region eu-west-1
```  
See that the InstanceType ParameterValue is _t2.nano_  
2. Generate a change set to see if you like the impending change
```
$ aws cloudformation create-change-set --stack-name WordPressBlogStack --change-set-name ChangeInstancesType --template-url https://s3.us-west-2.amazonaws.com/cloudformation-templates-us-west-2/WordPress_Single_Instance.yaml --parameters file://inputs/cfn-update-params.json --region eu-west-1  
```
3. Inspect the changes in the change set
```
$ aws cloudformation describe-change-set --change-set-name ChangeInstancesType --stack-name WordPressBlogStack --region eu-west-1
```  
From the output, look closely at _Action_ and _Replacement_ property value in each object in the _Changes_ array.  
4. Execute the change set.
```
$ aws cloudformation execute-change-set --stack-name WordPressBlogStack --change-set-name ChangeInstancesType --region eu-west-1
```
5. Monitor the progress of stack update
```
$ aws cloudformation describe-stack-events --stack-name WordPressBlogStack --region eu-west-1
```
6. Get the output parameter values.
After the progress status says _UPDATE_COMPLETE_ check the stack output values.
```
$ aws cloudformation describe-stacks --stack-name WordPressBlogStack  --query 'Stacks[].Outputs' --region eu-west-1
```
7. Check the stack parameters before change.
See that the InstanceType ParameterValue is now _t2.micro_  
```
$ aws cloudformation describe-stacks --stack-name WordPressBlogStack --region eu-west-1
```

__Deleting the stack__  
Cleanup time. To delete the stack
```
$ aws cloudformation delete-stack --stack-name WordPressBlogStack --region eu-west-1
```  

### Using rain CLI
__Deploying the stack with rail CLI__  
1. Download your template.
You can save the [WordPress-Single-Instance.yaml](https://s3.us-west-2.amazonaws.com/cloudformation-templates-us-west-2/WordPress_Single_Instance.yaml) template locally as _WordPressTemplate.yaml_.
2. Prepare any required pre-existing item or resource.
We can use the KeyPair name _WordPressKey_ that we created in step 2 when using _aws clouformation_ .
3. create the stack using the `deploy` command.
```
$ rain deploy WordPressTemplate.yaml --config inputs/rain-create-params.yaml --region eu-west-1
```  
Rain shows you progress of the stack creation in real time and the output parameter values after the process is complete.  
The stack name will be the name of the template file, _WordPressTemplate_ in this case.   

__Update the stack__
To demonstrate the update we can change the _InstanceType_ used from _t2.nano_ to _t2.micro_.
We do this with the _stack-update-params.yaml_ file where the _InstanceType_ parameter has been changed to _t2.micro_.  
1. Run the deploy command on the update stack template or paramters.  
```
$ rain deploy WordPressTemplate.yaml --config inputs/rain-update-params.yaml --region eu-west-1
```
This will show you the impending change to be made to the stack.  
Unfortunately the change shown is not as details or specific as I expected at the time of this writing.  
2. Follow the prompt and type _Y_ to continue with the change.  

__Delete the stack__   
Cleanup time. Delete the stack using `rm` command
```bash
# First find the name of the stack to delete
$ rain ls --region eu-west-2
$ rain rm WordPressSingleInstance --region eu-west-1
```  

## Chapter 2: Template Basics  
__CloudFormation Template__  
A template may include six top-level sections
```
AWSTemplateFormatVersion:

Description:

Parameters:

Mappings:

Resources:

Outputs:
```
however, only the _Resources_ section is required and must define at lease one resource.  

__CloudFormation template sections__  
1. __Resources:__ contains the definitions of the AWS resources you want to create with the template
2. __Outputs:__ define custom values that are returned after the template is executed to create a stack.  
3. __Parameters:__ section declares values that can be passed to the template when you create a stack.  
4. __Mappings__ declare conditional values that are evaluated in a similar manner as a look up table statement.

### Resources
__Resources__  
The Resources object contains a list of resource objects.  
A resource must have a _Type_ attribute, which defines the kind of AWS resource you want to create.
```
...
Resources:
  MyS3Bucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: 'my-assets-bucket'
...
```
The _Type_ attribute has a special format:
```
AWS::ProductIdentifier::ResourceType
```
For example, the resource type for an Amazon S3 bucket is `AWS::S3::Bucket`.  
For a full list of resource types, see [Template reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-reference.html) or more specifically [Property types reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

__Resource Properties__
Resource declarations use a _Properties_ attribute to specify the information used to create a resource.

__Intrinsic functions__  
AWS CloudFormation provides several built-in functions that help you manage your stacks. Use intrinsic functions in your templates to assign values to properties that are not available until runtime.   
For example, you can use _Fn::Ref_ to reference a paramter, _Fn::GetAtt_ to get the property of a resource and _Fn::GetAZs_ to get the list of all availability zones in a region.

See [intrinsic function referenCe](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html)

### Parameters
A parameter contains a list of attributes that define its value and constraints against its value. The only required attribute is Type, which can be String, Number, or an AWS-specific type.  
```
...
Parameters:
  DBPassword:
    Description: 'Password for the RDS MySQL database instance'
    Type: String
    MinLength: 6
    MaxLength: 40
    NoEcho: true
  ...
```
__NoEcho__  
If you set the NoEcho attribute to true, CloudFormation returns the parameter value masked as asterisks (*****) for any calls that describe the stack or stack events, except for information stored in the _Metadata_ and _Output_ section of the template or the Metadata attribute of a resource definition.  
It is strongly recommended to not use these mechanisms to include sensitive information, such as passwords or secrets.  

### Mappings  
Mappings are used to determine conditional values.
For examples, you can use an input value as a condition that determines another value. Similar to a switch statement, a mapping associates one set of values with another.   

__Pseudo parameters__  
Pseudo parameters are parameters that are predefined by AWS CloudFormation. You don't declare them in your template. Use them the same way as you would a parameter, as the argument for the Ref function.  
For example, the `AWS::Region` pseudo parameter enables you to get the region where the stack is created.  

### Outputs
The Outputs object in the template contains declarations for the values that you want to have available after the stack is created.

### Metadata
You can use the optional Metadata section to include arbitrary JSON or YAML objects that provide details about the template.
CloudFormation does not transform, modify, or redact any information you include in the Metadata section. Because of this, we strongly recommend you do not use this section to store sensitive information, such as passwords or secrets.

Resources can also have a meta data attribute.
Learn more about [meta data attributes](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-metadata.html)

__Notable to read__   
[Walkthroughs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/CHAP_Using.html)  
[Deploying applications on Amazon EC2 with Amazon CloudFormation](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/deploying.applications.html#deployment-walkthrough-basic-server)  
[Walkthrough: Create a scaled and load-balanced application](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/example-templates-autoscaling.html)   
[Template Snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/CHAP_TemplateQuickRef.html)   
[Amazon S3 template snippets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-s3.html#scenario-s3-bucket-website)   

#### Working with templates  
Open the CloudFormation console.and click on _Designer_.  
Click the pen icon to edit and change the name of the template.  
__Basic WebServer with CloudFormation Designer__  
1. Add VPC, call it _VPC_
2. Add a Subnet inside the VPC, call it _PublicSubnet_
3. Add an Instance inside the subnet - _WebServerInstance_
4. Add SecurityGroup inside the VPC - _WebServerSecurityGroup_
5. Add InternetGateway infront of the VPC - _InternetGateway_  
6. Create a connection between the InternetGateway resource and the VPC resource - _VpcGatewayAttachment_.
7. Add a routable inside the VPC - _PublicRouteTable_
8. Add a route inside the route table = _PublicRoute_
9. Use GatewayId to create a connection from the PublicRoute resource to the Internet gateway
10.  Create an explicit dependency between the _PublicRoute_ resource and the _VpcGatewayAttachment_.
11. Connect the _PublicRouteTable_  to the _PublicSubnet_ to associate the route table and subnet.
#### Learn More
##### CFN Nag
The _cfn-nag_ tool looks for patterns in CloudFormation templates that may indicate insecure infrastructure.
__Install cfn-nag__
```bash
# Install gem if you don't already have it installed
$ brew install ruby brew-gem
$ gem install cfn-nag
```
You may need to use _sudo_ if you encounter any permission issues will install _cfn-ng_ with gem.  

__Run cfn scan__  
Run _cfn scan_ against your cloudformation template
```
$  cfn_nag_scan --input-path  SPATemplate.yaml
```

[cfn-nag Github](https://github.com/stelligent/cfn_nag)

#### Common Commands
__CLI: aws cloudformation__  

Operation           | Command
--------------------|------------
Validate a template | `aws cloudformation validate-template --template-body file://StaticWebsiteTemplate.yaml`
Show events log | `aws cloudformation describe-stack-events --stack-name StaticWebsiteTemplate`

__CLI: rain__

Operation           | Command
--------------------|------------
Show events log     | `rain logs StaticWebsiteTemplate`

#### Resources Reference
Resource  | Reference
----------|------------
S3        | [AWS::S3](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_S3.html)  
EC2       | [AWS::EC2](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_EC2.html)
ECS       | [AWS::ECS](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_ECS.html)  
ECR       | [AWS::ECR](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_ECR.html)
Lambda    | [AWS::Lambda](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_Lambda.html)
EC2 Instance | [AWS::EC2::Instance](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html)  
S3 Bucket | [AWS::S3::Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)
EC2 VPC   | [AWS::EC2::VPC](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc.html)

[How do I resolve template validation or template format errors in CloudFormation?](https://aws.amazon.com/premiumsupport/knowledge-center/cloudformation-template-validation/)  
