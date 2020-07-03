const express = require('express');
const router = express.Router();

const clientId = config.gcloud.clientId;
const client = config.gcloud.client;

// Organization Auth
router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
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

router.post('/googlelogin', (req, res) => {
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

router.post('/googleregister', (req, res) => {
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

module.exports = router;