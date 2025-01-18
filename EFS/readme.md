# Amazon Elastic File System
[User Guide](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)

## Introduction
EFS is a fully managed file system with _POSIX compliance_, meaning it supports features like directories, file locking, and file permissions. These features are essential for many legacy or on-premises applications.

__When to Use AWS EFS Over S3__  
1. Applications that requires a POSIX-Compliant File System such as  content management systems or requires native file operations like `mkdir` or `chmod`.  
2. Applications requiring shared file system such as Web servers clusters needing a shared storage backend for logs or session files or high-performance computing (HPC) workloads requiring shared file access.  
3. Dynamic and simultaneous file access such as machine learning training jobs accessing large datasets.
4. File Storage With Hierarchical Structure for example applications requiring directory-based organization and traversal of files or legacy applications migrated to the cloud without changes.
5. Automatic Scaling for Unpredictable File System Usage for example Shared developer environments or data pipelines requiring dynamic storage scaling.  
6. Real-Time Access With Low Latency for example database workloads using files for caching or temporary storage or real-time analytics needing instant read/write access.  

### File System Types
Amazon EFS offers the following _file system types_ to meet your availability and durability needs:
1. Regional (Recommended): stores data redundantly across multiple Availability Zones within the same AWS Region.
2. One Zone: stores data within a single Availability Zone.
