import * as firebase from 'firebase/app';

export default class ArticleService {
  static listByChannel(orgId, channelId) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection('organizations').doc(orgId)
        .collection('channels').doc(channelId)
        .collection('articles').get()
        .then((querySnapshot) => {
          let articles = [];
          querySnapshot.forEach(function(doc) {
            articles.push({id: doc.id, ...doc.data()});
          });
          resolve({
            message: 'Fetched articles',
            data: {
              articles: articles
            }
          })
        })
        .catch((error) => {
          console.log(error);
          reject('There was an error fetching articles');
        });
    });
  }

  static listByOrganization(orgId) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection('organizations').doc(orgId)
        .collectionGroup('articles').get()
        .then((querySnapshot) => {
          let articles = [];
          querySnapshot.forEach(function(doc) {
            articles.push({id: doc.id, ...doc.data()});
          });
          resolve({
            message: 'Fetched articles',
            data: {
              articles: articles
            }
          })
        })
        .catch((error) => {
          console.log(error);
          reject('There was an error fetching articles');
        });
    });
  }

  /*static create(channelInfo, orgId) {
    return createOrUpdate(null, channelInfo, orgId);
  }

  static update(channelId, channelInfo, orgId) {
    return createOrUpdate(channelId, channelInfo, orgId);
  }
  

  static delete(channelId, orgId) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      
      const orgRef = db.collection('organizations').doc(orgId);
      const channelRef = orgRef.collection('channels').doc(channelId);
      
      channelRef.delete()
        .then(() => {
          resolve({
            message: `Channel has been successfully deleted.`,
            data: {
              channeId: channelId 
            }
          }); 
        })
        .catch((error) => {
          console.error(error);
          reject(`There was an error deleting the channel.`);
        });
    });
  }
}

function createOrUpdate(channelId, channelInfo, orgId) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    
    const orgRef = db.collection('organizations').doc(orgId);

    let channelRef;
    if (channelId) {
      channelRef = orgRef.collection('channels').doc(channelId);
    } else {
      channelRef = orgRef.collection('channels').doc();
    }
    
    channelRef.set(channelInfo, { merge: true })
      .then(() => {
        resolve({
          message: `Channel has been successfully ${channelId ? 'updated': 'created'}.`,
          data: {
            channel: {
              ...channelInfo,
              id: channelRef.id
            }
          }
        }); 
      })
      .catch((error) => {
        console.error(error);
        reject(`There was an error ${channelId ? 'updating': 'creating'} the channel.`);
      });
  });*/
}
