import OrganizationService from "../../services/firebase/organizations";

export const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS';
export const SET_ACTIVE_ORGANIZATION = 'SET_ACTIVE_ORGANIZATION';
export const SET_FIRST_ORGANIZATIONS_FETCH_DONE = 'SET_FIRST_ORGANIZATIONS_FETCH_DONE';

// Basic
export function setOrganizations(organizations) {
  return {
    type: SET_ORGANIZATIONS,
    organizations
  }
}

export function setActiveOrganization(organization) {
  return {
    type: SET_ACTIVE_ORGANIZATION,
    organization
  }
}

export function setFirstOrganizationsFetchDone(value) {
  return {
    type: SET_FIRST_ORGANIZATIONS_FETCH_DONE,
    value
  }
}

// With middleware
export const fetchOrganizations = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    OrganizationService.listByUser(getState().auth.user.uid)
      .then((result) => {
        dispatch(setOrganizations(result.data.organizations));
        dispatch(setFirstOrganizationsFetchDone(true));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export const createOrganization = (orgInfo) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    OrganizationService.create({...orgInfo, owner: getState().auth.user.uid})
      .then((result) => {
        let newOrgs = [...getState().organizations.organizations, result.data.organization];
        dispatch(setOrganizations(newOrgs));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}