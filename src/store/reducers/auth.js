import {
  SET_AUTHENTICATED_USER,
  UNSET_AUTHENTICATED_USER,
  SET_ORGANIZATION_ID
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
    case SET_ORGANIZATION_ID:
      return {
        ...state,
        organizationId: action.orgId
      };
    default:
      return state;
  }
}

export default auth;