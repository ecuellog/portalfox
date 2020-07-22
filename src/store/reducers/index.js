import { combineReducers } from 'redux';
import auth from './auth.js';
import organizations from './organizations.js';
import channels from './channels.js';
import articles from './articles.js';

export default combineReducers({
  auth,
  organizations,
  channels,
  articles
})
