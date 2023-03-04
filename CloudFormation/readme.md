# Amazon Cloud Formation
[Docs](https://docs.aws.amazon.com/cloudformation/index.html)  
[User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)   
[API Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/Welcome.html)   
[CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html)  
[SDK Reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudformation/index.html)  

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
<!-- To start designing your own templates with AWS CloudFormation Designer, go to [CloudFormation designer](https://console.aws.amazon.com/cloudformation/designer)      -->


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
$ aws cloudformation create-stack --stack-name WordPressBlogStack --template-url https://s3.us-west-2.amazonaws.com/cloudformation-templates-us-west-2/WordPress_Single_Instance.yaml --parameters file://stack-create-params.json --region eu-west-1
```  
4. Monitor the progress of stack creation
```
$ aws cloudformation describe-stack-events --stack-name WordPressBlogStack --region eu-west-1
```
5. Get the output parameter values.
Once the status of all the events are _CREATE_COMPLETE_ your can check the outputs from the stack creation.
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
$ aws cloudformation create-change-set --stack-name WordPressBlogStack --change-set-name ChangeInstancesType --template-url https://s3.us-west-2.amazonaws.com/cloudformation-templates-us-west-2/WordPress_Single_Instance.yaml --parameters file://stack-update-params.json --region eu-west-1  
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
$ rain deploy WordPressTemplate.yaml --config stack-create-params.yaml --region eu-west-1
```  
Rain shows you progress of the stack creation in real time and the output parameter values after the process is complete.  
The stack name will be the name of the template file, _WordPressTemplate_ in this case.   

__Update the stack__
To demonstrate the update we can change the _InstanceType_ used from _t2.nano_ to _t2.micro_.
We do this with the _stack-update-params.yaml_ file where the _InstanceType_ parameter has been changed to _t2.micro_.  
1. Run the deploy command on the update stack template or paramters.  
```
$ rain deploy WordPressTemplate.yaml --config stack-update-params.yaml --region eu-west-1
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
