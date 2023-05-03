# AWS IAM
[AWS IAM](https://docs.aws.amazon.com/iam/index.html)   
[User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/index.html)  
[API Reference](https://docs.aws.amazon.com/IAM/latest/APIReference/index.html)  
[CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/iam/)  

__Set up IAM permissions__   
An IAM service role is needed to allow MediaConvert access to your resources, such as your input files and the locations where your output files are stored.   
First create a role with a defined trust policy. A trust policy specifies which IAM entities (accounts, users, roles, services) can assume the role.  
```
$ aws iam create-role --role-name MediaConvertS3Role --assume-role-policy-document file://trust-policy.json
```
Attach a policy to the role
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
