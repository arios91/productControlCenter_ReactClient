import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getOrders, createOrder} from '../../actions/order';
import Spinner from '../layout/Spinner'
import {getEmployees} from '../../actions/employee'
import OrderContainer from './OrderContainer';

const Dashboard = ({getOrders, getEmployees, createOrder, order:{orders, loading}, employee:{employees}}) => {
    useEffect(() => {
        getOrders();
        getEmployees();
    }, [getOrders, getEmployees]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            getOrders();
        }, 1000 * 60 * 5 );
        return () => clearInterval(interval);
    }, []);


    
    return loading ? <Spinner/> :
    <div className="row">
        <OrderContainer employees={employees} updateOrder={createOrder} type="new" orders={orders.filter(order => order.status === 'new').sort((a,b) => (a.inDate > b.inDate) ? 1 : -1)}/>
        <OrderContainer employees={employees} updateOrder={createOrder} type="ready" orders={orders.filter(order => order.status === 'ready').sort((a,b) => (a.distanceFromShop > b.distanceFromShop) ? 1 : -1)}/>
        <OrderContainer employees={employees} updateOrder={createOrder} type="inDelivery" orders={orders.filter(order => order.status === 'inDelivery').sort((a,b) => (a.statusDate > b.statusDate) ? 1 : -1)}/>
        <OrderContainer employees={employees} updateOrder={createOrder} type="delivered" orders={orders.filter(order => order.status === 'delivered').sort((a,b) => (a.statusDate > b.statusDate) ? 1 : -1)}/>
        <div className="col-12 font-weight-bold">
            <span>Functional To-do:</span>
            <ul>
                <li><s>Order ready column by distance from flower shop</s></li>
                <li>Bump orders up on the list after they've been in for a while</li>
                <li>List only orders for the current day, maybe only in ready</li>
            </ul>
            <span>Visual To-do:</span>
            <ul>
                <li>Column headers re-size depending on amount of orders in them, fix it</li>
            </ul>
        </div>
    </div>
}

Dashboard.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    order: state.order,
    employee: state.employee
})

export default connect(mapStateToProps, {getOrders, createOrder, getEmployees})(Dashboard);
