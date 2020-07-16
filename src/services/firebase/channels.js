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
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      
      const orgRef = db.collection('organizations').doc(orgId);
      const channelRef = orgRef.collection('channels').doc();
      
      channelRef.set(channelInfo)
        .then(() => {
          resolve({
            message: 'Channel has been successfully created.',
            data: {
              channel: {
                ...channelInfo,
                id: channelRef.id
              }
            }
          }); 
        })
        .catch((error) => {
          reject('There was an error creating the channel.');
        });
    });
  }
}
