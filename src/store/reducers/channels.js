import {
  SET_CHANNELS,
  SET_ACTIVE_CHANNELS
} from '../actions/channels';

var defaultState = {
  channels: [],
  activeChannel: null
}

const channels = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return {
        ...state,
        channels: action.channels
      };
    case SET_ACTIVE_CHANNELS:
      return {
        ...state,
        activeChannel: action.channel
      };
    default:
      return state;
  }
}


export default channels;
