require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');

var config = {
  general: {
    environment: process.env.ENVIRONMENT || 'dev',
    serverUrl: process.env.SERVER_URL || 'http://localhost:5001/portalfox-68431/us-central1',
    clientUrl: {
      protocol: process.env.CLIENT_URL_PROTO || 'http',
      domain: process.env.CLIENT_URL_DOMAIN || 'lvh.me:4001'
    }
  },
  gcloud: {
    clientId: process.env.G_CLIENT_ID || '363106845702-sg7818avj5jv0actub50qer9qpoom27q.apps.googleusercontent.com',
    clientSecret: process.env.G_CLIENT_SECRET,
    discoveryURL: process.env.G_DISCOVERY_URL || 'https://accounts.google.com/.well-known/openid-configuration',
    serviceAccountLoc: process.env.G_SERVICE_ACCOUNT_LOC || './serviceAccount.json'
  }
}

config.gcloud.client = new OAuth2Client(config.gcloud.clientId);


module.exports = config;