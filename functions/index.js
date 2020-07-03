const config = require('./config.js');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const serviceAccount = require('./portalfox-68431-ddb078d2402a.json');

// Routes
const orgs = require('./routes/orgs.js');
const platform = require('./routes/platform.js');

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());

app.use('/orgs', orgs);
app.use('/platform', platform);

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);