import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {removeEmployee, createEmployee} from '../../actions/employee';
import Switch from "react-switch";
import Modal from 'react-modal'
import {TYPE_ADMIN, TYPE_DRIVER } from '../../actions/constants';

const EmployeeItem = ({employee, removeEmployee, createEmployee}) => {
    const userTypesArr = employee.type.split(',');
    const [edit, setEdit] = useState(false);
    const [tmpActive, setTmpActive] = useState(employee.active);
    const [isAdmin, setIsAdmin] = useState(userTypesArr.includes(TYPE_ADMIN));
    const [isDriver, setIsDriver] = useState(userTypesArr.includes(TYPE_DRIVER));
    const [displayModal, setShowModal] = useState(false);

    

    const showModal = () => {setShowModal(true)};
    const closeModal = () => {setShowModal(false)};
    

    const activeToggle = () => {
        setTmpActive(!tmpActive);
    }

    const typeToggle = (x, y, type) => {
        if(type === 'admin'){
            setIsAdmin(!isAdmin);
        }else if(type === 'driver'){
            setIsDriver(!isDriver);
        }
    }

    const cancelEdit = () => {
        setTmpActive(employee.active);
        setEdit(false);
    }

    const updateEmployee = () => {
        let typeString = '';
        if(employee.active !== tmpActive){
            employee.active = tmpActive;
        }
        if(isAdmin){
            typeString = 'admin';
        }
        if(isDriver){
            if(typeString !== ''){
                typeString += ',driver';
            }
            else{
                typeString = 'driver';
            }
        }
        employee.active = tmpActive;
        employee.type = typeString;

        createEmployee(employee, true);
        setEdit(false);
    }

    const confirmDelete = () => {
        removeEmployee(employee._id) 
        closeModal();
    }


    const customStyles = {
        overlay:{
            background: 'rgba(33, 37, 41, 0.3411764705882353)'
        },
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
        }
    }



    return (
        <Fragment>
            <div className="row my-3">
                <div className="col-6 col-lg-10 row">
                    <div className="col-12 col-lg-4">
                        <b>Name: </b>
                        {employee.name}
                    </div>
                    <div className="col-12 col-lg-4">
                        <b>Type: </b>
                        {edit ?
                        <Fragment>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            admin
                            <Switch id='admin' onChange={typeToggle} checked={isAdmin}/>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            driver
                            <Switch id='driver' onChange={typeToggle} checked={isDriver}/>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </Fragment>:
                        <Fragment>
                            {employee.type}
                        </Fragment>}
                    </div>
                    <div className="col-12 col-lg-4">
                        <b>Active: </b>
                        {edit ? 
                        <Fragment>
                            <Switch onChange={activeToggle} checked={tmpActive}/>
                        </Fragment>:
                        <Fragment>
                            {employee.active ? 'true' : 'false'}
                        </Fragment>}
                    </div>
                </div>
                <div className="col-6 col-lg-2 row">
                    {edit ? 
                    <Fragment>
                        <button type="button" className='btn btn-secondary btn-block' onClick={e => cancelEdit()}>Cancel</button>
                        <button type="button" className='btn btn-primary btn-block' onClick={e => updateEmployee()}>Update</button>
                    </Fragment>:
                    <Fragment>
                        <button type="button" className='btn btn-secondary btn-block' onClick={e => setEdit(true)}>Edit</button>
                        <button type="button" className='btn btn-danger btn-block' onClick={showModal}>Delete</button>
                    </Fragment>}
                </div>
            </div>
            <Modal
                id="confirmDeleteModal"
                isOpen={displayModal}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={customStyles}>
                <div className="modalContainer row">
                    <div className="col-12 my-5">
                        Are you sure you want to delete?
                    </div>
                    <div className="col-12 row">
                        <button className="btn btn-block btn-secondary col-12" onClick={closeModal}>Cancel</button>
                        <button className="btn btn-block btn-danger col-12" onClick={confirmDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}

EmployeeItem.propTypes = {
    employee: PropTypes.object.isRequired,
    removeEmployee: PropTypes.func.isRequired,
    createEmployee: PropTypes.func.isRequired,
}

export default connect(null, {removeEmployee, createEmployee})(EmployeeItem)
