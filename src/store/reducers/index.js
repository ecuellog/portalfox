import { combineReducers } from 'redux';
import auth from './auth.js';
import organizations from './organizations.js';
import channels from './channels.js';

export default combineReducers({
  auth,
  organizations,
  channels
})
