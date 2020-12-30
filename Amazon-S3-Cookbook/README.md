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
[S3 Pricing](https://aws.amazon.com/s3/pricing/)  
 To host a static website on Amazon S3:
 1. Create a bucket
 2. Add a website configuration to your bucket
 3. Apply a bucket policy  
 4. Upload your content
 5. Configure a custom domain if you want to use your own domain

Benefits of hosting s static website on Amazon S3 are as follows:
* Low cost  
* Reliable routing  
* Low latency  
* Low maintenance

__Hosting a static website from Amazon Management Console ([See Guide](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html))__
1. Go to the S3 section of the Management Console and create a Bucket and allow _all_ public access.
2. Select the newly created bucket from S3 list of bucket. Click on the __Properties__ tab, scroll down to __Static website hosting__ and enable it.  Copy the generated website address.  
3. Enter the name for your index file and error file for you website and save.
4. Go to the __Permissions__ tab of the Bucket's page. Scroll down to __Bucket Policy__, edit and add JSON  
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObjects",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<your_bucket_name>/*"
        }
    ]
}
```
If you experience access denial error with step 4, create a new policy with your root account using the following JSON  
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ModifyBucketPolicy",
            "Action": [
                "s3:GetBucketPolicy",
                "s3:PutBucketPolicy"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::<your_bucket_name>"
        },
        {
            "Sid": "AccessS3Console",
            "Action": [
                "s3:GetBucketLocation",
                "s3:ListAllMyBuckets"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::*"
        }
    ]
}
```  
Then attach the policy to your IAM account or group used for this process.
5. Back to the Bucket's page on the __Objects__ tab, click on the __Upload__ button, upload all your website files and save.  
6. Visit the website address to see the site.   
__Note:__ Amazon S3 website do not support HTTPS, only HTTP.  

You can use _CNAME_ for the website endpoint to access with you custom domain name.  

To programmatically configure a bucket as a static website [see guide](https://docs.aws.amazon.com/AmazonS3/latest/dev/ManagingBucketWebsiteConfig.html).  
TO configure custom domain for your website using Route 53 [see here](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)  

__How to configure S3 server access logging__  
1. Amazon S3 Management Console and select the bucket.   
2. Click on the __Property__ tab on the bucket's page  and scroll down to __Server access logging__ and click on the edit button and enable it.
3. Specify the bucket and path you want to save the logs to. Something like this `s3://<your_bucket>/<your_logs_path>`.  Click the save button. You can even choose to log to another bucket by specified the target bucket's name instead.  
4. If you go to __Permissions__ tab and scroll down to the __Access control list (ACL)__ you will see that _S3 log delivery group_ have been added to the _Grantee_ list.

Note that storing log objects and accessing log objects are charged in the same way as S3 storage and data transfer pricing.  
If you want to regularly delete log objects you can manage the life cycle of objects by using life cycle rules.  

__How to configure a static website suing a custom domain__  
Todo: Return when you have secured your domain  


__How to configure a static website on Amazon S3 bucker with AWS CLI__    
First, you have to install the AWS CLI.
* For window, download the MSI installer at [awscli.amazonaws.com/AWSCLIV2.msi](https://awscli.amazonaws.com/AWSCLIV2.msi) and run the installer.

* For Linux, see the installation guide [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html)

Make sure your computer data/time is correct, because AWS CLI uses it to sign requests cryptographically. And request may fail if the date/time is incorrect.   

To configure you AWS CLI installation from the command line you can issue the command  
```
$ aws configure
```
The command automatically fills out your credential file for you with the values you supply to the prompt.  

Now to configure the website:
1. Create a bucket  
```
$ aws s3 mb s3://<my-bucket> --region <region-name>
```
2. Configure the bucket as a Website  
```
$ aws s3 website s3://<my-bucket> --index-document <index-file> --error-document <error-file> --region <region-name>
```   
3. Create a bucket policy in JSON and save it to a file say policy.json
```
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicReadGetObjects",
      "Effect":"Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::<my-bucket>/*"]
    }
  ]
}
```  
4. Add the policy to the bucket
```
$ aws s3api put-bucket-policy --bucket <my-bucket> --policy file://<relative-path-to-policy-file>.json --region <region-name>
```  
5. Inspect the website configuration for the bucket  
```
$ aws s3api get-bucket-website --bucket <my-bucket> --region <region-name>  
```  
5. Upload your files to the bucket  
```
$ aws s3 sync <my-website-local-directory>/ s3://<my-bucket> --region <region-name>
```  

To learn more about AWS CLI (S3) see [cli s3 docs](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)  
To learn more about AWS CLI (S3Api) see [cli s3api docs](https://docs.aws.amazon.com/cli/latest/reference/s3api/index.html)  
For all CLI commands see [cli latests](https://docs.aws.amazon.com/cli/latest/)

## Chapter 3: Calculating Cost with the AWS Simple Monthly Calculator
