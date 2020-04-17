import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Moment from 'react-moment';
import { READY } from '../../actions/constants';

const NewOrderContainerItem = ({order, setToReady}) => {
    const [displayModal, setShowModal] = useState(false);

    const showModal = () => {setShowModal(true)};

    const closeModal = () => {setShowModal(false)};

    const updateOrder = (e) => {
        e.preventDefault();
        order.status = READY;
        setToReady(order, true);
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

    let details = order.description.split(',');
    let showAdditionalRow = order.cardMessage !== '' && order.specialInstructions !== '';
    return (
        <Fragment>
            <div className='col-12 row orderContainerItem' onClick={showModal}>
                <div className="col-10 row">
                    <div className="col-12 row">
                        <div className="col-5">
                            Order Id:&nbsp;
                        </div>
                        <div className="col-7">
                            {order.orderCount}
                        </div>
                        <div className="col-5">
                            {order.recipient}
                        </div>
                        <div className="col-7">
                            {details.map((detail, index) => 
                                <div key={`product_detaiL_${index}`}>
                                    {detail.includes("Product") ? <b>{detail.split(':', 2)[1]}</b> : <i>&nbsp;&nbsp;&nbsp;&nbsp;{detail}</i>}
                                </div>
                            )}
                        </div>
                    </div>
                    {showAdditionalRow ?
                        <div className="col-12 row">
                            {order.cardMessage !== '' ?
                                <div className="col-12 row mt-1">
                                    <div className="col-5">Card:&nbsp;</div>
                                    <div className="col-7">{order.cardMessage}</div>
                                </div>
                            :null}
                            {order.specialInstructions !== '' ?
                                <div className="col-12 row mt-1">
                                    <div className="col-5">Instructions:&nbsp;</div>
                                    <div className="col-7">{order.specialInstructions}</div>
                                </div>
                            :null}
                        </div>
                    :null}
                    <div className="col-12 row mt-1">
                        <div className="col-5">Arrival Date:&nbsp;</div>
                        <div className="col-7"><Moment format="MM/DD/YY, h:mm a" date={order.inDate}/></div>
                        <div className="col-5">Delivery Date:&nbsp;</div>
                        <div className="col-7"><Moment format="MM/DD/YY" date={order.deliveryDate}/></div>
                    </div>
                </div>
                <div className="col-2 text-center font-italic align-self-center">
                    ${order.orderTotal}
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
                        <div className="col-6"><Moment format="MM/DD/YY" date={order.deliveryDate}/></div>
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
                            <button className='btn col-5 btn-primary detailsActionButton' onClick={e => updateOrder(e)}>Complete</button>
                        </div>
                    </div>
            </Modal>

        </Fragment>
    )
}

NewOrderContainerItem.propTypes = {
    setToReady: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
}

export default NewOrderContainerItem
