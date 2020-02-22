module.exports = {
  login: user => {
    return {
      type: 'LOGIN',
      user
    }
  },

  logout: user => {
    return {
      type: 'LOGOUT',
      user
    }
  }
}