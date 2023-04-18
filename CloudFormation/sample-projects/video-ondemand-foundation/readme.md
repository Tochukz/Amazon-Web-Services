# Video on Demand on AWS Foundation 

## Solution Overview
### Required AWS Service components  
1. __AWS Elemental Media Convert__   
To transcode media files from their source format into versions that play back on most user devices.  
2. __Amazon CloudFront__   
For global distribution.  
3. __Amazon S3__  
For object storage  
4. __AWS Lambda__  
To run code without provisioning or managing servers.
5. __Amazon CloudWatch__  
To track encoding jobs in MediaConvert.  
6. __Amazon SNS__  
To send notifications for completed jobs.

## Cost  
The total cost for running this solution depends on 
1. the size of the videos, 
2. the number of outputs created, and 
3. the number of views the published content receives through Amazon CloudFront.  

AWS Service                 | Picing        | Dimension (5 minutes video)  | Cost per Month 
----------------------------|---------------|------------------------------|---------------- 
Amazon CloudFront           | $0.085 per GB | 0.75 MB/s * 1000 users * 300 seconds |  
Amazon S3                   |  |  |
AWS Lambda                  |  |  |  
Amazon CloudWatch           |  |  |  
Amazon SNS                  |  |  |
AWS Elemental MediaConvert  |  |  |

## Architecture Overview 
