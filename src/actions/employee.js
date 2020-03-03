import axios from 'axios';
import {API_URL, GET_EMPLOYEES, CREATE_EMPLOYEE, REMOVE_EMPLOYEE} from './constants';



export const getEmployees = () => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/employees`);

        dispatch({
            type: GET_EMPLOYEES,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const removeEmployee = (empId) => async dispatch => {
    try {
        const res = await axios.delete(`${API_URL}/employees/${empId}`);

        dispatch({
            type: REMOVE_EMPLOYEE,
            payload: empId
        })
    } catch (error) {
        console.log(error);
    }
}

//create employee
export const createEmployee = (formData, edit = false) => async dispatch =>{
    try {
        const config = {
            headers:{'Content-type': 'application/json'}
        };

        const res = await axios.post(`${API_URL}/employees`, formData, config);

        dispatch({
            type: CREATE_EMPLOYEE,
            payload: res.data
        })

        // dispatch(setAlert(edit ? 'Employee Udpated' : 'Employee Created'));

    } catch (err) {
        // const errors = err.response.data.errors;
        // if(errors){
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }
        console.log(err)
    }
}