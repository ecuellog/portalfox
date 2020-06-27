import { combineReducers } from 'redux';
import auth from './auth.js';
import organizations from './organizations.js';

export default combineReducers({
  auth,
  organizations
})