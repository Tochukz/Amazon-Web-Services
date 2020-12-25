# Amazon S3 Cookbook (2015)
__By Naoya Hashimoto__  

__AWS Console__  
[Free Tier Oferring](https://aws.amazon.com/free)  
[Hands on Tutorials](https://aws.amazon.com/getting-started/hands-on/)  

To install and use AWS CLI you need:   
* Python 2.7 or later  
* pip  

## Chapter 1: Managing Common Operations with AWS SDKs  
To get started with AWS SDKs see [AWS Developers](https://aws.amazon.com/developers/getting-started/)  

__Introduction__  
Amazon S3 does not have a minimum fee, we just pay for what we store.  

__AWS SDK for Node.js and basic S3 operations__  
See the [Developer Guide](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html) for the JavaScript SDK.  

AWS Bucket ownership is not transferable. You cannot change the name of a bucket or the region you selected after creating the bucket. A bucket name must be globally unique.

__Shared Credentials File__  
The shared credential file houses your AWS credential which is used by the AWS SDK and CLI to access AWS APIs.  
The credential file is named `credentials` and it is store as
* `~/.aws/credentials` for Linux, Unix, and MacOS
* `C:\Users\USER_NAME\.aws\credentials` for Windows  

A credential file looks like this
```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```
To generate credential follow this [article](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html)    

## Chapter 2: Hosting a Static Website on Amazon S3 Bucket  
 
