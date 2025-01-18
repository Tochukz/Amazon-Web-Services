# AWS IAM Identity Center
[User Guide](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)

### Introduction
On July 26, 2022, __AWS Single Sign-On__ was renamed to __AWS IAM Identity Center__.  
The _sso_ and _identitystore_ API namespaces along with the  related namespaces remain unchanged for backward compatibility purposes.  

__Two modes of deployment__  
IAM Identity Center supports two types of instances: _organization instances_ and _account instances_. An organization instance is the best practice. It is the only instance that enables you to manage access to AWS accounts and it is recommended for all production use of applications.  

### Getting Started
__Enabling AWS IAM Identity Center__
1. Login to AWS Management console
2. Navigate to the IAM Identity Center console
3.  Click on the _Enable_ button,
4. Select the _Enable with AWS Organizations_ option from the modal and click _Continue_ button

__Switching AWS Regions__  
You can switch your IAM Identity Center Region only by deleting the current instance and creating a new instance in another Region. If you already enabled an AWS managed application with your existing instance, you should delete it first before deleting your IAM Identity Center. 
