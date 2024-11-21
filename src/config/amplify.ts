import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    Cognito: {
      region: 'eu-north-1',
      userPoolId: 'eu-north-1_jXA96EecY',
      userPoolClientId: '3f55i03d3hapos76jj9ighluio'
    }
  }
};

Amplify.configure(awsConfig);