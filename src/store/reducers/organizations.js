import {
  SET_ORGANIZATIONS,
  SET_ACTIVE_ORGANIZATION,
  SET_FIRST_ORGANIZATIONS_FETCH_DONE
} from '../actions/organizations';

var defaultState = {
  organizations: [],
  firstOrganizationsFetchDone: false,
  activeOrganization: null
}

const organizations = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.organizations
      };
    case SET_ACTIVE_ORGANIZATION:
      return {
        ...state,
        activeOrganization: action.organization
      };
    case SET_FIRST_ORGANIZATIONS_FETCH_DONE:
      return {
        ...state,
        firstOrganizationsFetchDone: action.value
      };
    default:
      return state;
  }
}


export default organizations;