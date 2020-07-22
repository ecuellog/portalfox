import ChannelService from "../../services/firebase/channels";
import * as _ from 'lodash';

export const SET_CHANNELS = 'SET_CHANNELS';
export const SET_ACTIVE_CHANNELS = 'SET_ACTIVE_CHANNELS';

// Basic
export function setChannels(channels) {
  return {
    type: SET_CHANNELS, 
    channels
  }
}

export function setActiveChannel(channel) {
  return {
    type: SET_ACTIVE_CHANNELS, 
    channel
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
        let newChannels = [...getState().channels.channels, result.data.channel];
        dispatch(setChannels(newChannels));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const updateChannel = (channelId, channelInfo) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let orgId = _.get(getState().organizations, 'activeOrganization.id');
    ChannelService.update(channelId, channelInfo, orgId)
      .then((result) => {
        let channels = [...getState().channels.channels];
        let index = channels.findIndex(channel => channel.id === channelId);
        channels[index] = result.data.channel;
        dispatch(setChannels(channels));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const deleteChannel = (channelId) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let orgId = _.get(getState().organizations, 'activeOrganization.id');
    ChannelService.delete(channelId, orgId)
      .then((result) => {
        let newChannels = getState().channels.channels.filter(channel => channel.id !== channelId);
        dispatch(setChannels(newChannels));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
     });
  })
}
