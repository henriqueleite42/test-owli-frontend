// External Import
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Functions
import { regPhone, regEmail, regPass, showError, showSuccess, pathBack } from '../etc/functions';

// Style
import '../styles/pages/Config.scss';

// Redux
import userActions from '../redux/actions/user';
import stateActions from '../redux/actions/state';
const actions = Object.assign({}, userActions, stateActions);
const mapDispatchProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = state => state;

// Render
const Config = ({ user, socket, logout, login, redirect }) => {
  const [ form, setForm ] = useState([
    {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      data: user.username,
      active: false
    },
    {
      name: 'email',
      placeholder: 'E-mail',
      type: 'email',
      data: user.email,
      active: false
    },
    {
      name: 'phone',
      placeholder: 'Phone',
      type: 'tel',
      data: user.phone,
      active: false
    },
    {
      name: 'address',
      placeholder: 'Address',
      type: 'text',
      data: user.address,
      active: false
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      data: '',
      active: false
    }
  ]);

  // Save
  const save = () => {
    const submit = {};

    // Email
    if (form[1].data.length > 0 && form[1].data !== user.email) {
      if (form[1].data.length < 36 && regEmail(form[1].data)) {
        submit.email = form[1].data;
      } else {
        showError('Invalid E-mail');
        return;
      }
    }

    // Phone
    if (form[2].data.length > 0 && form[2].data !== user.phone) {
      if (form[2].data.length === 11 && regPhone(form[2].data)) {
        submit.phone = form[2].data;
      } else {
        showError('Invalid Password');
        return;
      }
    }

    // Address
    if (form[3].data.length > 0 && form[3].data !== user.address) {
      if (form[3].data.length < 40) {
        submit.address = form[3].data;
      } else {
        showError('Invalid Address');
        return;
      }
    }

    // Password
    if (form[4].data.length > 0 && form[4].data !== user.password) {
      if (!regPass(form[4].data)) {
        submit.password = form[4].data;
      } else {
        showError('Invalid PassWord');
        return;
      }
    }

    // If there are something to update
    if (Object.entries(submit).length !== 0) {
      submit.id = user.id;

      axios.put(
        pathBack(['user', 'update']),
        submit,
        { headers: { 'Authorization': 'Bearer ' + user.token }}
      ).then(res => {
        if (res.data.status === 401) rediOut();
        else {
          showSuccess('Success!');
          login(res.data.user);
        }
      }).catch(() => showError('Fail to Update'));
    } else {
      showSuccess('Updated!');
    }
  }

  const rediOut = () => {
    redirect();
    logout();
    socket.emit('LOGOUT');
  }

  // Change Input Info
  const handleChange = (field, index) => e => {
    const newForm = form.slice();

    // Validation
    if (field === "data") {
      switch (e.target.id){
        case 'phone':
          if ((e.target.value.length > 1 && !regPhone(e.target.value)) || e.target.value.length > 11)  return;
          break;
        case 'address':
          if (e.target.value.length > 40) return;
          break;
        case 'email':
          if (e.target.value.length > 35) return;
          break;
        case 'password':
          if (e.target.value.length > 30) return;
          break;
        default:
          return;
      }

      newForm[index].data = e.target.value;
    } else {
      newForm[index].active = !newForm[index].active;
    }

    // Set New Info
    setForm(newForm);
  }

  // Render
  return (
    <section id="config-page">
      <div id="btn-back" onClick={ () => redirect() }>
        <FontAwesomeIcon icon="arrow-left"/>
      </div>
      <div id="config-form">
        <div id="header">
          <FontAwesomeIcon icon="user"/>
        </div>
        <div id="content">
          {
            form.map((input, index) => {
              return(
                <div
                  key={ index }
                  className="input"
                >
                  <input
                    type={ input.type }
                    id={ input.name }
                    placeholder={ input.placeholder }
                    value={ input.data }
                    disabled={ input.name === 'username' }
                    onChange={ handleChange("data", index) }
                    onFocus={ handleChange("active", index) }
                    onBlur={ handleChange("active", index) }
                  />
                </div>
              );
            })
          }
        </div>
        <div id="buttons">
          <button onClick={ () => rediOut() }>
            Logout
          </button>
          <button onClick={ () => save() }>
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchProps)(Config);