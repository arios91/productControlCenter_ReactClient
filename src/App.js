import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Orders from './components/orders/Orders';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  })
  return (
    <Provider store={store}>
      <div className="container">
        Hello There<br/>
        <Orders/>
      </div>
    </Provider>
  );
}

export default App;
