const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');

const app = express();

admin.initializeApp({
  projectId: 'portalfox-68431',
  serviceAccountId: 'firebase-adminsdk-ll5uj@portalfox-68431.iam.gserviceaccount.com'
});

app.use(cors());

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
  res.set('Access-Control-Allow-Origin', '*');   //TODO: This is probably unsafe
  console.log(req.body);
  // Need to see: Email, password, organizationId

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

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);