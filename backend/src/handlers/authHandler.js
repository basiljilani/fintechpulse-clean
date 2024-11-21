import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Extract user data from the Cognito authorizer
    const username = event.requestContext?.authorizer?.claims['cognito:username'];
    const email = event.requestContext?.authorizer?.claims?.email;

    if (!username || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required user information'
        })
      };
    }

    // Store user data in DynamoDB
    const params = {
      TableName: 'user-data',
      Item: {
        UserId: username,
        Email: email,
        CreatedAt: new Date().toISOString(),
        LastLogin: new Date().toISOString()
      }
    };

    await ddb.send(new PutCommand(params));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'User authenticated and data stored successfully',
        user: {
          username,
          email
        }
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString()
      })
    };
  }
};