// External Import
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from '../components/Message';

// Functions
import { pathBack, showError } from '../etc/functions';

// Style
import '../styles/pages/Chat.scss';

// Redux
import userActions from '../redux/actions/user';
import stateActions from '../redux/actions/state';
const actions = Object.assign({}, userActions, stateActions);
const mapDispatchProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = state => state;

// Render
const Chat = props => {
  const {
    // Variables
    user,
    users,
    url,
    socket,
    // Functions
    logout,
    getMessages,
    redirect,
    setMsgRead
  } = props;

  // Message Input State
  const [ newMessage, setNewMessage ] = useState('');

  useEffect(() => {
    // If user is talking to anyone, verify if the user list is already geted
    if (users[url.chatWith]) {
      // If New Message Alert = true, set Message Read
      if (users[url.chatWith].newMsg) setMsgRead(url.chatWith);

      // Get Message Screen Element
      let msgElem = document.getElementById('messages');

      // Max Height - (Scroll from Top + Screen Height)
      let scrollPosition = (msgElem.scrollHeight - (msgElem.scrollTop + msgElem.clientHeight));

      // If (Scroll < 70% of Screen Height) => Scroll to Bottom
      if (scrollPosition < (msgElem.clientHeight / 0.7)) {
        msgElem.scrollTo(0, msgElem.scrollHeight);
      }
    }
  }, [url, users]);

  useLayoutEffect(() => {
    // Do it before Render Page
    if (users[url.chatWith]) {
      // If Mesages with some user are't geted yet, get then
      if (!users[url.chatWith].alreadyGet) {
        axios.get(
          pathBack(['message', 'search'], { user: url.chatWith }),
          { headers: { 'Authorization': 'Bearer ' + user.token }}
        )
        .then(res => {
          if (res.data.status === 401) {
            redirect();
            logout(user.id);
          } else if (res.data.status) getMessages(url.chatWith, res.data.data);
          else showError(res.data.msg);

          document.getElementById('messages').scrollTo(0, 100000)
        });
      }
    } else {
      // If User data aren't geted, redirect user to Default screen
      // This normaly happen when user acess directly {SITE}/chat/{SOME_USER_ID}
      // Or when the user doesn't exists
      redirect();
    }
  }, [url, users]);

  // Send New Message
  const send = () => {
    if (newMessage.length > 0) {
      // Clean Message Field
      setNewMessage('');

      socket.emit('SEND_MESSAGE', {
        from: user.id,
        to: url.chatWith,
        msg: newMessage
      });
    }
  }

  // KeyPress
  const keyPress = e => {
    // If User Press Enter, Send Message
    if (e.which === 13) send();
  }

  // Render
  return (
    <div id="message-page">
      <div id="back-bar">
        <FontAwesomeIcon icon="arrow-left" onClick={ () => redirect() }/>
        <span>{ (users[url.chatWith] ? users[url.chatWith].username : '') }</span>
        <span></span>
      </div>
      <div id="messages">
        { !users[url.chatWith] ||
          users[url.chatWith].messages.map((msg, index) => {
            return (
              <Message
                key={ index }
                send={ msg.from === user.id }
                msg={ msg.msg }
                sentAt={ msg.sentAt }
              />
            );
          })
        }
      </div>
      <div id="send-bar">
        <div id="send-input">
          <input
            type="text"
            placeholder="Type a Message"
            value={ newMessage }
            onChange={ e => setNewMessage(e.target.value) }
            onKeyPress={ keyPress }
          />
        </div>
        <div id="send-btn" onClick={ () => send() }>
          <FontAwesomeIcon icon="paper-plane"/>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchProps)(Chat);