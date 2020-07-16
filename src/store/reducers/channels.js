import {
  SET_CHANNELS
} from '../actions/channels';

var defaultState = {
  channels: [],
}

const channels = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return {
        ...state,
        channels: action.channels
      };
    default:
      return state;
  }
}


export default channels;
