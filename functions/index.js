const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'portalfox-68431',
  serviceAccountId: 'firebase-adminsdk-ll5uj@portalfox-68431.iam.gserviceaccount.com'
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.globalSignUp = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  let userId = 'some-uid';
  let additionalClaims = {
    email: 'ecuellogtest@gmail.com'
  };

  admin.auth().createCustomToken(userId, additionalClaims)
    .then(function(customToken) {
      console.log(customToken);
      return res.json({token: customToken});
    })
    .catch(function(error) {
      console.log('Error creating custom token:', error);
      return res.json({error: "error"});
    });
});