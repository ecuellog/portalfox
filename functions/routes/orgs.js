const express = require('express');
const router = express.Router();
const config = require('../config.js');
const admin = require('firebase-admin');
const axios = require('axios');
const url = require('url');
const bcrypt = require('bcrypt');

const clientId = config.gcloud.clientId;
const client = config.gcloud.client;

// Organization Auth
router.post('/register', (req, res) => {
  // Need to see: Email, password, organizationId
  // TODO: Check for an active invitation to join this space...

  let userId = `${req.body.email}-${req.body.organizationId}`;
  let additionalClaims = {
    email: req.body.email,
    organization: req.body.organizationId,
    spaceOnlyAccount: true
  };

  bcrypt.hash(req.body.password, 10)
    .then(passwordHash => {
      return admin.firestore()
        .collection('organizations').doc(req.body.organizationId)
        .collection('employee_auth').doc(userId)
        .set({
          passwordHash
        })
    })
    .then(() => {
      return admin.auth().createCustomToken(userId, additionalClaims)
    })
    .then((customToken) => {
      return res.json({token: customToken});
    })
    .catch((err) => {
      return res.json({
        error: 'Something went wrong.',
        data: err
      });
    });
});

router.post('/login', (req, res) => {
  // Need to see: Email, password, organizationId
  // TODO: Add validation?

  let userId = `${req.body.email}-${req.body.organizationId}`;

  admin.firestore()
    .collection('organizations').doc(req.body.organizationId)
    .collection('employee_auth').doc(userId)
    .get()
    .then((userDoc) => {
      if(userDoc.exists) {
        return bcrypt.compare(req.body.password, userDoc.data().passwordHash)
      } else {
        return res.status(403).send({error: 'Authentication failed.'});
      }
    })
    .then((result) => {
      if (result) {
        return admin.auth().createCustomToken(userId)
      } else {
        return res.status(403).send({error: 'Authentication failed.'});
      }
    })
    .then((customToken) => {
      return res.json({token: customToken});
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({error: 'Something went wrong.'});
    });
});

router.get('/googleRegisterRedirect', async (req, res) => {
  // TODO: Check invite code
  // TODO: Redirect on errors, also better error handling
  
  if (req.query.state) {
    var state = JSON.parse(req.query.state);
    var organizationId = state.orgId;
    var inviteCode = state.inviteCode;
    try {
      var organizationDoc = await admin.firestore()
        .collection('organizations').doc(organizationId)
        .get()
      var organization = organizationDoc.data();
    } catch (err) {
      res.status(400).json({error: 'Bad request.'});
    }
  } else {
    res.status(400).json({error: 'Bad request.'});
  }

  let payload = null;

  // Get Google OAuth Endpoints from the Discovery API
  axios.get(config.gcloud.discoveryURL)
    .then((discoveryDoc) => {
      return axios.post(discoveryDoc.data.token_endpoint, {
        code: req.query.code,
        client_id: config.gcloud.clientId,
        client_secret: config.gcloud.clientSecret,
        redirect_uri: `${config.general.serverUrl}/widgets/orgs/googleRegisterRedirect`,
        grant_type: 'authorization_code'
      })
    })
    .then((res) => {
      return client.verifyIdToken({
        idToken: res.data.id_token,
        audience: clientId
      })
    })
    .then((decodedToken) => {
      payload = decodedToken.getPayload();
      if (organization.owner === payload.sub) {
        return admin.auth().getUser(`${payload.sub}`);
      }
      return admin.auth().getUser(`${payload.sub}-${organizationId}`);
    })
    .then(() => {
      return res.status(403).json({error: 'User already registered. Please log in.'});
    })
    .catch((error) => {
      if(error.code === 'auth/user-not-found') {
        admin.auth().createCustomToken(`${payload.sub}-${organizationId}`)
          .then((customToken) => {
            return res.redirect(url.format({
              pathname: `${config.general.clientUrl.protocol}://${organization.subdomain}.${config.general.clientUrl.domain}/googleAuthReturn`,
              query: {
                token: customToken
              }
            }));
          })
          .catch((error) => {
            return res.status(500).json({error: 'Something went wrong.'})
          })
      } else {
        console.log(error);
        return res.status(500).json({error: 'Something went wrong.'});
      }
    })
});

router.get('/googleLoginRedirect', async (req, res) => {
  // TODO: Redirect on errors, also better error handling
  if (req.query.state) {
    var organizationId = JSON.parse(req.query.state).orgId
    try {
      var organizationDoc = await admin.firestore()
        .collection('organizations').doc(organizationId)
        .get()
      var organization = organizationDoc.data();
      if(!organization) {
        return res.status(400).json({error: 'Bad request.'});
      }
    } catch (err) {
      return res.status(400).json({error: 'Bad request.'});
    }
  } else {
    return res.status(400).json({error: 'Bad request.'});
  }

  // Get Google OAuth Endpoints from the Discovery API
  axios.get(config.gcloud.discoveryURL)
    // Get Access Token
    .then((discoveryDoc) => {
      return axios.post(discoveryDoc.data.token_endpoint, {
        code: req.query.code,
        client_id: config.gcloud.clientId,
        client_secret: config.gcloud.clientSecret,
        redirect_uri: `${config.general.serverUrl}/widgets/orgs/googleLoginRedirect`,
        grant_type: 'authorization_code'
      })
    })
    // Verify Access Token and decode
    .then((res) => {
      return client.verifyIdToken({
        idToken: res.data.id_token,
        audience: clientId
      })
    })
    .then((decodedToken) => {
      let payload = decodedToken.getPayload();
      if (organization.owner === payload.sub) {
        return admin.auth().getUser(`${payload.sub}`);
      }
      return admin.auth().getUser(`${payload.sub}-${organizationId}`)
    })
    .then((userRecord) => {
      return admin.auth().createCustomToken(userRecord.uid);
    })
    .then((customToken) => {
      return res.redirect(url.format({
        pathname: `${config.general.clientUrl.protocol}://${organization.subdomain}.${config.general.clientUrl.domain}/googleAuthReturn`,
        query: {
          token: customToken
        }
      }));
    })
    .catch((error) => {
      if(error.code === 'auth/user-not-found') {
        return res.status(403).json({error: 'User does not exist. Please register.'});
      }
      console.log(error);
      return res.status(403).json({error: 'Invalid token'});
    });
});

module.exports = router;
