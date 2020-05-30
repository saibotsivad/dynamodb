export function dynamodb({ credentials: { region, secretAccessKey, accessKeyId }, createAwsSigner, version = '20120810' }) {
	const sign = createAwsSigner({
		config: {
			service: 'dynamodb',
			region,
			secretAccessKey,
			accessKeyId
		}
	})

	return async (type, params) => {
		const request = {
			url: `https://dynamodb.${region}.amazonaws.com`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-amz-json-1.0',
				'X-Amz-Target': `DynamoDB_${version}.${type}`,
				Host: `dynamodb.${region}.amazonaws.com`
			},
			body: JSON.stringify(params)
		}
		const { authorization } = await sign(request)
		request.headers.Authorization = authorization
		return request
	}
}
