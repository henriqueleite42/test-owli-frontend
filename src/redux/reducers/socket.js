export default function socket (state = {}, action) {
  switch (action.type) {
    case 'SOCKET':
      return action.socket;
    default:
      return state;
  }
}