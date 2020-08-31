const express = require('express');
const router = express.Router();
const config = require('../config.js');
const admin = require('firebase-admin');

const clientId = config.gcloud.clientId;
const client = config.gcloud.client;

// Main platform Auth
router.post('/googlelogin', (req, res) => {
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

router.post('/googleregister', (req, res) => {
  console.log(req.body);
  // Need to see: tokenId

  client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: clientId
  })
    .then((decodedToken) => {
      const payload = decodedToken.getPayload();
      return admin.auth().getUser(payload.sub)
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
    .catch((error) => {
      return res.status(500).json({error: 'Something went wrong.'})
    })
});

module.exports = router;