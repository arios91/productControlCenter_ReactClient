import React, {useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getEmployees, createEmployee} from '../../actions/employee';
import Spinner from '../layout/Spinner';
import EmployeeItem from './EmployeeItem';

const Employees = ({getEmployees, createEmployee, employee:{employees, loading}}) => {
    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        type: '',
        access: 1,
        active: true
    });

    useEffect(() => {
        getEmployees();
    }, [getEmployees]);

    const {name, userId, type, access, active} = formData;


    const onSubmit = async e => {
        e.preventDefault();
        createEmployee({userId, name, type, access, active});
    }

    const onChange = e => {console.log(e.target.name);console.log(e.target.value);setFormData({...formData, [e.target.name]: e.target.value})}



    return loading ? <Spinner/> : 
    <div className="employeesMainContainer">
        <div className="createEmployeeForm">
            <h3>Register Employee</h3>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="User ID" name="userId"  value={userId} onChange={e => onChange(e)} />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}  />
                </div>


                <div className="form-group">
                    <input type="radio" id="driver" name="type" value="driver" onChange={e => onChange(e)} />
                    <label htmlFor="driver">Driver</label><br/>
                    <input type="radio" id="secretary" name="type" value="secretary" onChange={e => onChange(e)} />
                    <label htmlFor="secretary">Secretary</label><br/>
                    <input type="radio" id="florist" name="type" value="florist" onChange={e => onChange(e)} />
                    <label htmlFor="florist">Florist</label><br/>
                    <input type="radio" id="admin" name="type" value="admin" onChange={e => onChange(e)} />
                    <label htmlFor="admin">Admin</label>
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
        </div>
        <hr/>
        <div className="employeesSubContainer">
            <h3>Employees</h3>
            {employees.map(emp => <EmployeeItem employee={emp}/>)}
        </div>
    </div>
}

Employees.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    createEmployee: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    employee: state.employee
})

export default connect(mapStateToProps, {getEmployees, createEmployee})(Employees)
