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

The DynamoDB API supports all valid DynamoDB service methods.

> # How to Read the Docs
>
> To figure out what your request parameters and response object should look like, have a look at the AWS docs.
>
> * **v2:** For each link, there is a description of the service and an example of its use. For each service, after the example is a long, sometimes difficult to read, list of parameters and their meaning.
> * **v3:** For each link you'll find the same description and examples, but the request parameters are called "input" and the response is called "output". For example, on the [BatchGetItem](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/batchgetitemcommand.html) docs page, you'll find a link to [BatchGetItemCommandInput](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/interfaces/batchgetitemcommandinput.html) and [BatchGetItemCommandOutput](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/interfaces/batchgetitemcommandoutput.html) which you'll need to click into to figure out the parameters of each.

* BatchGetItem ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchGetItem-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/batchgetitemcommand.html))
* BatchWriteItem ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchWriteItem-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/batchwriteitemcommand.html))
* CreateBackup ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createBackup-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/createbackupcommand.html))
* CreateGlobalTable ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createGlobalTable-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/createglobaltablecommand.html))
* CreateTable ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/createtablecommand.html))
* DeleteBackup ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteBackup-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/deletebackupcommand.html))
* DeleteItem ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/deleteitemcommand.html))
* DeleteTable ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteTable-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/deletetablecommand.html))
* DescribeBackup ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeBackup-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describebackupcommand.html))
* DescribeContinuousBackups ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeContinuousBackups-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describecontinuousbackupscommand.html))
* DescribeContributorInsights ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeContributorInsights-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describecontributorinsightscommand.html))
* DescribeEndpoints ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeEndpoints-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describeendpointscommand.html))
* DescribeGlobalTable ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeGlobalTable-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describeglobaltablecommand.html))
* DescribeGlobalTableSettings ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeGlobalTableSettings-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describeglobaltablesettingscommand.html))
* DescribeLimits ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeLimits-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describelimitscommand.html))
* DescribeTable ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTable-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describetablecommand.html))
* DescribeTableReplicaAutoScaling ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTableReplicaAutoScaling-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describetablereplicaautoscalingcommand.html))
* DescribeTimeToLive ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTimeToLive-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/describetimetolivecommand.html))
* GetItem ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#getItem-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/getitemcommand.html))
* ListBackups ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listBackups-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/listbackupscommand.html))
* ListContributorInsights ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listContributorInsights-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/listcontributorinsightscommand.html))
* ListGlobalTables ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listGlobalTables-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/listglobaltablescommand.html))
* ListTables ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listTables-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/listtablescommand.html))
* ListTagsOfResource ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listTagsOfResource-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/listtagsofresourcecommand.html))
* PutItem ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/putitemcommand.html))
* Query ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/querycommand.html))
* RestoreTableFromBackup ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#restoreTableFromBackup-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/restoretablefrombackupcommand.html))
* RestoreTableToPointInTime ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#restoreTableToPointInTime-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/restoretabletopointintimecommand.html))
* Scan ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/scancommand.html))
* TagResource ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#tagResource-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/tagresourcecommand.html))
* TransactGetItems ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#transactGetItems-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/transactgetitemscommand.html))
* TransactWriteItems ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#transactWriteItems-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/transactwriteitemscommand.html))
* UntagResource ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#untagResource-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/untagresourcecommand.html))
* UpdateContinuousBackups ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateContinuousBackups-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updatecontinuousbackupscommand.html))
* UpdateContributorInsights ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateContributorInsights-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updatecontributorinsightscommand.html))
* UpdateGlobalTable ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateGlobalTable-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updateglobaltablecommand.html))
* UpdateGlobalTableSettings ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateGlobalTableSettings-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updateglobaltablesettingscommand.html))
* UpdateItem ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateItem-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updateitemcommand.html))
* UpdateTable ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTable-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updatetablecommand.html))
* UpdateTableReplicaAutoScaling ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTableReplicaAutoScaling-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updatetablereplicaautoscalingcommand.html))
* UpdateTimeToLive ([v2 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTimeToLive-property) | [v3 docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/updatetimetolivecommand.html))

## License

Published and released under the [VOL](http://veryopenlicense.com).
