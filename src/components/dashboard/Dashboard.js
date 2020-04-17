import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getOrders, createOrder} from '../../actions/order';
import Spinner from '../layout/Spinner'
import {getEmployees} from '../../actions/employee'
import OrderContainer from './OrderContainer';
import {NEW, READY, IN_DELIVERY, NEEDS_CONFIRMATION, COMPLETE} from '../../actions/constants';

const Dashboard = ({getOrders, getEmployees, createOrder, order:{orders, loading}, employee:{employees}}) => {
    useEffect(() => {
        getOrders();
        getEmployees();
    }, [getOrders, getEmployees]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            getOrders();
        }, 1000 * 60 * 1 );
        return () => clearInterval(interval);
    }, []);

    const pendingConfirmation = orders.filter(order => order.status === NEEDS_CONFIRMATION).sort((a,b) => (a.statusDate < b.statusDate) ? 1 : -1);
    const completeOrders = pendingConfirmation.concat(orders.filter(order => order.status === COMPLETE).sort((a,b) => (a.statusDate < b.statusDate) ? 1 : -1));


    
    return loading ? <Spinner/> :
    <div className="row">
        <OrderContainer employees={employees} updateOrder={createOrder} type={NEW} orders={orders.filter(order => order.status === NEW).sort((a,b) => (a.inDate > b.inDate) ? 1 : -1)}/>
        <OrderContainer employees={employees} updateOrder={createOrder} type={READY} orders={orders.filter(order => order.status === READY).sort((a,b) => (a.distanceFromShop > b.distanceFromShop) ? 1 : -1)}/>
        <OrderContainer employees={employees} updateOrder={createOrder} type={IN_DELIVERY} orders={orders.filter(order => order.status === IN_DELIVERY).sort((a,b) => (a.statusDate > b.statusDate) ? 1 : -1)}/>
        <OrderContainer employees={employees} updateOrder={createOrder} type={COMPLETE} orders={completeOrders}/>
        <div className="col-12 font-weight-bold">
            <span>Functional To-do:</span>
            <ul>
                <li><s>App is complete</s></li>
                <li>Update flower shop site to send data it's currently not sending</li>
                <li>List only orders for the current day, maybe only in ready</li>
                <li>List Orders in distance from shop, in ready column</li>
                <li>Not in Release: Bump orders up on the list after they've been in for a while</li>
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
