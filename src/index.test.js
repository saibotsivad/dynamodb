import { send } from 'httpie'
import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { dynamodb } from './index.js'

const credentials = {
	region: process.env.AWS_REGION,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
}
const TableName = process.env.DYNAMODB_TABLE
const fetch = async (url, options) => send(options.method, url, options)
const db = dynamodb({ credentials, fetch })

const TEST_STRING = Math.random().toString()
const TEST_KEY = Date.now().toString() + '-' + TEST_STRING

test('really simple put+get+remove to make sure everything works', async () => {
	const put = await db('PutItem', {
		TableName,
		Item: {
			pk: {
				S: 'test',
			},
			sk: {
				S: TEST_KEY,
			},
			text: {
				S: TEST_STRING,
			},
		},
		ReturnConsumedCapacity: 'TOTAL',
	})
	assert.equal(put.ConsumedCapacity.TableName, TableName, 'the put was a success')
	const get = await db('GetItem', {
		TableName,
		Key: {
			pk: {
				S: 'test',
			},
			sk: {
				S: TEST_KEY,
			},
		},
		ConsistentRead: true,
	})
	assert.equal(get.Item.text.S, TEST_STRING, 'the get yields the put object')
	const del = await db('DeleteItem', {
		TableName,
		Key: {
			pk: {
				S: 'test',
			},
			sk: {
				S: TEST_KEY,
			},
		},
		ReturnValues: 'ALL_OLD',
	})
	assert.equal(del.Attributes.text.S, TEST_STRING, 'the delete gives the old props')
	// make sure it's deleted
	const secondGet = await db('GetItem', {
		TableName,
		Key: {
			pk: {
				S: 'test',
			},
			sk: {
				S: TEST_KEY,
			},
		},
		ConsistentRead: true,
	})
	assert.not.ok(secondGet.Item, 'it is empty')
	// assert.not.ok(secondGet.Item, 'the get does not yield anything')
	// now we try to do something that we can't, to make sure errors
	let error
	try {
		await db('GetItem', {
			TableName: TableName + 'DoesNotExist',
			Key: {
				pk: {
					S: 'does-not-exist',
				},
			},
		})
	} catch (e) {
		error = e
	}
	assert.equal(error.method, 'GetItem', 'has the method')
	assert.equal(error.params.Key.pk.S, 'does-not-exist', 'passes along the params correctly')
	assert.equal(error.type, 'com.amazonaws.dynamodb.v20120810#ResourceNotFoundException', 'has the long version')
	assert.equal(error.code, 'ResourceNotFoundException', 'has the short version')
	assert.equal(error.message, 'Requested resource not found', 'has the message from AWS')
})

test.run()
