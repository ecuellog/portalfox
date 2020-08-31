const config = require('./config.js');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');

// Routes
const orgs = require('./routes/orgs.js');
const platform = require('./routes/platform.js');

const app = express();

if (config.general.environment === 'development') {
  const serviceAccount = require(config.gcloud.serviceAccountLoc);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  admin.initializeApp();
}

app.use(cors());

app.use('/orgs', orgs);
app.use('/platform', platform);

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);