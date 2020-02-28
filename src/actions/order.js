import axios from 'axios';
import {setAlert} from './alert';
import {GET_ORDERS} from '../actions/constants'

export const getOrders = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/orders');

        dispatch({
            type: GET_ORDERS,
            payload: res.data
        })

    } catch (error) {
        console.log(error);
    }
}