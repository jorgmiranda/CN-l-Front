export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'a4d0c66a-ba7d-4618-9475-ad2d6bd54a6e',
      authority: 'https://login.microsoftonline.com/9abd8f58-bea4-4ed2-a03b-8b93edc87250',
    },
  },
  apiConfig: {
    scopes: ['User.Read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};

