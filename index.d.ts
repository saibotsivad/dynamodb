export interface Credentials {
	region: string,
	secretAccessKey: string,
	accessKeyId: string
}

export interface Fetch {
	(url: string, params: { headers: { [key: string]: string }, body: string }): Promise<{ json: string | (() => Promise<object>)}|{ data: string | object }|{ body: string | object }>
}

export interface Input {
	credentials: Credentials,
	fetch: Fetch,
	version?: string
}

export type Method = 'BatchGetItem'
	| 'BatchWriteItem'
	| 'CreateBackup'
	| 'CreateGlobalTable'
	| 'CreateTable'
	| 'DeleteBackup'
	| 'DeleteItem'
	| 'DeleteTable'
	| 'DescribeBackup'
	| 'DescribeContinuousBackups'
	| 'DescribeContributorInsights'
	| 'DescribeEndpoints'
	| 'DescribeGlobalTable'
	| 'DescribeGlobalTableSettings'
	| 'DescribeLimits'
	| 'DescribeTable'
	| 'DescribeTableReplicaAutoScaling'
	| 'DescribeTimeToLive'
	| 'GetItem'
	| 'ListBackups'
	| 'ListContributorInsights'
	| 'ListGlobalTables'
	| 'ListTables'
	| 'ListTagsOfResource'
	| 'PutItem'
	| 'Query'
	| 'RestoreTableFromBackup'
	| 'RestoreTableToPointInTime'
	| 'Scan'
	| 'TagResource'
	| 'TransactGetItems'
	| 'TransactWriteItems'
	| 'UntagResource'
	| 'UpdateContinuousBackups'
	| 'UpdateContributorInsights'
	| 'UpdateGlobalTable'
	| 'UpdateGlobalTableSettings'
	| 'UpdateItem'
	| 'UpdateTable'
	| 'UpdateTableReplicaAutoScaling'
	| 'UpdateTimeToLive'

export function dynamodb(obj: Input): (method: Method, params: object) => Promise<object>;
