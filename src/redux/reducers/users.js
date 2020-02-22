export default function users (state = {}, action) {
  var newState;

  switch (action.type) {
    case 'SET_USER_LIST':
      return action.list;
    case 'ADD_USER':
      newState = Object.assign({}, state);

      newState[action.user._id] = action.user;

      return newState;
    case 'REMOVE_USER':
      newState = Object.assign({}, state);

      delete newState[action.user];

      return newState;
    case 'NEW_MESSAGE':
      newState = Object.assign({}, state);

      if (action.msg.from != action.msg.to) {
        if (action.msg.from != action.user) {
          newState[action.msg.from].newMsg = true;
        }

        if (newState[action.msg.from].alreadyGet) {
          newState[action.msg.from].messages.push(action.msg)
        }
      }

      newState[action.msg.to].messages.push(action.msg)

      return newState;
    case 'GET_MESSAGES':
      newState = Object.assign({}, state);

      newState[action.user].messages = action.msgs;
      newState[action.user].alreadyGet = true;

      return newState;
    case 'ALERT_MSG':
      newState = Object.assign({}, state);


      return newState;
    case 'SET_MSG_READ':
      newState = Object.assign({}, state);

      newState[action.from].newMsg = false;

      return newState;
    default:
      return state;
  }
}