# @saibotsivad/dynamodb

Minimalist DynamoDB request generator.

This is essentially a thin wrapper for generating HTTP requests to AWS.

## Example

Use it like this:

```js
import { dynamodb } from '@saibotsivad/dynamodb'
import { createAwsSigner } from 'sign-aws-requests'

// Normal AWS IAM credentials:
const credentials = {
	region: 'us-east-1',
	secretAccessKey: 'hKVU_EXAMPLE_SECRET_5rjo',
	accessKeyId: 'AKIA_EXAMPLE_KEY'
}

const db = dynamodb({ credentials, createAwsSigner })

await db('PutItem', {
	Item: {
		AlbumTitle: {
			S: 'Somewhat Famous'
		},
		Artist: {
			S: 'No One You Know'
		},
		SongTitle: {
			S: 'Call Me Today'
		}
	}, 
	ReturnConsumedCapacity: 'TOTAL', 
	TableName: 'Music'
});
```

## API



Supported `type` string values:

* [BatchGetItem](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchGetItem-property)
* [BatchWriteItem](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchWriteItem-property)
* [CreateBackup](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createBackup-property)
* [CreateGlobalTable](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createGlobalTable-property)
* [CreateTable](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property)
* [DeleteBackup](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteBackup-property)
* [DeleteItem](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property)
* [DeleteTable](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteTable-property)
* [DescribeBackup](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeBackup-property)
* [DescribeContinuousBackups](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeContinuousBackups-property)
* [DescribeContributorInsights](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeContributorInsights-property)
* [DescribeEndpoints](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeEndpoints-property)
* [DescribeGlobalTable](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeGlobalTable-property)
* [DescribeGlobalTableSettings](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeGlobalTableSettings-property)
* [DescribeLimits](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeLimits-property)
* [DescribeTable](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTable-property)
* [DescribeTableReplicaAutoScaling](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTableReplicaAutoScaling-property)
* [DescribeTimeToLive](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTimeToLive-property)
* [GetItem](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#getItem-property)
* [ListBackups](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listBackups-property)
* [ListContributorInsights](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listContributorInsights-property)
* [ListGlobalTables](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listGlobalTables-property)
* [ListTables](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listTables-property)
* [ListTagsOfResource](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listTagsOfResource-property)
* [PutItem](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property)
* [Query](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property)
* [RestoreTableFromBackup](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#restoreTableFromBackup-property)
* [RestoreTableToPointInTime](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#restoreTableToPointInTime-property)
* [Scan](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property)
* [TagResource](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#tagResource-property)
* [TransactGetItems](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#transactGetItems-property)
* [TransactWriteItems](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#transactWriteItems-property)
* [UntagResource](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#untagResource-property)
* [UpdateContinuousBackups](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateContinuousBackups-property)
* [UpdateContributorInsights](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateContributorInsights-property)
* [UpdateGlobalTable](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateGlobalTable-property)
* [UpdateGlobalTableSettings](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateGlobalTableSettings-property)
* [UpdateItem](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateItem-property)
* [UpdateTable](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTable-property)
* [UpdateTableReplicaAutoScaling](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTableReplicaAutoScaling-property)
* [UpdateTimeToLive](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTimeToLive-property)

## License

Published and released under the [VOL](http://veryopenlicense.com).
