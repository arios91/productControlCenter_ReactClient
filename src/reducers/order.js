import {GET_ORDERS} from '../actions/constants'

const initialState = {
    orders: [],
    error: {},
    loading: true
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_ORDERS:
            return{
                ...state,
                orders: payload,
                loading: false
            }
        default:
            return state
    }
}