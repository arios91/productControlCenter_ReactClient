import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Moment from 'react-moment';
import { NEEDS_CONFIRMATION, COMPLETE } from '../../actions/constants';
import PerfectScrollbar from 'react-perfect-scrollbar'


const DeliveryOrderContainerItem = ({order, confirmDelivery}) => {
    const [displayModal, setShowModal] = useState(false);
    let details = order.description.split(',');

    const showModal = () => {setShowModal(true)};
    const closeModal = () => {setShowModal(false)};



    const updateOrder = e => {
        e.preventDefault();
        if(order.bloomOrder){
            order.status= NEEDS_CONFIRMATION;
        }else{
            order.status = COMPLETE;
        }
        confirmDelivery(order, true);
        closeModal();
    }

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

    return (
        <Fragment>
            <div className='col-12 row orderContainerItem' onClick={e => showModal(e)}>
                <div className="col-4 orderItemLabel">
                    ID:&nbsp;
                </div>
                <div className="col-8 orderItemText">
                    {order.orderCount}
                </div>
                <div className="col-4 orderItemLabel">
                    Recipient:&nbsp;
                </div>
                <div className="col-8 orderItemLabel">
                    {order.recipient}
                </div>
                <div className="col-4 orderItemLabel">
                    Address:&nbsp;
                </div>
                <div className="col-8 orderItemText">
                    {order.deliveryAddress}
                </div>
                <div className="col-4 orderItemLabel">
                    Driver:&nbsp;
                </div>
                <div className="col-8 orderItemText">
                    {order.driver}
                </div>
                <div className="col-4 orderItemLabel">
                    Delivery Date:&nbsp;
                </div>
                <div className="col-8 orderItemText">
                    <Moment format="MM/DD/YY" date={order.deliveryDate}/>
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
                            <button className='btn col-5 btn-secondary detailsActionButton' onClick={closeModal}>Back</button>
                            <div className="col-2"></div>
                            <button className='btn col-5 btn-primary detailsActionButton' onClick={e => updateOrder(e)}>Confirm Delivery</button>
                        </div>
                    </div>
            </Modal>

        </Fragment>
    )
}

DeliveryOrderContainerItem.propTypes = {
    order: PropTypes.object.isRequired,
    confirmDelivery: PropTypes.func.isRequired
}

export default DeliveryOrderContainerItem;
