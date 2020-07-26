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

  static create(orgId, channelId, articleInfo) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      
      const orgRef = db.collection('organizations').doc(orgId);
      const channelRef = orgRef.collection('channels').doc(channelId);
      const articleRef = channelRef.collection('articles').doc();
      
      articleRef.set({...articleInfo, organizationId: orgId})
        .then(() => {
          resolve({
            message: `Article has been successfully created.`,
            data: {
              article: {
                ...articleInfo,
                id: articleRef.id
              }
            }
          }); 
        })
        .catch((error) => {
          console.error(error);
          reject(`There was an error creating the article.`);
        });
    });
  }
}
