const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const serviceAccount = require('./portalfox-68431-ddb078d2402a.json');

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const clientId = '363106845702-sg7818avj5jv0actub50qer9qpoom27q.apps.googleusercontent.com';

const client = new OAuth2Client(clientId);

app.use(cors());


// Organization Auth
app.post('/spaceSignUp', (req, res) => {
  console.log(req.body);
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
      return res.json({error: 'Something went wrong.'});
    });
});

app.post('/spaceLogIn', (req, res) => {
  console.log(req.body);
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

app.post('/orgGoogleLogin', (req, res) => {
  console.log(req.body);
  // Need to see: tokenId, organizationId

  client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: clientId
  })
    .then((decodedToken) => {
      console.log(decodedToken);
      let payload = decodedToken.getPayload();
      return admin.auth().getUser(`${payload.sub}${organizationId}`)
    })
    .then((userRecord) => {
      return admin.auth().createCustomToken(userRecord.uid);
    })
    .then((customToken) => {
      return res.json({token: customToken});
    })
    .catch((error) => {
      if(error.code === 'auth/user-not-found') {
        return res.status(403).json({error: 'User does not exist. Please register.'});
      }
      console.log(error);
      return res.status(403).json({error: 'Invalid token'});
    });
});

app.post('/orgGoogleRegister', (req, res) => {
  console.log(req.body);
  // Need to see: tokenId, OrganizationId
  // TODO: Check for registration invite

  client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: clientId
  })
    .then((decodedToken) => {
      const payload = decodedToken.getPayload();
      admin.auth().getUser(`${payload.sub}${organizationId}`)
      .then(() => {
        return res.status(403).json({error: 'User already registered. Please log in.'});
      })
      .catch((error) => {
        if(error.code === 'auth/user-not-found') {
          admin.auth().createCustomToken(`${payload.sub}${organizationId}`)
            .then((customToken) => {
              console.log('Sending custom token');
              console.log(customToken);
              return res.json({token: customToken});
            })
            .catch((error) => {
              return res.status(500).json({error: 'Something went wrong.'})
            })
        } else {
          console.log(error);
          return res.status(403).json({error: 'Failed to verify token.'});
        }
      })
    })
});

// Main platform Auth
app.post('/platformGoogleLogin', (req, res) => {
  console.log(req.body);
  // Need to see: tokenId

  client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: clientId
  })
    .then((decodedToken) => {
      console.log(decodedToken);
      let payload = decodedToken.getPayload();
      return admin.auth().getUser(payload.sub)
    })
    .then((userRecord) => {
      return admin.auth().createCustomToken(userRecord.uid);
    })
    .then((customToken) => {
      return res.json({token: customToken});
    })
    .catch((error) => {
      if(error.code === 'auth/user-not-found') {
        return res.status(403).json({error: 'User does not exist. Please register.'});
      }
      console.log(error);
      return res.status(403).json({error: 'Invalid token'});
    });
});

app.post('/platformGoogleRegister', (req, res) => {
  console.log(req.body);
  // Need to see: tokenId

  client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: clientId
  })
    .then((decodedToken) => {
      const payload = decodedToken.getPayload();
      admin.auth().getUser(payload.sub)
      .then(() => {
        return res.status(403).json({error: 'User already registered. Please log in.'});
      })
      .catch((error) => {
        if(error.code === 'auth/user-not-found') {
          admin.auth().createCustomToken(payload.sub)
            .then((customToken) => {
              console.log('Sending custom token');
              console.log(customToken);
              return res.json({token: customToken});
            })
            .catch((error) => {
              return res.status(500).json({error: 'Something went wrong.'})
            })
        } else {
          console.log(error);
          return res.status(403).json({error: 'Failed to verify token.'});
        }
      })
    })
});

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);