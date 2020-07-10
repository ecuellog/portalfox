import {
  SET_AUTHENTICATED_USER,
  UNSET_AUTHENTICATED_USER,
  SET_ORGANIZATION
} from '../actions/auth';

var defaultState = {
  user: {},
  isAuthenticated: false,
  organizationId: null
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
    case SET_ORGANIZATION:
      return {
        ...state,
        organization: action.org
      };
    default:
      return state;
  }
}

export default auth;