import {GET_EMPLOYEES, UPDATE_EMPLOYEE, CREATE_EMPLOYEE, REMOVE_EMPLOYEE} from '../actions/constants'

const initialState = {
    employees: [],
    error: {},
    loading: true
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_EMPLOYEES:
            return{
                ...state,
                employees: payload,
                loading: false
            }
        case CREATE_EMPLOYEE:
            return{
                ...state,
                employees: [payload, ...state.employees],
                loading: false
            }
        case REMOVE_EMPLOYEE:
            return{
                ...state,
                employees: state.employees.filter(emp => emp._id !== payload),
                loading: false
            }
        default:
            return state
    }
}