
import { dynamodb } from './index'

const request = dynamodb({
    credentials: {
        region: 'us-east-1',
        secretAccessKey: 'yolo',
        accessKeyId: 'key1'
    },
    createAwsSigner: ({ config }) => {
        return async () => {
            return { authorization: 'asdf' }
        }
    }
})

const p = request('BatchWriteItem', {})
