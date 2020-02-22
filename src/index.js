import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './pages/App';

const Default = () => {
  return (
    <Provider store={ store }>
      <App/>
    </Provider>
  );
}

ReactDOM.render(<Default />, document.getElementById('root'));