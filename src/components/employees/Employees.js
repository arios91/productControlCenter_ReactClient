import React, {useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getEmployees, createEmployee} from '../../actions/employee';
import Spinner from '../layout/Spinner';
import EmployeeItem from './EmployeeItem';
import Switch from "react-switch";
import {TYPE_ADMIN, TYPE_DRIVER } from '../../actions/constants';

const Employees = ({getEmployees, createEmployee, employee:{employees, loading}}) => {
    const [formData, setFormData] = useState({
        name: '',
        access: 1,
        active: true
    });

    const [isNewDriver, setNewDriver] = useState(false);
    const [isNewAdmin, setNewAdmin] = useState(false);

    useEffect(() => {
        getEmployees();
    }, [getEmployees]);

    const {name, access, active} = formData;


    const onSubmit = async e => {
        e.preventDefault();
        //create type string
        let type = '';
        if(isNewAdmin){
            type = 'admin';
        }
        if(isNewDriver){
            if(type !== ''){
                type += ',driver';
            }
            else{
                type = 'driver';
            }
        }
        if(type === ''){
            alert('Select a type');
            return; 
        }
        if(name === ''){
            alert('Input a name');
            return;
        }
        createEmployee({name, type, access, active}, false);
        setNewDriver(false);
        setNewAdmin(false);
    }

    const onChange = e => {setFormData({...formData, [e.target.name]: e.target.value})}

    const typeToggle = (x, y, type) => {
        if(type === 'admin'){
            setNewAdmin(!isNewAdmin);
        }else if(type === 'driver'){
            setNewDriver(!isNewDriver);
        }
    }



    return loading ? <Spinner/> : 
    <div className="employeesMainContainer row">
        <div className="col-12 col-lg-3 text-center orderContainerNoHeight p-3">
            <h3>Register Employee</h3>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}  />
                </div>


                <div className="form-group">
                    <Switch id='driver' onChange={typeToggle} checked={isNewDriver}/>
                    <label htmlFor="driver">Driver</label><br/>
                    <Switch id='admin' onChange={typeToggle} checked={isNewAdmin}/>
                    <label htmlFor="admin">Admin</label>
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
        </div>
        <div className="col-12 col-lg-9 text-lg-center text-md-center text-sm-left orderContainer p-3">
            <h3>Employees</h3>
            {employees.map(emp => <EmployeeItem key={emp._id} employee={emp}/>)}
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
