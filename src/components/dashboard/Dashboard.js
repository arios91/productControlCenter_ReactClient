import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getOrders, createOrder} from '../../actions/order';
import {getUsers} from '../../actions/user';
import Spinner from '../layout/Spinner'
import OrderContainer from './OrderContainer';

const Dashboard = ({getOrders, createOrder, order:{orders, loading}}) => {
    useEffect(() => {
        console.log('useEffect1');
        getOrders();
    }, [getOrders]);
    
    useEffect(() => {
        console.log('useEffect2');
        const interval = setInterval(() => {
            getOrders();
        }, 1000 * 60 * 5 );
        return () => clearInterval(interval);
    }, []);


    
    return loading ? <Spinner/> :
    <div className="row">
        <OrderContainer type="new" orders={orders.filter(order => order.status === 'new')}/>
        <OrderContainer type="ready" orders={orders.filter(order => order.status === 'ready')}/>
        <OrderContainer type="inDelivery" orders={orders.filter(order => order.status === 'inDelivery')}/>
        <OrderContainer type="delivered" orders={orders.filter(order => order.status === 'delivered')}/>
    </div>
}

Dashboard.propTypes = {
    createOrder: PropTypes.func.isRequired,
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    order: state.order
})

export default connect(mapStateToProps, {getOrders, createOrder, getUsers})(Dashboard);
