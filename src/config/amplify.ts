import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: import.meta.env.REGION,
      userPoolId: import.meta.env.USER_ID,
      userPoolClientId: import.meta.env.CLIENT_ID
    }
  }
});