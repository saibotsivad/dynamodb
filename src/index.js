import { createAwsSigner } from 'sign-aws-requests'

class AwsException extends Error {
	constructor(type, params, code, message) {
		super(message)
		this.name = 'AwsException'
		this.code = code
		this.message = message
		this.type = type
		this.params = params
	}
}

export const dynamodb = ({
	credentials: { region, secretAccessKey, accessKeyId },
	fetch: makeRequest,
	version = '20120810',
}) => {
	const sign = createAwsSigner({
		config: {
			service: 'dynamodb',
			region,
			secretAccessKey,
			accessKeyId,
		},
	})

	return async (type, params) => {
		const request = {
			url: `https://dynamodb.${region}.amazonaws.com`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-amz-json-1.0',
				'X-Amz-Target': `DynamoDB_${version}.${type}`,
				Host: `dynamodb.${region}.amazonaws.com`,
			},
			body: JSON.stringify(params),
		}
		const { authorization } = await sign(request)
		request.headers.Authorization = authorization

		// Make a guarded fetch in case the fetching implementation throws on bad responses.
		let response
		try {
			response = await makeRequest(request.url, request)
		} catch (error) {
			response = error
		}

		// We'll try the few different common ways to get the data.
		let data
		if (typeof response.json === 'function') data = response.json()
		else if (typeof response.data === 'string') data = JSON.parse(response.data)
		else data = response.data || response.body

		// Then we look for errors to throw.
		if (data.__type) throw new AwsException(type, params, data.__type.split('#').pop(), data.message)

		// Otherwise return whatever came back.
		return data
	}
}
