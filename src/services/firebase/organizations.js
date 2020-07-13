import * as firebase from 'firebase/app';

export default class OrganizationService {
  static listByUser(userId) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection('organizations').where('owner', '==', userId).get()
        .then((querySnapshot) => {
          let orgs = [];
          querySnapshot.forEach(function(doc) {
            orgs.push({id: doc.id, ...doc.data()});
          });
          resolve({
            message: 'Fetched user organizations',
            data: {
              organizations: orgs
            }
          })
        })
        .catch((error) => {
          reject('There was an error fetching user organizations');
        });
    });
  }

  static getBySubdomain(subdomain) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection('organizations').where('subdomain', '==', subdomain).get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            resolve(null);
          } else {
            let orgs = [];
            querySnapshot.forEach(function(doc) {
              orgs.push({id: doc.id, ...doc.data()});
            });
            
            if (orgs.length > 1) {
              reject('There are more than one registered organizations using the same subdomain.')
            } else {
              resolve(orgs[0]);
            }
          }
        })
        .catch((error) => {
          reject('There was an error fetching organization. Error: ' + error);
        });
    });
  }

  static create(orgInfo) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      // Check that the subdomain doesn't already exist
      db.collection('subdomains').doc(orgInfo.subdomain).get()
        .then((doc) => {
          if(!doc.exists) {
            const batch = db.batch();
            const orgRef = db.collection('organizations').doc();
            const subdomainRef = db.collection('subdomains').doc(orgInfo.subdomain);

            let orgObj = {...orgInfo, createdAt: firebase.firestore.FieldValue.serverTimestamp()};
        
            batch.set(orgRef, orgObj);
            batch.set(subdomainRef, {});
        
            batch.commit()
              .then(() => {
                resolve({
                  message: 'Organization has been successfully created.',
                  data: {
                    organization: {
                      ...orgObj,
                      id: orgRef.id
                    }
                  }
                });
              })
              .catch((error) => {
                reject('There was an error creating the organization. Please try again. Error: ' + error);
              })
          } else {
            reject('This subdomain has already been taken, please select another.');
          }
        }).catch((error) => {
          reject('There was an error creating the organization. Please try again. Error: ' + error);
        })
    });
  }

  static subdomainExists(subdomain) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      
      db.collection('subdomains').doc(subdomain).get()
        .then((doc) => {
          resolve(doc.exists)
        }).catch((error) => {
          reject('There was an error checking the subdomain' + error);
        })
    });
  }
}