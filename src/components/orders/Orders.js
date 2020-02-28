import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getOrders} from '../../actions/order'

const Orders = ({getOrders, order:{orders, loading}}) => {
    useEffect(() => {
        getOrders();
    }, [getOrders])
    
    return loading ? <div>Loading</div> : <Fragment>
        <h1>Orders</h1>
        <div className="orders">
            {orders.map(order => {
                return(
                    <h4>{order.orderNum}</h4>
                )
            })}
        </div>
    </Fragment>
}

Orders.propTypes = {
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    order: state.order
});

export default connect(mapStateToProps, {getOrders})(Orders)
