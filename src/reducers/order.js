import {GET_ORDERS, CREATE_ORDER, UPDATE_ORDER} from '../actions/constants'

const initialState = {
    orders: [],
    error: {},
    loading: true
}

export default function(state = initialState, action){
    const {type, payload} = action;
    console.log(type);
    console.log('hi from reducer');

    switch(type){
        case GET_ORDERS:
            return{
                ...state,
                orders: payload,
                loading: false
            }
        case CREATE_ORDER:
            return{
                ...state,
                orders: [payload, ...state.orders],
                loading: false
            }
        case UPDATE_ORDER:
            return{
                ...state,
                orders: state.orders.map(order => order._id === payload._id ? payload : order),
                loading: false
            }
        default:
            return state
    }
}