// External Import
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Style
import '../styles/components/UserItem.scss';

// Redux Actions
import stateActions from '../redux/actions/state';
const mapDispatchProps = dispatch => bindActionCreators(stateActions, dispatch);

// Render
const UserItem = params => {
  const {
    // Variables
    id,
    name,
    newMsg,
    active,
    // Functions
    redirect
  } = params;

  return (
    <li
      className={ "user-item" + (active ? " active" : "") }
      onClick={ () => redirect(['chat', id]) }
    >
      <div className="user-icon"><FontAwesomeIcon icon="user"/></div>
      <div className="user-name">{ name }</div>
      <div className={ (newMsg ? "new-msg" : "")}></div>
    </li>
  );
}

export default connect(null, mapDispatchProps)(UserItem);