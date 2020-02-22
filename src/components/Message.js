// External Import
import React from 'react';

// Style
import '../styles/components/Message.scss';

// Render
const Message = ({ send, msg, sentAt }) => {
  var time = new Date(sentAt)
  let h = time.getHours();
  let m = time.getMinutes();
  h = (h < 10 ? '0' + h : h);
  m = (m < 10 ? '0' + m : m);

  return (
    <div className={ "message-div" + (send ? " sent" : "") }>
      <div className="message-msg">
        <p>{ msg }</p>
        <div className="message-time">
          <span>{ h + ':' + m  }</span>
        </div>
      </div>
    </div>
  );
}

export default Message;