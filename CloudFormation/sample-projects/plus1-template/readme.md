# Plus1 Template
### Description
This project provision AWS resources for a non-trivial web application.  
The major resources provision includes 
* VPC
* EC2 instance 
* RDS instance 
* Cloudfront distribution
* Cognito Userpool and client 
* CodeDeploy App and deployment groups
* SQS Queue
* SNS Topics

### Tooling
__Rain CLI__   
Rain CLI provides a convinient wrapper over _aws cloudformation_.  
Install _rain_ using home brew  
```
$ brew install rain
$ rain --help
```  
__Common rain commands__ 

Description  | Command 
-------------|----------
Deploy stack | `rain deploy Plus1Template.yaml Plus1TempDevStack --config params/dev-params.yaml --region eu-west-1`
List stack   | `rain ls` 
Check events | `rain logs `
Delete stack | `rain rm Plus1TempDevStack`
__NB__: If you are targeting a region different than you default profile region for deployment, export that region as environment variable
```
$ export AWS_REGION=eu-west-1
```
Alternately, you can use the region flag 
```
$ rain deploy Plus1Template.yaml Plus1DevStack --config params/dev-params.yaml --region eu-west-1
```
### Setup and pre-deployment 
The sections that follows describes the steps that are required before the deployment of the resources.    


__Allocate an elastic IP__  
```
$ aws ec2 allocate-address --domain vpc
```  
The _allocation_id_ obtained from the result will be used for the _allocation_id_ parameter of the _server_ module.  
Elasic IPs are used for the EC2 elastic IP attachment.   

__Generate SSH keys__    
If you are the first person to deploy the infrastrcture, you will need to generate SSH keypairs, otherwise you must download it as described under _Keep the private keys..._ section.   
To generate SSH keypair, run the command in the project root directory.  
```
$ mkdir keys 
$ ssh-keygen -q -f keys/dev -C aws_terraform_ssh_key -N ''
```  
This will generate a public and private key named `dev` in the _keys_ directory.    
You may do the same and replace the -f parameter value by `keys/staging` to generate keys for staging environment and similarly, `keys/prod` for production environment.  
The _keys_ directory has been added to .gitignore to prevent accidental commiting to remote repository.  

__Get ACM certificate__  
Get existing Amazon Certificate for the CloudFront sitribution. 
```
$ aws acm list-certificates --region us-east-1
```
Copy the certificarte ARN which will be used as a module parameter.   
If you don't have an existing certificate, request for one using `aws acm` command. 
__NB:__ The ACM certificate must be in _us-east-1_ region.

### Deployment
__Deployment__   



### Development and changes 

### Post deployment
__Keep the private keys with AWS secrets manager__   
If you are the first to deploy the infrastructure, you should save the private key to AWS secrets manager so that other members of your team can access the key.  
Encode the key file content with Base64 encoding and store it in Secrets Manager
```
$ keyBase64=$(base64 keys/dev)
$ aws secretsmanager create-secret --name Plus1ConfDevKey --description "Plus1Conf private key" --secret-string $keyBase64
```  

__Retrieve the private key from secrets manager__  
If someone else deployed the infrastrcture and save the private key to AWS secrets manager, you can access the key by downloading it.  
```
$ aws secretsmanager get-secret-value --secret-id Plus1ConfDevKey --query SecretString --output text | base64 --decode > ~/Plus1ConfDevKey.pem
$ chmod 400 ~/Plus1ConfDevKey.pem
```

__SSH into the EC2 instance__  
If you are using the key you generate yourself in the keys directory
```
$ ssh -i keys/dev ec2-user@xx.xxx.xx.xxx
``` 
If you are using the downloaded key from AWS secrets manager 
```
$ ssh -i ~/Plus1ConfDevKey.pem ec2-user@xx.xxx.xx.xxxx
```  
Replace _xx.xxx.xx.xxxx_ with the public_ip output of your server module deployment.  

### Clean up  
If you are running this for testing or deomonstration purposes you may want to delete all the deployed resources after you are done to avoid charges.   

__Cleanup of resources__   


__Release EIP__ 
Unattached Elastic IP attract charges, so you may want to release them as part of your clean up operation.  
Release intially allocated elastic IP  
```
$ aws ec2 release-address --allocation-id eipalloc-04d13ec9ee2acba22
```  

__Delete private key__  
Secrets stored in secrets manager are eligible to charges per secret.  
Delete the private key from secrets manager. 
```
$ aws secretsmanager delete-secret --secret-id Plus1ConfDevKey
```  
