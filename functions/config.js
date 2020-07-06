const {OAuth2Client} = require('google-auth-library');

var config = {
  gcloud: {
    clientId: '363106845702-sg7818avj5jv0actub50qer9qpoom27q.apps.googleusercontent.com',
    clientSecret: 'cBqyab6pGYrsevCOYzFBoOTW',
    discoveryURL: 'https://accounts.google.com/.well-known/openid-configuration'
  }
}

config.gcloud.client = new OAuth2Client(config.gcloud.clientId);

module.exports = config;