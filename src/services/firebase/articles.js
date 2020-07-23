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

      db.collectionGroup('articles').where("organizationId", "==", orgId).get()
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
}
