const functions = require('firebase-functions')
const fs = require('fs')
const {OAuth2Client} = require('google-auth-library');
const _ = require('lodash');

let envConfig = _.get(functions.config(), 'env');

if (process.env.NODE_ENV !== 'production') {
  if (fs.existsSync('./env.json')) {
    const env = require('./env.json')
    envConfig = env
  }
}

var config = {
  general: {
    environment: _.get(envConfig, 'general.environment') || 'development',
    serverUrl: _.get(envConfig, 'general.serverUrl') || 'http://localhost:5001/portalfox-dev/us-central1',
    clientUrl: {
      protocol: _.get(envConfig, 'general.clientUrl.protocol') || 'http',
      domain: _.get(envConfig, 'general.clientUrl.domain') || 'lvh.me:4001'
    }
  },
  gcloud: {
    clientId: _.get(envConfig, 'gcloud.clientId'),
    clientSecret: _.get(envConfig, 'gcloud.clientSecret'),
    discoveryURL: _.get(envConfig, 'gcloud.discoveryURL') || 'https://accounts.google.com/.well-known/openid-configuration',
    serviceAccountLoc: _.get(envConfig, 'gcloud.serviceAccountLoc') || './serviceAccount.json'
  }
}

config.gcloud.client = new OAuth2Client(config.gcloud.clientId);


module.exports = config;