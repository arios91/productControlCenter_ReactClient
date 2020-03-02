import React from 'react'
import PropTypes from 'prop-types'

const OrderContainer = ({type, orders}) => {
    return (
        <div className='col-3 orderContainer'>
            Container
        </div>
    )
}

OrderContainer.propTypes = {
    orders: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default OrderContainer;
