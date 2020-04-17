import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Moment from 'react-moment';
import { NEEDS_CONFIRMATION, COMPLETE } from '../../actions/constants';

const DeliveredOrderContainerItem = ({order, confirmDelivery}) => {
    const [displayModal, setShowModal] = useState(false);
    let details = order.description.split(',');

    const showModal = () => {setShowModal(true)};
    const closeModal = () => {setShowModal(false)};


    const customStyles = {
        overlay:{
            background: 'rgba(33, 37, 41, 0.3411764705882353)'
        },
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
        }
    }

    const updateOrder = e =>{
        e.preventDefault();
        order.status = COMPLETE;
        confirmDelivery(order, true);
    }

    return (
        <Fragment>
            <div className={order.status === NEEDS_CONFIRMATION ? 'col-12 row orderContainerItem needsConfirmation':'col-12 row orderContainerItem'} onClick={e => showModal(e)}>
                <div className="col-4">
                    Order ID:&nbsp;
                </div>
                <div className="col-8">
                    {order.orderCount}
                </div>
                <div className="col-4">
                    {order.recipient}
                </div>
                <div className="col-8">
                    {order.deliveryAddress}
                </div>
                <div className="col-4">
                    Driver:&nbsp;
                </div>
                <div className="col-8">
                    {order.driver}
                </div>
                <div className="col-4">
                    Delivered:&nbsp;
                </div>
                <div className="col-8">
                    <Moment format="MM/DD/YY, h:mm a" date={order.statusDate}/>
                </div>
                <div className="col-12">
                    {order.status}
                </div>
            </div>
            <Modal
                id="orderDetailsModal"
                isOpen={displayModal} 
                onRequestClose={closeModal} 
                ariaHideApp={false}
                style={customStyles}>
                    <div className="modalContainer row">
                        <div className="col-6 orderDetailsLabel">Delivery Date:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6"><Moment format="MM/DD/YYYY" date={order.deliveryDate}/></div>
                        <div className="col-6 orderDetailsLabel">Deliver To:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">{order.recipient}</div>
                        <div className="col-6 orderDetailsLabel">Delivery Address:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">{order.deliveryAddress}</div>
                        <div className="col-6 orderDetailsLabel">Phone:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">{order.deliveryPhone}</div>
                        <hr/>
                        <div className="col-6 orderDetailsLabel">Customer:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">{order.customer}</div>
                        <div className="col-6 orderDetailsLabel">Customer Phone:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">{order.customerPhone}</div>
                        <hr/>
                        <div className="col-6 orderDetailsLabel">Product Details:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">
                            {details.map((detail, index) => 
                                <div key={`product_detail_modal_${index}`}>
                                    {detail.includes("Product") ? <b>{detail.split(':', 2)[1]}</b> : <i>&nbsp;&nbsp;&nbsp;&nbsp;{detail}</i>}
                                </div>)
                            }
                        </div>
                        <div className="col-6 orderDetailsLabel">Total Price:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">${order.orderTotal}</div>
                        <hr/>
                        <div className="col-6 orderDetailsLabel">Card Message:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">{order.cardMessage}</div>
                        <div className="col-6 orderDetailsLabel">Special Instructions:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-6">{order.specialInstructions}</div>
                        <div className="col-12 row mt-3 detailsActionButtonsContainer text-center">
                            <div className="col-12 col-lg-6 p-2">
                                <button className='btn btn-block btn-secondary detailsActionButton' onClick={closeModal}>Back</button>
                            </div>
                            <div className="col-12 col-lg-6 p-2">
                                <button className='btn btn-block btn-primary detailsActionButton' onClick={updateOrder} disabled={order.status === COMPLETE}>Delivery Confirmed</button>
                            </div>
                        </div>
                    </div>
            </Modal>

        </Fragment>
    )
}

DeliveredOrderContainerItem.propTypes = {
    order: PropTypes.object.isRequired,
    confirmDelivery: PropTypes.func.isRequired,
}

export default DeliveredOrderContainerItem;
