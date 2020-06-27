import {
  SET_ORGANIZATIONS
} from '../actions/organizations';

var defaultState = {
  organizations: []
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.organizations
      };
    default:
      return state;
  }
}


export default auth;