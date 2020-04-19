import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ReadyOrderContainerItem = ({order, stageForDelivery}) => {
    const [staged, setStaged] = useState(false);

    const stage = e => {
        e.preventDefault();
        setStaged(!staged);
        stageForDelivery(order, staged);
    }

    let details = order.description.split(',');
    let showAdditionalRow = order.cardMessage !== '' && order.specialInstructions !== '';
    return (
        <div className={staged ? 'col-12 row orderContainerItem activeOrderContainerItem' : 'col-12 row orderContainerItem'} onClick={e => stage(e)}>
            <div className="col-12 row">
                <div className="col-12 row">
                    <div className="col-4">
                        Order ID:&nbsp;
                    </div>
                    <div className="col-8">
                        {order.orderCount}
                    </div>
                    <div className="col-4">
                        Recipient:&nbsp;
                    </div>
                    <div className="col-8">
                        {order.recipient}
                    </div>
                    <div className="col-4">
                        Address:&nbsp;
                    </div>
                    <div className="col-8">
                        {order.deliveryAddress}
                    </div>
                    <div className="col-12 row">
                        <div className="col-4">
                        </div>
                        <div className="col-8">
                            {details.map((detail, index) => 
                                <div key={`product_detaiL_${index}`}>
                                    {detail.includes("Product") ? <b>{detail.split(':', 2)[1]}</b> : <i>{detail}</i>}
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
                    <div className="col-8"><Moment format="MM/DD/YY" date={order.deliveryDate}/></div>
                </div>
                <div className="col-12 row mt-1">
                    <div className="col-4">Distance:&nbsp;</div>
                    <div className="col-8">{order.distanceFromShop} miles</div>
                </div>
            </div>
        </div>
    )
}

ReadyOrderContainerItem.propTypes = {
    order: PropTypes.object.isRequired,
    stageForDelivery: PropTypes.func.isRequired,
}

export default ReadyOrderContainerItem;
