import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_ID,
      userPoolClientId: import.meta.env.VITE_CLIENT_ID,
      region: import.meta.env.VITE_REGION
    }
  }
};

Amplify.configure(awsConfig);
