import { pathFront, redirect } from '../../etc/functions';

const defaultState = {
  page: 'home',
  link: '',
  chatWith: ''
};

export default function url (state = defaultState, action) {
  var newState;
  switch (action.type) {
    case 'REDIRECT':
      redirect(action.url);

      let page;
      switch(action.url[0]) {
        case 'chat':
          page = 'chat';
          break;
        case 'config':
          page = 'config';
          break;
        default:
          page = 'home';
          break;
      }

      newState = {
        page,
        link: pathFront(action.url).replace(process.env.REACT_APP_FRONT_URL + '/', ''),
        chatWith: (page === 'chat' ? action.url[1] : '')
      }

      return newState;
    default:
      return state;
  }
}