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
                    <div className="col-4 orderItemLabel">
                        ID:&nbsp;
                    </div>
                    <div className="col-8 orderItemText">
                        {order.orderCount}
                    </div>
                    <div className="col-4 orderItemLabel">
                        Recipient:&nbsp;
                    </div>
                    <div className="col-8 orderItemText">
                        {order.recipient}
                    </div>
                    <div className="col-4 orderItemLabel">
                        Address:&nbsp;
                    </div>
                    <div className="col-8 orderItemText">
                        {order.deliveryAddress}
                    </div>
                    <div className="col-12 row">
                        <div className="col-4">
                        </div>
                        <div className="col-8 orderItemDescription">
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
                                <div className="col-4 orderItemLabel">Card:&nbsp;</div>
                                <div className="col-8 orderItemText">{order.cardMessage}</div>
                            </div>
                        :null}
                        {order.specialInstructions !== '' ?
                            <div className="col-12 row mt-1">
                                <div className="col-4 orderItemLabel">Instructions:&nbsp;</div>
                                <div className="col-8 orderItemText">{order.specialInstructions}</div>
                            </div>
                        :null}
                    </div>
                :null}
                <div className="col-12 row mt-1">
                    <div className="col-4 orderItemLabel">Delivery Date:&nbsp;</div>
                    <div className="col-8 orderItemText"><Moment format="MM/DD/YY" date={order.deliveryDate}/></div>
                </div>
                <div className="col-12 row mt-1">
                    <div className="col-4 orderItemLabel">Distance:&nbsp;</div>
                    <div className="col-8 orderItemText">{order.distanceFromShop} miles</div>
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
