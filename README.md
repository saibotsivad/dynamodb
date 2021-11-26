# @saibotsivad/dynamodb

Generate signed HTTP requests to AWS DynamoDB.

## Install

The normal way:

```shell
npm install @saibotsivad/dynamodb
```

## Overview

Instantiate with the normal AWS credentials and a fetch-like interface (see below for compatability notes), then call it to make requests:

```js
import { dynamodb } from '@saibotsivad/dynamodb'

// Normal AWS IAM credentials:
const credentials = {
	region: 'us-east-1',
	secretAccessKey: 'hKVU_EXAMPLE_SECRET_5rjo',
	accessKeyId: 'AKIA_EXAMPLE_KEY'
}

// In a Worker environment (aka Cloudflare Workers) you can use the
// global fetch directly:
const db = dynamodb({ credentials, fetch: globalThis.fetch })

// But in the NodeJS environment, you'll need to use something like "httpie":
import { post } from 'httpie' // only POST is used
const fetch = async (url, options) => post(url, options)
const db = dynamodb({ credentials, fetch })

const response = await db('PutItem', {
	ReturnConsumedCapacity: 'TOTAL',
	TableName: 'Music',
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
})
// response => { ConsumedCapacity: { CapacityUnits: 1, TableName: 'Music' } }
```

## Error Handling

If the response is an error, for example if you try to `PutItem` on a table that doesn't exist, calling `await db` will throw an error named `AwsException` that contains the following properties:

- `name: String` - Will always be `AwsException`.
- `method: String` - This is simply the method name that you provided, e.g. `PutItem`.
- `params: Object` - These are the parameters that were used, e.g. `{ TableName, Item }`.
- `type: String` - The long-form error code from AWS, e.g. `com.amazonaws.dynamodb.v20120810#ResourceNotFoundException`.
- `code: String` - The short-form error code, e.g. `ResourceNotFoundException`.

## API

Instantiate a database using the AWS credentials, and a fetch-like object:

```ts
import { dynamodb } from '@saibotsivad/dynamodb'
const db = dynamodb({
	credentials: {
		region: 'us-east-1',
		secretAccessKey: 'hKVU_EXAMPLE_SECRET_5rjo',
		accessKeyId: 'AKIA_EXAMPLE_KEY'
	},
	fetch: globalThis.fetch
})
```

The `fetch` function must have a signature like `async (method: string, params: object)` and return one of the following:

- `{ json: async function }` - The normal `fetch` does this.
- `{ data: string | object }` - If the `data` property is an object it'll get returned, or if it's a string it'll get JSON-parsed.
- `{ body: string | object }` - Same thing with the `body` property.

## Methods

The DynamoDB API supports the following `method` values:

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
