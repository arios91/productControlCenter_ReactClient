import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import NewOrderContainerItem from './NewOrderContainerItem';
import ReadyOrderContainerItem from './ReadyOrderContainerItem';
import DeliveryOrderContainerItem from './DeliveryOrderContainerItem';
import DeliveredOrderContainerItem from './DeliveredOrderContainerItem';

const OrderContainer = ({type, orders, employees, updateOrder}) => {
    const SELECTED_DRIVER = '-- Select Driver --';
    const NEW = 'new';
    const READY = 'ready';
    const IN_DELIVERY = 'inDelivery';
    const DELIVERED = 'delivered';
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
            stagedForDelivery.map(order => {
                order.status = 'inDelivery';
                order.driver = selectedDriver;
                updateOrder(order, true);
            })
            setStagedForDelivery([]);
            setSelectedDriver()
        }
    }

    return (
        <div className='col-12 col-md-6 col-lg-3 orderContainer row'>
            <div className="col-12 text-center orderContainerHeader">
                <span>
                    {type}
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
            {orders.map(order => {
                switch(order.status){
                    case NEW:
                        return <NewOrderContainerItem key={order._id} order={order} setToReady={updateOrder}/>
                    case READY:
                        return <ReadyOrderContainerItem key={order._id} order={order} stageForDelivery={stageForDelivery} />
                    case IN_DELIVERY:
                        return <DeliveryOrderContainerItem key={order._id} order={order} confirmDelivery={updateOrder}/>
                    case DELIVERED:
                        return <DeliveredOrderContainerItem key={order._id} order={order}/>
                    default:
                        return null
                }
            }
            )}
        </div>
    )
}

OrderContainer.propTypes = {
    orders: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    employees: PropTypes.array.isRequired,
    updateOrder: PropTypes.func.isRequired,
}

export default OrderContainer;
