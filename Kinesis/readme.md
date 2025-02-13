# AWS IAM Identity Center
## Amazon Kinesis Video Streams
[Kinesis Video Streams Developer Guide](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html)  
[Kinesis Video Streams with WebRTC Developer Guide](https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/what-is-kvswebrtc.html)  

## Amazon Kinesis Data Streams
[Developer Guide](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)  
[CLI Reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kinesis/index.html)  
[API Reference](https://docs.aws.amazon.com/kinesis/latest/APIReference/Welcome.html)   

### Introduction
Kinesis Data Streams is part of the Kinesis streaming data platform, along with _Firehose_, _Kinesis Video Streams_, and _Managed Service for Apache Flink_.  

Although you can use Kinesis Data Streams to solve a variety of streaming data problems, a common use is the real-time aggregation of data followed by loading the aggregate data into a data warehouse or map-reduce cluster.  

### Terminology and Concepts
__Kinesis Data Stream__  
A _Kinesis data stream_ is a set of _shards_.  

__Data Record__
A _data record_ is the unit of data stored in a Kinesis data stream. Data records are composed of a _sequence number_, a _partition key_, and a _data blob_, which is an immutable sequence of bytes.  

__Capacity Mode__  
A data stream _capacity mode_ determines how capacity is managed and how you are charged for the usage of your data stream.  
 Currently, in Kinesis Data Streams, you can choose between an __on-demand mode__ and a __provisioned mode__ for your data streams  

__Retention Period__   
The _retention period_ is the length of time that data records are accessible after they are added to the stream. A stream’s retention period is set to a default of 24 hours after creation. You can increase the retention period up to 8760 hours (365 days).  

__Producer__  
_Producers_ put records into Amazon Kinesis Data Streams. For example, a web server sending log data to a stream is a producer.  

__Consumer__  
Consumers get records from Amazon Kinesis Data Streams and process them. These consumers are known as _Amazon Kinesis Data Streams Application_.  

__Amazon Kinesis Data Streams Application__  
An Amazon Kinesis Data Streams application is a consumer of a stream that commonly runs on a fleet of EC2 instances.  
There are two types of consumers that you can develop: _shared fan-out_ consumers and _enhanced fan-out_ consumers.

__Shard__   
A shard is a uniquely identified sequence of data records in a stream. A stream is composed of one or more shards, each of which provides a fixed unit of capacity.  
