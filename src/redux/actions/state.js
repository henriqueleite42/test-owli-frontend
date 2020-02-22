module.exports = {
  redirect: url => {
    return {
      type: 'REDIRECT',
      url: (url || [])
    }
  },

  setSocket: socket => {
    return {
      type: 'SOCKET',
      socket
    }
  },

  setUserList: list => {
    return {
      type: 'SET_USER_LIST',
      list
    }
  },

  addUser: user => {
    return {
      type: 'ADD_USER',
      user
    }
  },

  removeUser: user => {
    return {
      type: 'REMOVE_USER',
      user
    }
  },

  newMessage: (user, msg) => {
    return {
      type: 'NEW_MESSAGE',
      user,
      msg
    }
  },

  getMessages: (user, msgs) => {
    return {
      type: 'GET_MESSAGES',
      user,
      msgs
    }
  },

  alertMsg: from => {
    return {
      type: 'ALERT_MSG',
      from
    }
  },

  setMsgRead: from => {
    return {
      type: 'SET_MSG_READ',
      from
    }
  }
}