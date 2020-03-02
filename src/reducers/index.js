import { combineReducers } from'redux';
import auth from './auth';
import alert from './alert';
import order from './order';
import user from './user';
import employee from './employee';

export default combineReducers({
    auth,
    order,
    alert,
    user,
    employee
});