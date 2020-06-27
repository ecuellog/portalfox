import OrganizationService from "../../services/firebase/organizations";

export const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS';

// Basic
export function setOrganizations(organizations) {
  return {
    type: SET_ORGANIZATIONS,
    organizations
  }
}

// With middleware
export const fetchOrganizations = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    OrganizationService.listByUser(getState().auth.user.uid)
      .then((result) => {
        dispatch(setOrganizations(result.data.organizations));
        resolve(result.message);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

// With middleware
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