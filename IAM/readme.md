# AWS IAM
[AWS IAM](https://docs.aws.amazon.com/iam/index.html)   
[User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/index.html)  
[API Reference](https://docs.aws.amazon.com/IAM/latest/APIReference/index.html)  
[CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/iam/)  

## Introduction
__Eventually Consistent__  
IAM, like many other AWS services, is eventually consistent.  

__Permissions and Policies in IAM__   
A _principal_ entity is a person or application that is authenticated using an IAM entity (user or role).   
A _policy_ is an object in AWS that, when associated with an identity or resource, defines their permissions.
You manage access in AWS by creating policies and attaching them to IAM identities (users, groups of users, or roles) or AWS resources.  
AWS evaluates these policies when a principal uses an IAM entity (user or role) to make a request.

__Policy and users__   
IAM users are identities in the service. When you create an IAM user, they can't access anything in your account until you give them permission. You give permissions to a user by creating an identity-based policy, which is a policy that is attached to the user or a group to which the user belongs.  
```
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "dynamodb:*",
    "Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/Books"
  }
}
```
The above JSON policy that allows the user to perform all Amazon DynamoDB actions _(dynamodb:*)_ on the Books table in the 123456789012 account within the us-east-2 Region.  

__Federated users and roles__  
Federated users don't have permanent identities in your AWS account the way that IAM users do. To assign permissions to federated users, you can create an entity referred to as a role and define permissions for the role. When a federated user signs in to AWS, the user is associated with the role and is granted the permissions that are defined in the role.  

__Identity-based and resource-based policies__  
_Identity-based policies_ are permissions policies that you attach to an IAM identity, such as an IAM user, group, or role. _Resource-based policies_ are permissions policies that you attach to a resource such as an Amazon S3 bucket or an IAM role trust policy.  

__Identity-based policies__ can be further categorized:
1. __Managed policies__: Standalone identity-based policies that you can attach to multiple users, groups, and roles.  
  * __AWS managed policies__:  Managed policies that are created and managed by AWS.
  * __Customer managed policies__: Managed policies that you create and manage in your AWS account.
2. __Inline policies__:  Policies that you create and manage and that are embedded directly into a single user, group, or role. In most cases, we don't recommend using inline policies.  

__Resource-based__ policies are inline policies, and there are no managed resource-based policies.  
To enable cross-account access, you can specify an entire account or IAM entities in another account as the principal in a resource-based policy.  

The IAM service supports only one type of resource-based policy called a _role trust policy_, which is attached to an IAM role. Because an IAM role is both an identity and a resource that supports resource-based policies, you must attach both a trust policy and an identity-based policy to an IAM role. _Trust policies_ define which principal entities (accounts, users, roles, and federated users) can assume the role.


## Basic Operations
__To create a policy__  
```bash
$ aws iam create-policy --policy-name UsersReadOnlyAccessToIAMConsole --policy-document file://iam-policy.json --description "Allow readonly access to IAM console"
# List all your custom policies
$ aws iam list-policies --scope Local
```

__To create a user__  
```
$ aws iam create-user --user-name jacob
$ aws iam get-user --user-name jacob
```

__To attach policy to user__  
```
$ aws iam attach-user-policy --user-name jacob --policy-arn arn:aws:iam::966727776968:policy/UsersReadOnlyAccessToIAMConsole
```

__To detach policy from user__  
```
$ aws iam detach-user-policy --user-name jacob --policy-arn arn:aws:iam::966727776968:policy/UsersReadOnlyAccessToIAMConsole
```  

__To delete user__  
```
$ aws iam delete-user --user-name jacob
```


__To delete policy__  
```
$ aws iam delete-policy --policy-arn arn:aws:iam::966727776968:policy/UsersReadOnlyAccessToIAMConsole
```


__Set up IAM permissions__   
An IAM service role is needed to allow other AWS services access to your resources, such as your input an S3 bucket for example or an RDS instance.   

First we create a role with a defined trust policy. A trust policy specifies which IAM entities (accounts, users, roles, services) can assume the role.  
```
$ aws iam create-role --role-name MediaConvertS3Role --assume-role-policy-document file://trust-policy.json
```
Next we attach a policy to the role
```bash
$ aws iam put-role-policy --role-name MediaConvertS3Role --policy-name S3ReadWritePolicy --policy-document file://s3-permission.json
# Check the policies attached to the role
$ aws iam list-role-policies --role-name MediaConvertS3Role
```
Inline policies have a one-to-one relationship with the Principal (role, user or group). This means that if we delete the IAM role, the inline policy also gets deleted.  

__Resources__  
[Create a Role with AWS CLI - Complete Guide](https://bobbyhadz.com/blog/aws-cli-create-role)    
[AWS IAM Policies with Examples](https://medium.com/tensult/aws-policies-with-examples-8340661d35e9)   
[AWS IAM Policies : Creating an IAM Policy & Best Practices](https://spacelift.io/blog/iam-policy)   
[List of AWS Service Principals](https://gist.github.com/shortjared/4c1e3fe52bdfa47522cfe5b41e5d6f22)     
