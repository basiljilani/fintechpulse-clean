import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.USER_ID,
      userPoolClientId: import.meta.env.CLIENT_ID, // Changed from userPoolWebClientId
      region: import.meta.env.REGION
    }
  }
};

Amplify.configure(awsConfig);
