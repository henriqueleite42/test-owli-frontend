// External Import
import React, { useState,  useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SocketIO from 'socket.io-client';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserItem from '../components/UserItem';

// Pages
import Chat from './Chat';
import Config from './Config';

// Functions
import { pathFront, showError } from '../etc/functions';

// Font Awesome
import '../styles/config/fontawesome';

// Style
import '../styles/index.scss';
import '../styles/pages/Default.scss';

// Redux
import stateActions from '../redux/actions/state';
import userActions from '../redux/actions/user';
const actions = Object.assign({}, stateActions, userActions);
const mapDispatchProps = dispatch => bindActionCreators(actions, dispatch)
const mapStateToProps = state => state;

// Render
const Default = props => {
  const {
    // Variables
    user,
    users,
    url,
    socket,
    // Funcions
    redirect,
    setSocket,
    setUserList,
    addUser,
    removeUser,
    newMessage,
    logout
  } = props;

  const [ already, setAlready ] = useState(false);

  useEffect(() => {
    // On the Fisrt Time, initialize Socket.io
    if (Object.entries(socket).length === 0) {
      setSocket(SocketIO(process.env.REACT_APP_BACK_URL));
    } else if (user.id && !already) {
      // On the Second Time, add event listners
      socket.emit('LOGIN', { id: user.id });
      socket.on('ADD_USER', newUsers => addUser(newUsers));
      socket.on('SET_USER_LIST', list => setUserList(list));
      socket.on('REMOVE_USER', newUsers => removeUser(newUsers));
      socket.on('NEW_MESSAGE', msg => newMessage(user.id, msg));
      socket.on('NEW_LOGIN', () => {
        redirect();
        logout();
        showError('New Login from Another Device', 'lg');
      });

      // If url accessed != main page, fix url var
      if (pathFront() + url.link != window.location.href) {
        redirect(window.location.href.replace(pathFront(), '').split('/'))
      }

      // To do it only 1 time
      setAlready(true);
    }
  }, [socket, user]);

  // User List
  let userList = [];
  for (let u in users) {
    userList.push(
      <UserItem
        key={ users[u]._id }
        id={ users[u]._id }
        name={ users[u].username }
        newMsg={ users[u].newMsg }
        active={ users[u]._id === url.chatWith }
      />
    );
  }

  // Change Page
  const router = () => {
    const link = url.link.split('/');

    switch (link[0]) {
      case 'chat':
        return <Chat/>;
      case 'config':
        return <Config/>;
      default:
        return (
          <div id="default-screen">
            <FontAwesomeIcon icon="comment"/>
            <span>Choose an User and Start to Talk!</span>
          </div>
        );
    }
  }

  // Render
  return (
    <>
      <nav id="nav-bar" className={ (url.page !== 'home' ? ' hide' : '') }>
        <div id="nav-user">
          <FontAwesomeIcon icon="user" onClick={ () => redirect(['config']) }/>
          <span onClick={ () => redirect(['config']) }>{ user.username }</span>
        </div>
        <ul id="online-users">
          { userList }
        </ul>
      </nav>
      <section id="page-content" className={ (url.page === 'home' ? ' hide' : '') }>
        <div id="show-nav"></div>
        { router() }
      </section>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchProps)(Default);