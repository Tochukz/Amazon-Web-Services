# Amazon DynamoDB
[Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)   
[API Reference](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html)   


### Core components of Amazon DynamoDB
In DynamoDB, _tables_, _items_, and _attributes_ are the core components that you work with.    
A table is a collection of items, and each item is a collection of attributes.  
You can use DynamoDB Streams to capture data modification events in DynamoDB tables.

#### Supported data types and naming rules in Amazon DynamoDB


#### Tables, items, and attributes
* __Tables__ -  Similar to other database systems, DynamoDB stores data in tables. A table is a collection of data.
* __Items__ - Each table contains zero or more items. An item is a group of attributes that is uniquely identifiable among all of the other items. In a People table, each item represents a person.  
Items in DynamoDB are similar in many ways to rows, records, or tuples in other database systems.
* __Attributes__ - Each item is composed of one or more attributes. An attribute is a fundamental data element, something that does not need to be broken down any further.   
 Attributes in DynamoDB are similar in many ways to fields or columns in other database systems.  

#### Primary key
When you create a table, in addition to the table name, you must specify the primary key of the table.
DynamoDB supports two different kinds of primary keys:  
* __Partition key__ – A simple primary key, composed of one attribute known as the partition key.
* __Partition key and sort key__ – Referred to as a composite primary key, this type of key is composed of two attributes.

Continue on https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html

### Setting up DynamoDB
#### Setting up DynamoDB local (downloadable version)  
To Setup DynamoDB locally
1. Download DynamoDB local. You can find v2.x [here](https://d1ni2b6xgvw0s0.cloudfront.net/v2.x/dynamodb_local_latest.tar.gz)
2. Extract the contents of the downloaded archive and copy the extracted directory to a location of your choice.
3.  To start DynamoDB, open a terminal window, navigate to the directory where you extracted _DynamoDBLocal.jar_, and enter the following command.
```
$ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```  
4. To access DynamoDB running locally with the AWS CLI, use the _--endpoint-url_ parameter.
```
$ aws dynamodb list-tables --endpoint-url http://localhost:8000
```  

To learn more see [Deploying DynamoDB locally on your computer](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)

### Accessing DynamoDB
#### Using the NoSQL workbench for DynamoDB  
1. Download NoSQL Workbench for DynamoDB    
To download the NoSQL Workbench, go to [NoSQL Workbench Download](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html) and download the setup that is appropriate for your operating system.  
2. Install NoSQL Workbench for DynamoDB  
Run the downloaded setup file to install NoSQL Workbench and optionally install DynamoDB local.   
See the [installation steps](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.install.html) for details on different operating systems.  
You can modify the default port and other options for DynamoDB local post installation by editing the `.aws/workbench/preferences.json` file.
3. Launch the newly install NoSQL workbench  
4. You can start DynamoDB local by turning on the _DDB local_ switch on the bottom left navigation bar.  

### Getting started with DynamoDB
__Step 1:__ Create a table
```
$ aws dynamodb create-table \
    --table-name Music \
    --attribute-definitions \
        AttributeName=Artist,AttributeType=S \
        AttributeName=SongTitle,AttributeType=S \
    --key-schema \
        AttributeName=Artist,KeyType=HASH \
        AttributeName=SongTitle,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --table-class STANDARD
```
For windows CMD, use `^` in place of `\`.  

To verify if DynamoDB have finished creating the table
```
$ aws dynamodb describe-table --table-name Music | grep TableStatus
```
For Windows CMD, use _findstr_ in place of _grep_.  

Once the table is in _ACTIVE_ status, it's considered best practice to enable _Point-in-time recovery_ for DynamoDB on the table
```
$ aws dynamodb update-continuous-backups --table-name Music --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true
```

__Step 2:__ Write data to a table
```
$ aws dynamodb put-item \
    --table-name Music  \
    --item \
        '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}, "AlbumTitle": {"S": "Somewhat Famous"}, "Awards": {"N": "1"}}'
$ aws dynamodb put-item \
    --table-name Music  \
    --item \
        '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Howdy"}, "AlbumTitle": {"S": "Somewhat Famous"}, "Awards": {"N": "2"}}'
```

__Step 3:__ Read data from a table
You can read an item from a DynamoDB table using either the DynamoDB API or PartiQL.

__PartiQL__
PartiQL is a SQL-compatible query language for DynamoDB. [PartiQL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html)  
[partiql.org](https://partiql.org/)  

#### Tutorials
[Build an Application Using a NoSQL Key-Value Data Store](https://aws.amazon.com/getting-started/guides/build-an-application-using-a-no-sql-key-value-data-store/?ref=docs_gateway/dynamodb/Introduction.html)
