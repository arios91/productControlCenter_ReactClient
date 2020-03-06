import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Moment from 'react-moment';
import {connect} from 'react-redux'
import {createOrder, getOrders} from '../../actions/order';
import {Link, withRouter} from 'react-router-dom';

const ReadyOrderContainerItem = ({order, createOrder, stageForDelivery}) => {
    const [staged, setStaged] = useState(false);

    const updateOrder = (e) => {
        e.preventDefault();
        if(order.status === 'new'){
            order.status = 'ready';
            createOrder(order, true);
        }
    }

    const testClick = e => {
        e.preventDefault();
        console.log('click');
        setStaged(!staged);
        console.log(staged);
        stageForDelivery(order, staged);
    }
    let details = order.description.split(',');
    let showAdditionalRow = order.cardMessage !== '' && order.specialInstructions !== '';
    return (
        <div className={staged ? 'col-12 row orderContainerItem activeOrderContainerItem' : 'col-12 row orderContainerItem'} onClick={e => testClick(e)}>
            <div className="col-12 row">
                <div className="col-12 row">
                    <div className="col-4">
                        {order.recipient}
                    </div>
                    <div className="col-8">
                        {order.deliveryAddress}
                    </div>
                    <div className="col-12 row">
                        <div className="col-4">
                            {order.orderNum}

                        </div>
                        <div className="col-8">
                            {details.map((detail, index) => 
                                <div key={`product_detaiL_${index}`}>
                                    {detail.includes("Product") ? <b>{detail.split(':', 2)[1]}</b> : <i>&nbsp;&nbsp;&nbsp;&nbsp;{detail}</i>}
                                </div>
                            )}

                        </div>
                    </div>
                    
                </div>
                {showAdditionalRow ?
                    <div className="col-12 row">
                        {order.cardMessage !== '' ?
                            <div className="col-12 row mt-1">
                                <div className="col-4">Card:&nbsp;</div>
                                <div className="col-8">{order.cardMessage}</div>
                            </div>
                        :null}
                        {order.specialInstructions !== '' ?
                            <div className="col-12 row mt-1">
                                <div className="col-4">Instructions:&nbsp;</div>
                                <div className="col-8">{order.specialInstructions}</div>
                            </div>
                        :null}
                    </div>
                :null}
                <div className="col-12 row mt-1">
                    <div className="col-4">Delivery Date:&nbsp;</div>
                    <div className="col-8"><Moment format="MM/DD/YYYY" date={order.deliveryDate}/></div>
                </div>
            </div>
        </div>
    )
}

ReadyOrderContainerItem.propTypes = {
    createOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    stageForDelivery: PropTypes.func.isRequired,
}

export default connect(null, {createOrder})(withRouter(ReadyOrderContainerItem))
