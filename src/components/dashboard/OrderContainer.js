import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import NewOrderContainerItem from './NewOrderContainerItem';
import ReadyOrderContainerItem from './ReadyOrderContainerItem';
import DeliveryOrderContainerItem from './DeliveryOrderContainerItem';
import DeliveredOrderContainerItem from './DeliveredOrderContainerItem';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {SELECTED_DRIVER, NEW, READY, IN_DELIVERY, NEEDS_CONFIRMATION, COMPLETE} from '../../actions/constants';

const OrderContainer = ({type, header, orders, employees, updateOrder}) => {
    const [stagedForDelivery, setStagedForDelivery] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');

    const stageForDelivery = (order, staged) => {
        if(staged){
            setStagedForDelivery(stagedForDelivery.filter(tmpOrder => tmpOrder._id !== order._id));
        }else{
            setStagedForDelivery([...stagedForDelivery, order]);
        }
    }

    
    const handleDriverSelect = e => {
        if(e.target.value === SELECTED_DRIVER){
            setSelectedDriver('');
        }else{
            setSelectedDriver(e.target.value);
        }
    }
    
    const submitDelivery = (e) => {
        e.preventDefault();
        if(selectedDriver === ''){
            alert('Select a driver');
        }else{
            let employee = employees.filter(emp => emp.name === selectedDriver);
            stagedForDelivery.map(order => {
                order.status = IN_DELIVERY;
                order.driver = selectedDriver;
                order.driverId = employee[0]._id;
                updateOrder(order, true);
            })
            setStagedForDelivery([]);
            setSelectedDriver()
        }
    }

    return (
        // <div className='col-12 col-md-6 col-lg-2 orderContainer row'>
        <div className='col orderContainer row'>
            <div className="col-12 text-center orderContainerHeader">
                <span>
                    {header}
                </span>
                {type === READY && stagedForDelivery.length > 0 ? 
                    <form className='col-12 row' onSubmit={e => submitDelivery(e)}>
                        <div className="form-group col-8">
                            <select className="form-control" onChange={e => handleDriverSelect(e)} id="exampleFormControlSelect1">
                                <option>{SELECTED_DRIVER}</option>
                                {employees.map(emp => <option key={emp._id}>{emp.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group col-4">
                            <input type="submit" className="btn btn-primary btn-block" value="Deliver"/>
                        </div>
                    </form>
                :null}
            </div>
            <PerfectScrollbar>
                {orders.map(order => {
                    switch(order.status){
                        case NEW:
                            return <NewOrderContainerItem key={order._id} order={order} setToReady={updateOrder}/>
                        case READY:
                            return <ReadyOrderContainerItem key={order._id} order={order} stageForDelivery={stageForDelivery} />
                        case IN_DELIVERY:
                            return <DeliveryOrderContainerItem key={order._id} order={order} confirmDelivery={updateOrder}/>
                        case COMPLETE:
                        case NEEDS_CONFIRMATION:
                            return <DeliveredOrderContainerItem key={order._id} order={order} confirmDelivery={updateOrder}/>
                        default:
                            return null
                    }
                }
                )}
            </PerfectScrollbar>

        </div>

    )
}

OrderContainer.propTypes = {
    orders: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    employees: PropTypes.array.isRequired,
    updateOrder: PropTypes.func.isRequired,
}

export default OrderContainer;
