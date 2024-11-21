const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

exports.handler = async (event, context) => {
  try {
    // Get user data from Cognito authorizer
    const username = event.requestContext.authorizer.claims['cognito:username'];
    const email = event.requestContext.authorizer.claims.email;

    // Store user data in DynamoDB
    const params = {
      TableName: 'Users',
      Item: {
        userId: username,
        email: email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }
    };

    await ddb.send(new PutCommand(params));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
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
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: error.message,
        reference: context.awsRequestId
      })
    };
  }
};