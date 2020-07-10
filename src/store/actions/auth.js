export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';
export const UNSET_AUTHENTICATED_USER = 'UNSET_AUTHENTICATED_USER';
export const SET_ORGANIZATION = 'SET_ORGANIZATION';

// Basic
export function setAuthenticatedUser(user) {
  return {
    type: SET_AUTHENTICATED_USER,
    user
  }
}

export function unsetAuthenticatedUser() {
  return {
    type: UNSET_AUTHENTICATED_USER
  }
}

export function setOrganization(org) {
  return {
    type: SET_ORGANIZATION,
    org
  }
}