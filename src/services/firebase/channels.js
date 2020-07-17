import * as firebase from 'firebase/app';

export default class ChannelService {
  static listByOrganization(orgId) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection('organizations').doc(orgId)
        .collection('channels').get()
        .then((querySnapshot) => {
          let channels = [];
          querySnapshot.forEach(function(doc) {
            channels.push({id: doc.id, ...doc.data()});
          });
          resolve({
            message: 'Fetched channels',
            data: {
              channels: channels
            }
          })
        })
        .catch((error) => {
          console.log(error);
          reject('There was an error fetching channels');
        });
    });
  }

  static create(channelInfo, orgId) {
    return createOrUpdate(null, channelInfo, orgId);
  }

  static update(channelId, channelInfo, orgId) {
    return createOrUpdate(channelId, channelInfo, orgId);
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
  });
}