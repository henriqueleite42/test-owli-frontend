import { combineReducers } from 'redux';

import user from './user';
import url from './url';
import socket from './socket';
import users from './users';

export default combineReducers({
  user,
  url,
  socket,
  users
})