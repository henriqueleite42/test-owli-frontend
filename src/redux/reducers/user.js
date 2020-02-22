import { setStorage, removeStorage, removeLoading, redirect } from '../../etc/functions';

const defaultUser = {
  id: '',
  username: '',
  phone: '',
  address: '',
  email: '',
  token: ''
};

export default function user (state = defaultUser, action) {
  switch (action.type) {
    case 'LOGIN':
      removeLoading();
      setStorage('user', action.user);
      return action.user;
    case 'LOGOUT':
      removeLoading();
      redirect();
      removeStorage('user');
      return defaultUser;
    default:
      return state;
  }
}