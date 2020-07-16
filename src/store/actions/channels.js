import ChannelService from "../../services/firebase/channels";
import * as _ from 'lodash';

export const SET_CHANNELS = 'SET_CHANNELS';

// Basic
export function setChannels(channels) {
  return {
    type: SET_CHANNELS, 
    channels
  }
}

// With middleware
export const fetchChannels = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    ChannelService.listByOrganization(_.get(getState().organizations, 'activeOrganization.id'))
      .then((result) => {
        dispatch(setChannels(result.data.channels));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const createChannel = (channelInfo) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let orgId = _.get(getState().organizations, 'activeOrganization.id');
    ChannelService.create({...channelInfo, creator: getState().auth.user.uid}, orgId)
      .then((result) => {
        let newChannels = [...getState().channels.channels, result.data.channels];
        dispatch(setChannels(newChannels));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}
