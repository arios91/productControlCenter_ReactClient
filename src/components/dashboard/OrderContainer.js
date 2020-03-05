import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import OrderContainerItem from './OrderContainerItem';

const OrderContainer = ({type, orders}) => {
    return (
        <div className='col-12 col-md-6 col-lg-3 orderContainer row'>
            <div className="col-12 text-center orderContainerHeader">
                <span>
                    {type}
                </span>
            </div>
            {orders.map(order => <OrderContainerItem key={order._id} order={order}/>)}
        </div>
    )
}

OrderContainer.propTypes = {
    orders: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default OrderContainer;
