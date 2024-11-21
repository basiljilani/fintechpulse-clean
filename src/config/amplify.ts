import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: import.meta.env.Region,
      userPoolId: import.meta.env.User-ID,
      userPoolClientId: import.meta.env.Client-ID
    }
  }
});