import {
  SET_AUTHENTICATED_USER,
  UNSET_AUTHENTICATED_USER
} from '../actions/auth';

var defaultState = {
  user: {},
  isAuthenticated: false
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      };
    case UNSET_AUTHENTICATED_USER:
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
}


export default auth;