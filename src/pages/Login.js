// External Import
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import axios from 'axios';

// Functions
import {
  showError,
  pathBack,
  addLoading,
  regPass,
  regEmail,
  regPhone,
  regUser
} from '../etc/functions';

// Style
import '../styles/pages/Login.scss';

// Redux
import userActions from '../redux/actions/user';
const mapDispatchProps = dispatch => bindActionCreators(userActions, dispatch);

// Render
const Login = ({ login }) => {
  // Contants
  const registerForm = {
    mode: 'register',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username',
        type: 'text',
        data: '',
        active: false,
        title: 'Only a-Z, _ and numbers'
      },
      {
        name: 'email',
        placeholder: 'E-mail',
        type: 'email',
        data: '',
        active: false,
        title: ''
      },
      {
        name: 'phone',
        placeholder: 'Phone with DDD',
        type: 'tel',
        data: '',
        active: false,
        title: 'Cell Phone Number with DDD'
      },
      {
        name: 'address',
        placeholder: 'Address',
        type: 'text',
        data: '',
        active: false,
        title: 'Max 40 characters'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        data: '',
        active: false,
        title: 'Must have one capital letter, one lower case letter, one number and one special character'
      }
    ]
  }

  const loginForm ={
    mode: 'login',
    inputs: [
      {
        name: 'user',
        placeholder: 'Username or E-mail',
        type: 'text',
        data: '',
        active: false
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        data: '',
        active: false
      }
    ]
  }

  // State
  const [ formState, setFormState ] = useState(registerForm);

  // Sign In
  const signIn = () => {
    const fields = {};

    for (let input of formState.inputs) {
      switch (input.name) {
        case 'user':
            if (/@/.test(input.data)) {
              if (!regEmail(input.data)) {
                showError('Invalid Email', 'lg');
                return;
              }
            } else {
              if (!regUser(input.data)) {
                showError('Invalid Username', 'lg');
                return;
              }
            }
          break;
        case 'password':
          if (!regPass(input.data)) {
            showError('Invalid Password', 'lg');
            return;
          }
          break;
        default:
          break;
      }

      fields[input.name] = input.data;
    }

    addLoading();
    axios.post(pathBack(['auth']), fields)
    .then(res => {
      if (res.data.status) login(res.data.user);
      else showError(res.data.msg, 'lg');
    })
    .catch(e => {
      showError('Login Fail', 'lg');
      console.error(e);
    });
  }

  // Sign Up
  const signUp = () => {
    const fields = {};

    // Validation
    for (let input of formState.inputs) {
      if (!input.data) {
        showError('Invalid ' + input.placeholder, 'lg');
        return;
      }

      let doIt = false;
      switch(input.name) {
        case 'username':
          if (!regUser(input.data)) doIt = true;
          break;
        case 'email':
          if (!regEmail(input.data) || input.data.length > 35) doIt = true;
          break;
        case 'phone':
          if (!regPhone(input.data) || input.data.length !== 11) doIt = true;
          break;
        case 'address':
          if (input.data.length > 40) doIt = true;
          break;
        case 'password':
          if (!regPass(input.data)) doIt = true;
          break;
        default:
          break;
      }

      if (doIt) {
        showError('Invalid ' + input.placeholder, 'lg');
        return;
      }

      fields[input.name] = input.data;
    };

    // Submit Info
    addLoading();
    axios.post(pathBack(['user', 'create']), fields)
    .then(res => {
      if (res.data.status) login(res.data.user);
      else showError(res.data.msg, 'lg');
    })
    .catch(e => {
      showError('Login Fail', 'lg');
      console.error(e);
    });
  }

  // Change Screen or Sign In/Up
  // Login to Register and Register to Login
  const changeMode = newMode => {
    const oldForm = Object.assign({}, formState);

    if (newMode === 'register') {
      if (oldForm.mode !== newMode) {
        const newForm = registerForm;

        const user = oldForm.inputs[0];
        const oldInput = (/@/.test(user.data) ? 'email' : 'username');

        newForm.inputs[(oldInput === 'username' ? 0 : 1)].data = user.data;
        newForm.inputs[4].data = oldForm.inputs[1].data;

        setFormState(newForm);
      } else {
        signUp();
      }
    } else {
      if (oldForm.mode !== newMode) {
        const newForm = loginForm;

        const username = formState.inputs.filter(input => input.name === 'username')[0];
        const email = formState.inputs.filter(input => input.name === 'email')[0];
        const password = formState.inputs.filter(input => input.name === 'password')[0];
        newForm.inputs[0].data = (username.data || email.data);
        newForm.inputs[1].data = password.data;

        setFormState(newForm);
      } else {
        signIn();
      }
    }
  }

  // Change Input Info
  const handleChange = (field, index) => e => {
    const newForm = Object.assign({}, formState);

    // Validation
    if (field === "data") {
      switch (e.target.id){
        case 'phone':
          if ((e.target.value.length > 1 && !regPhone(e.target.value)) || e.target.value.length > 11)  return;
          break;
        case 'address':
          if (e.target.value.length > 40) return;
          break;
        case 'username':
          if (e.target.value.length > 20) return;
          break;
        case 'email':
        case 'user':
          if (e.target.value.length > 35) return;
          break;
        case 'password':
          if (e.target.value.length > 30) return;
          break;
        default:
          return;
      }

      newForm.inputs[index].data = e.target.value;
    } else {
      newForm.inputs[index].active = !newForm.inputs[index].active;
    }

    // Set New Info
    setFormState(newForm);
  }

  // KeyPress
  const keyPress = index => e => {
    if (e.which === 13) {
      // On Press Enter => Focus Next Field or Submit Form
      if (formState.inputs[(index + 1)]) document.getElementById(formState.inputs[(index + 1)].name).focus();
      else changeMode(formState.mode)
    }
  }

  // Render
  return (
    <section id="login-page">
      <div id="login-form">
        <div id="header">
          <h1>{ formState.mode }</h1>
        </div>
        <div id="content">
          {
            formState.inputs.map((input, index) => {
              return(
                <div
                  key={ index }
                  className={
                    "input" +
                    (input.active ? " active" : "") +
                    (formState.mode !== "login" ? " register" : "")
                  }
                >
                  <input
                    type={ input.type }
                    id={ input.name }
                    placeholder={ input.placeholder }
                    value={ input.data }
                    title={ input.title }
                    onChange={ handleChange("data", index) }
                    onFocus={ handleChange("active", index) }
                    onBlur={ handleChange("active", index) }
                    onKeyPress={ keyPress(index) }
                  />
                </div>
              );
            })
          }
        </div>
        <div id="buttons">
          <button onClick={ () => changeMode("register") }>
            Register
          </button>
          <button onClick={ () => changeMode("login") }>
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default connect(null, mapDispatchProps)(Login);