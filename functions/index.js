const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

admin.initializeApp({
  projectId: 'portalfox-68431',
  serviceAccountId: 'firebase-adminsdk-ll5uj@portalfox-68431.iam.gserviceaccount.com'
});

exports.spaceSignUp = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');   //TODO: This is probably unsafe
  console.log(req.body);
  // Need to see: Email, password, organizationID
  // TODO: Check for an active invitation to join this space...

  let userId = `${req.body.email}-${req.body.organizationID}`;
  let additionalClaims = {
    email: req.body.email,
    organization: req.body.organizationID,
    spaceOnlyAccount: true
  };

  bcrypt.hash(req.body.password, 10)
    .then(passwordHash => {
      return admin.firestore()
        .collection('organizations').doc(req.body.organization)
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
    .catch((error) => {
      return res.json({error});
    });
});

exports.spaceLogIn = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');   //TODO: This is probably unsafe
  console.log(req.body);
  // Need to see: Email, password, organizationID

  let userId = `${req.body.email}-${req.body.organizationID}`;

  admin.firestore()
    .collection('organizations').doc(req.body.organization)
    .collection('employee_auth').doc(userId)
    .get()
    .then((userDoc) => {
      if(userDoc.exists) {
        return bcrypt.compare(req.body.password, userDoc.data().passwordHash)
      } else {
        throw new Error('Authentication failed.');
      }
    })
    .then((result) => {
      if (result) {
        return admin.auth().createCustomToken(userId, additionalClaims)
      } else {
        throw new Error('Authentication failed.');
      }
    })
    .then(function(customToken) {
      return res.json({token: customToken});
    })
    .catch(function(error) {
      return res.json({error});
    });
});