import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    userPoolId: import.meta.env.USER_ID,
    userPoolClientId: import.meta.env.CLIENT_ID,
    region: import.meta.env.REGION
  }
};

Amplify.configure(awsConfig);
