import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import OrderItem from './OrderItem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getOrders, createOrder} from '../../actions/order'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Switch from "react-switch";

const Orders = ({getOrders, createOrder, order:{orders, loading}, auth}) => {
    useEffect(() => {
        getOrders();
    }, [getOrders]);

    const [formData, setFormData] = useState({
        orderNum: '',
        description: '',
        cardMessage: '',
        specialInstructions: '',
        status: '',
        recipient: '',
        street: '',
        city: '',
        zip: '',
        deliveryPhone: '',
        customer: '',
        customerPhone: '',
        orderTotal: 0,
        bloomOrder: false,
        tmpDeliveryDate: Date.now()
    });

    const {
        orderNum,
        description,
        cardMessage,
        specialInstructions,
        recipient,
        street,
        city,
        zip,
        deliveryPhone,
        customer,
        customerPhone,
        orderTotal,
        bloomOrder,
        tmpDeliveryDate
    } = formData;

    const onSubmit = async e => {
        e.preventDefault();
        let deliveryAddress = `${street}, ${city}, TX ${zip}`;

        createOrder({
            orderNum,
            description,
            cardMessage,
            specialInstructions,
            recipient,
            deliveryAddress,
            deliveryPhone,
            customer,
            customerPhone,
            orderTotal,
            bloomOrder,
            deliveryDate: tmpDeliveryDate
        });

        setFormData({
            orderNum: '',
            description: '',
            cardMessage: '',
            specialInstructions: '',
            status: '',
            recipient: '',
            street: '',
            city: '',
            state: 'TX',
            zip: '',
            deliveryPhone: '',
            customer: '',
            customerPhone: '',
            bloomOrder: false,
            orderTotal: 0
        })
    }

    const typeToggle = (a,b,type) => {
        setFormData({...formData, bloomOrder: !bloomOrder});
    }

    const onChange = e => {setFormData({...formData, [e.target.name]: e.target.value})}

    const handleDateChange = date => {
        setFormData({...formData, tmpDeliveryDate: date})
    }
    
    return loading ? <div>Loading</div> : 
    <div className="ordersMainContainer marginContainer row row-cols-2 justify-content-between">
        <div className="ordersSubContainer createOrderForm col-12 col-lg-4 orderContainer text-center">
            <h3>Input Order</h3>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group row mx-0">
                    <input type="text" className='col' placeholder="Bloom Order Number" name="orderNum"  value={orderNum} onChange={e => onChange(e)}/>
                    <input type="text" className='col' placeholder='Recipient' name='recipient' value={recipient} onChange={e => onChange(e)} required/>
                    <input type="tel" className='col' placeholder='Recipient Phone' name='deliveryPhone' required value={deliveryPhone} onChange={e => onChange(e)} />
                </div>
                <div className='form-group row mx-0'>
                    <input type="text" className='col' placeholder='Street' name='street' value={street} onChange={e => onChange(e)} required/>
                    <input type="text" className='col' placeholder='City' name='city' value={city} onChange={e => onChange(e)} required/>
                    <input type="text" className='col' placeholder='ZIP' name='zip' value={zip} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <textarea placeholder="Description" className='w-100' name="description"  value={description} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group row">
                    <textarea placeholder="Card Message" className='col' name="cardMessage"  value={cardMessage} onChange={e => onChange(e)} />
                    <textarea placeholder="Special Instructions" className='col' name="specialInstructions"  value={specialInstructions} onChange={e => onChange(e)} />
                </div>
                <div className="form-group row">
                    <label htmlFor="bloomOrder">Bloom Order&nbsp;</label>
                    <Switch id="bloomOrder" onChange={typeToggle} checked={bloomOrder}/>
                </div>
                <div className='form-group row mx-0'>
                    <input type="text" className='col' placeholder='Customer' name='customer' value={customer} onChange={e => onChange(e)} />
                    <input type="tel" className='col' placeholder='Customer Phone' name='customerPhone' value={customerPhone} onChange={e => onChange(e)} />
                    <DatePicker selected={tmpDeliveryDate} onChange={date => handleDateChange(date)}></DatePicker>
                    <input type="number" className='col' min="1" step="any" placeholder='Total' name='orderTotal' value={orderTotal} onChange={e => onChange(e)} required />
                </div>

                <input type="submit" className="btn btn-primary w-100" value="Submit Order" />
            </form>
        </div>
        <div className="ordersSubContainer col-12 col-lg-7 orderContainer">
            <PerfectScrollbar>
                <div className="text-center">
                    <h3>Orders</h3>
                </div>
                <div className="row">
                    <div className="col-12 row">
                        <div className="col-10 row font-weight-bold">
                            <div className="col">Order</div>
                            <div className="col">ID</div>
                            <div className="col">Recipient</div>
                            <div className="col">Address</div>
                            <div className="col">Status</div>
                            <div className="col">Status Date</div>
                            <div className="col">In Date</div>
                            <div className="col">Total</div>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                    {orders.sort((a,b) => (a.orderCount < b.orderCount) ? 1 : -1).map(order => <OrderItem key={order._id} order={order} auth={auth} updateOrder={createOrder}/>)}
                </div>

            </PerfectScrollbar>
        </div>
    </div>
}

Orders.propTypes = {
    getOrders: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    auth: state.auth
});

export default connect(mapStateToProps, {getOrders, createOrder})(Orders)
