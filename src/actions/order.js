import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {setAlert} from './alert';
import {API_URL , GET_ORDERS, CREATE_ORDER, UPDATE_ORDER} from '../actions/constants'

export const getOrders = () => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/orders`);

        dispatch({
            type: GET_ORDERS,
            payload: res.data
        })

    } catch (error) {
        console.log(error);
    }
}

export const createOrder = (formData, edit = false) => async dispatch => {
    try {
        const config = {
            headers:{'Content-type': 'application/json'}
        };
        console.log(formData);

        const res = await axios.post(`${API_URL}/orders`, formData, config);
        console.log(res.data);
        if(!edit){
            dispatch({
                type: CREATE_ORDER,
                payload: res.data
            })
        }else{
            dispatch({
                type: UPDATE_ORDER,
                payload: res.data
            })
        }

    } catch (error) {
        console.log('error')
        console.log(error);
    }
}
