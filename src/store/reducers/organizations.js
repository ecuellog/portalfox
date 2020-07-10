import {
  SET_ORGANIZATIONS
} from '../actions/organizations';

var defaultState = {
  organizations: [],
  activeOrganization: null
}

const organizations = (state = defaultState, action) => {
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


export default organizations;