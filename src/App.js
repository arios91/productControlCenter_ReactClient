import React, {useEffect, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Orders from './components/orders/Orders';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Employees from './components/employees/Employees';
import Login from './components/auth/Login';
import './App.css';

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
      <Router>
        <Fragment>
          <Navbar/>
          <div className="content">
            <Route exact path="/" component={Login}/>
            <PrivateRoute exact path="/register" component={Register}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/employees" component={Employees}/>
            <PrivateRoute exact path="/orders" component={Orders}/>

          </div>
          {/* <div className="container">
            <Alert/>
          </div> */}
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
