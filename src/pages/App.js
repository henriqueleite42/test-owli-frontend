// External Import
import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import Login from './Login';
import Default from './Default';

// Functions
import { getStorage, pathBack } from '../etc/functions';

// Style
import '../styles/index.scss';

// Redux
import userActions from '../redux/actions/user';
const mapDispatchProps = dispatch => bindActionCreators(userActions, dispatch);
const mapStateToProps = state => state;

// Render
const App = ({ user, redirect, login, logout }) => {
  // Router
  const page = () => {
    // If User Not Logged
    if (!user.token) {
      // Try Get User Data From Local Storage
      const userLogged = getStorage('user');

      if (!userLogged) {
        return <Login/>;
      } else {
        // Validate User Token
        axios.get(
          pathBack(['user', 'checkToken']),
          { headers: { 'Authorization': 'Bearer ' + userLogged.token }}
        ).then(res => {
          if (res.data.status !== 401) login(userLogged);
          else {
            redirect();
            logout();
          }
        }).catch(() => {
          redirect();
          logout();
        });
      }
    }

    // Always return Default, because axios take a little to return
    return <Default/>;
  }

  // Render
  return (
    <>
      <div id="loading" className="hide"><div></div></div>
      <div id="alert" className="hide"></div>
      { page() }
    </>
  );
}

export default connect(mapStateToProps, mapDispatchProps)(App);