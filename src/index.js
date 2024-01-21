import { createAwsSigner } from 'sign-aws-requests'

class AwsException extends Error {
	constructor(method, params, data) {
		super(data.message || 'Unknown error from AWS.')
		this.name = 'AwsException'
		this.method = method
		this.params = params
		this.type = data.__type
		this.code = data.__type.split('#').pop()
	}
}

// eslint-disable-next-line valid-jsdoc
/**
 * Instantiate a DynamoDB requester using credentials and a fetch-like function.
 * @type {import("../index").dynamodb}
 */
export function dynamodb({
	credentials: { region, secretAccessKey, accessKeyId, sessionToken },
	fetch: makeRequest,
	version = '20120810',
}) {
	const sign = createAwsSigner({
		config: {
			service: 'dynamodb',
			region,
			secretAccessKey,
			accessKeyId,
		},
	})

	return async (method, params) => {
		const request = {
			url: `https://dynamodb.${region}.amazonaws.com`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-amz-json-1.0',
				'X-Amz-Target': `DynamoDB_${version}.${method}`,
				Host: `dynamodb.${region}.amazonaws.com`,
			},
			body: JSON.stringify(params),
		}
		if (sessionToken) request.headers['X-Amz-Security-Token'] = sessionToken
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
		if (typeof response.json === 'function') data = await response.json()
		else if (typeof response.data === 'string') data = JSON.parse(response.data)
		else if (typeof response.body === 'string') data = JSON.parse(response.body)
		else data = response.data || response.body

		// Then we look for errors to throw.
		if (data.__type) throw new AwsException(method, params, data)

		// Otherwise return whatever came back.
		return data
	}
}
