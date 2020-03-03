import React from 'react'
import PropTypes from 'prop-types'

const OrderItem = ({order}) => {
    return (
        <div>
            {order.orderNum}
        </div>
    )
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
}

export default OrderItem
