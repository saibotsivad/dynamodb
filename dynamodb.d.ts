export interface Configuration {
	service: string,
	region: string,
	secretAccessKey: string,
	accessKeyId: string
}

export interface SignCreatorInput {
	config: Configuration
}

export interface Headers {
	Host: string,
	'Content-Type': string,
	'X-Amz-Target': string,
	Authorization?: string
}

export interface Request {
	url: string,
	method: string,
	body: string,
	headers: Headers
}

export interface Signer {
	(input: Request): Promise<{ authorization: string }>
}

export interface SignCreator {
	(input: SignCreatorInput): Signer
}

export interface Credentials {
	region: string,
	secretAccessKey: string,
	accessKeyId: string
}

export interface Input {
	credentials: Credentials,
	createAwsSigner: SignCreator,
	version?: string
}

export type DynamodbRequestType = 'BatchGetItem'
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
