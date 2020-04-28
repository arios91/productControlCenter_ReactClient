import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import Modal from 'react-modal'
import Moment from 'react-moment';

const OrderItem = ({order, auth:{user,loading}, updateOrder}) => {
    const [displayModal, setShowModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const NEW_STATUS = '-- New Status --';
    const statuses = ['new', 'ready', 'inDelivery', 'Delivered', 'Void'];

    const showModal = () => {setShowModal(true)};

    const closeModal = () => {setShowModal(false)};

    const handleStatusChange = (e) => {
        if(e.target.value === NEW_STATUS){
            setNewStatus('');
        }else{
            setNewStatus(e.target.value);
        }
    }

    const editOrder = (e) => {
        if(user.role === 1){
            e.preventDefault();
            order.status = newStatus;
            updateOrder(order, true);
            closeModal();
        }else{
            alert('Invalid Permissions');
        }
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
    return loading ? <Spinner/> :
        <Fragment>
            <div className="col-12 row orderContainerItem">
                <div className="col-10 row">
                    <div className="col">{order.orderCount}</div>
                    <div className="col">{order.orderNum}</div>
                    <div className="col">{order.recipient}</div>
                    <div className="col">{order.deliveryAddress}</div>
                    <div className="col">{order.status}</div>
                    <div className="col"><Moment format="MM/DD/YY hh:mm a" date={order.statusDate}/></div>
                    <div className="col"><Moment format="MM/DD/YY hh:mm a" date={order.inDate}/></div>
                    <div className="col">${order.orderTotal}</div>
                </div>
                <div className="col-2">
                    {user.role === 1 ? 
                        <button className="btn btn-block btn-secondary" onClick={showModal}>Edit</button>
                    :null}
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
                    <div className="col-6 orderDetailsLabel">New Status:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div className="col-6">
                        <select className="form-control" onChange={e => handleStatusChange(e)}>
                            <option>{NEW_STATUS}</option>
                            {statuses.map(status => <option key={status}>{status}</option>)}
                        </select>
                    </div>
                    <div className="col-12 row mt-3 detailsActionButtonsContainer text-center">
                        <button className='btn col-5 btn-secondary detailsActionButton' onClick={closeModal}>Back</button>
                        <div className="col-2"></div>
                        <button className='btn col-5 btn-primary detailsActionButton' onClick={e => editOrder(e)}>Complete</button>
                    </div>
                </div>
            </Modal>
        </Fragment>
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    updateOrder: PropTypes.func.isRequired,
}

export default OrderItem
