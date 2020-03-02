import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {removeEmployee} from '../../actions/employee';

const EmployeeItem = ({employee, removeEmployee}) => {
    return (
        <div className="row my-2">
            <div className="col">
                <b>Name: </b>
                {employee.name}
            </div>
            <div className="col">
                <b>Type: </b>
                {employee.type}
            </div>
            <div className="col">
                <b>Active: </b>
                {employee.active ? 'true' : 'false'}
            </div>
            <div className="col">
                <button type="button" className='btn btn-danger' onClick={e => removeEmployee(employee._id)}>Delete</button>
            </div>
        </div>
    )
}

EmployeeItem.propTypes = {
    employee: PropTypes.object.isRequired,
    removeEmployee: PropTypes.func.isRequired,
}

export default connect(null, {removeEmployee})(EmployeeItem)
