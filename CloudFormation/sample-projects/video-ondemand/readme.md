# Video on demand

[Build a scalable, distributed video-on-demand workflow](https://docs.aws.amazon.com/solutions/latest/video-on-demand/solution-overview.html)

## Solution Overview

### Required AWS Service components

1. **AWS Elemental MediaConvert**  
   To transcode media files from their source format into versions that play back on most user devices.
2. **AWS Elemental MediaPackage (Optional)**  
   To create video streams formatted to play on several devices from a single video input.
3. **Amazon CloudFront**  
   For global distribution.
4. **AWS Step Function**  
    To build applications from individual components that each perform a discrete function.  
5. **Amazon S3**  
   For object storage
6. **AWS Lambda**  
   To run code without provisioning or managing servers.
7. **AWS DynamoDB**  
   To track source and destination file metadata and progress through the workflow.   
8. **Amazon CloudWatch**  
   To track encoding jobs in MediaConvert.
9. **Amazon SQS**  
   To capture the workflow output
10. **Amazon SNS**  
   To send notifications for completed jobs.

Take note that this solution have a few additional AWS resources than the foundation solution. This includes
1. AWS Elemental MediaPackage
2. AWS Step Function
3. AWS DynamoDB
4. Amazon SQS

## Cost
The total cost for running this solution depends on
1. the size of the videos,
2. the number of outputs created, and
3. the number of views the published content receives through Amazon CloudFront.  

AWS Elemental MediaConvert composes the majority of the cost.  
You should create a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs.   
