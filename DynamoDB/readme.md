# Amazon DynamoDB
[Docs](https://docs.aws.amazon.com/dynamodb/)  
[Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)   
[API Reference](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html)   
[Cheat Sheet](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CheatSheet.html)  

### Core components of Amazon DynamoDB
In DynamoDB, _tables_, _items_, and _attributes_ are the core components that you work with.    
A table is a collection of items, and each item is a collection of attributes.  
You can use DynamoDB Streams to capture data modification events in DynamoDB tables.

#### Supported data types and naming rules in Amazon DynamoDB
__Data Type__   
* __Scalar Types__: Represents one value, could be number, string, binary, boolean and null
* __Document Types__: Complex structure with nested attribute like JSON document, e.g lists and maps
* __Set Types__: Represents multiple scaler values, e.g set of number or string or binary set.

__Binary__  
Binary type attributes can store any binary data, such as compressed text, encrypted data, or images.  
Your applications must encode binary values in base64-encoded format before sending them to DynamoDB. Upon receipt of these values, DynamoDB decodes the data into an unsigned byte array and uses that as the length of the binary attribute.  

__List vs Set__   
A list is similar to a JSON array. The elements in a list element do not have to be of the same type.
All the elements within a set must be of the same type.
Number Set can only contain numbers; String Set can only contain strings; and so on. Each value within a set must be unique.

__Data type descriptors__  
The following is a complete list of DynamoDB data type descriptors:
* S    – String
* N    – Number
* B    – Binary
* BOOL – Boolean
* NULL – Null
* M    – Map
* L    – List
* SS   – String Set
* NS   – Number Set
* BS   – Binary Set

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

The _partition key_ of an item is also known as its _hash attribute_ and the _sort key_ of an item is also known as it's _range attribute_.   
The choice of the range attribute should align with your application's specific access patterns and query requirements. 

#### Secondary index
A secondary index lets you query the data in the table using an alternate key, in addition to queries against the primary key.
DynamoDB supports two kinds of indexes:
* __Global secondary index__ – An index with a partition key and sort key that can be different from those on the table.  
* __Local secondary index__ – An index that has the same partition key as the table, but a different sort key.  

#### DynamoDB Streams
DynamoDB Streams is an optional feature that captures data modification events in DynamoDB tables.  
You can use DynamoDB Streams together with AWS Lambda to create a trigger—code that runs automatically whenever an event of interest appears in a stream.

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
Using the DynamoDB API:
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
Using PatiQL:
```
$ aws dynamodb execute-statement --statement "INSERT INTO Music  \
                VALUE  \
                {'Artist':'No One You Know','SongTitle':'Call Me Today', 'AlbumTitle':'Somewhat Famous', 'Awards':'1'}"

$ aws dynamodb execute-statement --statement "INSERT INTO Music  \
                VALUE  \
                {'Artist':'No One You Know','SongTitle':'Howdy', 'AlbumTitle':'Somewhat Famous', 'Awards':'2'}"
```
__Step 3:__ Read data from a table
You can read an item from a DynamoDB table using either the DynamoDB API or PartiQL.
Using the DynamoDB API:
```
$ aws dynamodb get-item --consistent-read \
    --table-name Music \
    --key '{ "Artist": {"S": "Acme Band"}, "SongTitle": {"S": "Happy Day"}}'
```
Using PartiQL:
```
$ aws dynamodb execute-statement --statement "SELECT * FROM Music   \
WHERE Artist='Acme Band' AND SongTitle='Happy Day'"
```

__Step 4:__ Update data in table   
Using DynamoDBAPI:
```
$ aws dynamodb update-item \
    --table-name Music \
    --key '{ "Artist": {"S": "Acme Band"}, "SongTitle": {"S": "Happy Day"}}' \
    --update-expression "SET AlbumTitle = :newval" \
    --expression-attribute-values '{":newval":{"S":"Updated Album Title"}}' \
    --return-values ALL_NEW
```
Using PartiQL:
```
$ aws dynamodb execute-statement --statement "UPDATE Music  \
    SET AlbumTitle='Updated Album Title'  \
    WHERE Artist='Acme Band' AND SongTitle='Happy Day' \
    RETURNING ALL NEW *"
```

__Step 5:__ Query data in table  
Using DynamoDB API:
```
$ aws dynamodb query \
    --table-name Music \
    --key-condition-expression "Artist = :name" \
    --expression-attribute-values  '{":name":{"S":"Acme Band"}}'
```
Using PartiQL:
```
$ aws dynamodb execute-statement --statement "SELECT * FROM Music   \
                                            WHERE Artist='Acme Band'"
```

__Step 6:__ Create a global secondary index   
```
$ aws dynamodb update-table \
    --table-name Music \
    --attribute-definitions AttributeName=AlbumTitle,AttributeType=S \
    --global-secondary-index-updates \
        "[{\"Create\":{\"IndexName\": \"AlbumTitle-index\",\"KeySchema\":[{\"AttributeName\":\"AlbumTitle\",\"KeyType\":\"HASH\"}], \
        \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 10, \"WriteCapacityUnits\": 5      },\"Projection\":{\"ProjectionType\":\"ALL\"}}}]"
```
The value of the _IndexStatus_ field is set to _CREATING_.  
To verify that DynamoDB has finished creating the _AlbumTitle-index_ global secondary index
```
$  aws dynamodb describe-table --table-name Music | grep IndexStatus
```
The index is ready for use when the value of the _IndexStatus_ field returned is set to _ACTIVE_.  

__Step 7:__ Query the global secondary index  
Using DynamoDB API:
```
$ aws dynamodb query \
    --table-name Music \
    --index-name AlbumTitle-index \
    --key-condition-expression "AlbumTitle = :name" \
    --expression-attribute-values  '{":name":{"S":"Somewhat Famous"}}'
```  
Using PartiQL:  
```
$ aws dynamodb execute-statement --statement "SELECT * FROM \"Music\".\"AlbumTitle-index\"  \
                                            WHERE AlbumTitle='Somewhat Famous'"
```

__Step 8:__ (Optional) clean up resources  
```
$ aws dynamodb delete-table --table-name Music
```

__PartiQL__
PartiQL is a SQL-compatible query language for DynamoDB.   
[PartiQL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.html)   
[partiql.org](https://partiql.org/)  

### Infrastructure as code  
#### Cloud Formation
Amazon DynamoDB limits the number of tables with secondary indexes that are in the creating state. If you create multiple tables with indexes at the same time, DynamoDB returns an error and the stack operation fails.  

#### Tutorials
[Build an Application Using a NoSQL Key-Value Data Store](https://aws.amazon.com/getting-started/guides/build-an-application-using-a-no-sql-key-value-data-store/?ref=docs_gateway/dynamodb/Introduction.html)
