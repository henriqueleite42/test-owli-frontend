// Constants
const back = process.env.REACT_APP_BACK_URL;
const front = process.env.REACT_APP_FRONT_URL;

// Regex
const regUser = /^[a-zA-Z0-9_-]{3,20}$/;
const regEmail = /\b[\w.!#$%&’*+=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)*\b/;
const regPass = /(?=^.{6,}$)((?=.*\w)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[|!$%&@<>/]))^.*/;
const regPhone = /^[0-9]*$/;

// Functions
const functions = {
  // Make Path
  path: (type, url = [], params = {}) => {
    if (!url) {
      return '';
    } else {
      if (params) {
        let par = [];

        for (let i in params) {
          par.push(i + '=' + params[i]);
        }

        if (par.length > 0) params = '?' + par.join('&');
        else params = '';
      } else {
        params = '';
      }

      return (type === 'front' ? front : back) + '/' + url.join('/') + params;
    }
  },

  // Make a Path to BackEnd
  pathBack: (url = [], params = {}) => functions.path('back', url, params),

  // Make a Path to FrontEnd
  pathFront: (url = [], params = {}) => functions.path('front', url, params),

  // Redirect Without Refresh
  redirect: (url = []) => {
    if ((window.orientation !== undefined) || (navigator.userAgent.indexOf('IEMobile') !== -1)) {
      window.history.pushState({}, "Chat App", url.join('/'));
    } else {
      window.history.pushState({}, "Chat App", functions.pathFront(url));
    }
  },

  // Add Page Loading
  addLoading: () => document.getElementById('loading').classList.remove('hide'),

  // Remove Page Loading
  removeLoading: () => document.getElementById('loading').classList += ' hide',

  // Show Alert
  showAlert: (alertClass, msg) => {
    functions.removeLoading();

    let alert = document.getElementById('alert');

    alert.innerText = msg;
    alert.classList += ' ' + alertClass;

    setTimeout(() => {
      let classList = alertClass.split(' ').filter(a => a);
      classList.forEach(item => alert.classList.remove(item));
    }, 2000)
  },

  // Show Error Messase
  showError: (msg, alertClass = '') => functions.showAlert('error '+alertClass, msg),

  // Show Success Messase
  showSuccess: (msg, alertClass = '') => functions.showAlert('success '+alertClass, msg),

  // Set Item in Local Storage
  setStorage: (item, value) => window.localStorage.setItem(item, JSON.stringify(value)),

  // Get Item from Local Storage
  getStorage: item => JSON.parse(window.localStorage.getItem(item)),

  // Delete Item from Local Storage
  removeStorage: item => window.localStorage.removeItem(item),

  // Check Regex
  regUser: item => regUser.test(item),
  regEmail: item => regEmail.test(item),
  regPass: item => regPass.test(item),
  regPhone: item => regPhone.test(item)
}

module.exports = functions;