# AWS Elemental MediaConvert  
[MediaConvert](https://aws.amazon.com/mediaconvert/)
[MediaConvert Docs](https://docs.aws.amazon.com/mediaconvert/index.html)   
[User Guide](https://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html)    
[API Reference](https://docs.aws.amazon.com/mediaconvert/latest/apireference/custom-endpoints.html)   
[Pricing](https://aws.amazon.com/mediaconvert/pricing/)   

## Introduction  
AWS Elemental MediaConvert is a file-based video transcoding service with broadcast-grade features. Create live stream content for broadcast and multi-screen delivery at scale.

![](aws-elemental-mediaConvert.png)
Process video files to prepare on-demand content for distribution or archiving.

MediaConvert has the following components:
1. __Jobs__  
A job does the work of transcoding. Each job converts an input file into an output file or files.
2. __Queues__  
A queue allows you to manage the resources that are available to your account for parallel processing of jobs.
3. __Presets__  
A preset is a saved group of encoding settings for a single output.  
4. __Job templates__  
A _job template_ specifies all the settings for a complete job, except for your IAM role and those settings that are likely to change for each job, such as the input file location and name, and user metadata that you might tag the job with.  

## Getting Started  
MediaConvert takes in an input file and the information that you provide about that file and turns it into one or more output files, based on the instructions and transcoding settings that you provide.
To convert an exaple video using MediaConvert
1. __Create storage__  
Create two buckets for input and output files
```
$ aws s3 mb s3://tochukwu-media-convert-input
$ aws s3 mb s3://tochukwu-media-convert-output
```
2. __DRM encryption__  
Optionally you can encrypt your content using DRM encryption to protect your content from unauthorized.  
3. __Upload files for transcoding__   
Copy a video input file(s) to the input s3 bucket.
```
$ aws s3 cp Robin-Thicke_Blurred-Lines.mp4 s3://tochukwu-media-convert-input
$ aws s3 cp Outkast_Hey-Ya.mp4 s3://tochukwu-media-convert-input
```
MediaConvert may also accept an HTTP(S) endpoint as the file input source instead of an S3 path.  
See [supported input type](https://docs.aws.amazon.com/mediaconvert/latest/ug/reference-codecs-containers-input.html)  

4. __Set up IAM permissions__   
An IAM service role is needed to allow MediaConvert access to your resources, such as your input files and the locations where your output files are stored.   
First create a role with a defined trust policy.
```
$ aws iam create-role --role-name MediaConvertS3Role --assume-role-policy-document file://trust-policy.json
```
Attach a policy to the role
```bash
$ aws iam put-role-policy --role-name MediaConvertS3Role --policy-name S3ReadWritePolicy --policy-document file://s3-permission.json
# Check the policies attached to the role
$ aws iam list-role-policies --role-name MediaConvertS3Role
```
Inline policies have a one-to-one relationship with the Principal (role, user or group).

5. __Create a Job__  
A job does the work of transcoding.

```bash
$ aws mediaconvert create-job --role arn:aws:iam::572233009210:role/My_MediaConvert_Role --endpoint-url https://ey3xqwxpb.mediaconvert.eu-west-2.amazonaws.com  --settings file://cli-job-settings.json
```
Remember to update the values of `Inputs[*].FileInput` and `OutputGroups[*].FileGroupSettings.Destination` to your actual video source and destination values.  

[Example AWS Elemental MediaConvert job settings in JSON](https://docs.aws.amazon.com/mediaconvert/latest/ug/example-job-settings.html#mp4-example)
[AWS ElemenetalMediaConvert Jobs](https://github.com/aws-samples/aws-media-services-simple-vod-workflow/blob/master/2-MediaConvertJobs/README.md)
