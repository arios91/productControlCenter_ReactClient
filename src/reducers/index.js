import { combineReducers } from'redux';
import auth from './auth';
import alert from './alert';
import order from './order';

export default combineReducers({
    auth,
    order,
    alert
});