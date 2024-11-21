import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_vPQXdsFwP',
      userPoolClientId: '6ehfpihp1om85qkpa4vmtlh533',
      region: 'eu-north-1'
    }
  }
};

Amplify.configure(awsConfig);