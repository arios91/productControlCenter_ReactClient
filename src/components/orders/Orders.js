import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import OrderItem from './OrderItem';
import {getOrders, createOrder} from '../../actions/order'

const Orders = ({getOrders, createOrder, order:{orders, loading}}) => {
    const [formData, setFormData] = useState({
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
        orderTotal: 0
    });

    const {
        orderNum,
        description,
        cardMessage,
        specialInstructions,
        recipient,
        street,
        city,
        state,
        zip,
        deliveryPhone,
        customer,
        customerPhone,
        orderTotal
    } = formData;

    useEffect(() => {
        getOrders();
    }, [getOrders]);

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
            orderTotal
        });
    }


    const onChange = e => {setFormData({...formData, [e.target.name]: e.target.value})}


    
    return loading ? <div>Loading</div> : 
    <div className="ordersMainContainer">
        <div className="createOrderForm">
            <h3>Input Order</h3>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group row mx-0">
                    <input type="text" className='col' placeholder="Order Number" name="orderNum"  value={orderNum} onChange={e => onChange(e)} required/>
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
                <div className="form-group">
                    <textarea placeholder="Card Message" className='w-100' name="cardMessage"  value={cardMessage} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <textarea placeholder="Special Instructions" className='w-100' name="specialInstructions"  value={specialInstructions} onChange={e => onChange(e)} />
                </div>
                <div className='form-group row mx-0'>
                    <input type="text" className='col' placeholder='Customer' name='customer' value={customer} onChange={e => onChange(e)} />
                    <input type="tel" className='col' placeholder='Customer Phone' name='customerPhone' value={customerPhone} onChange={e => onChange(e)} />
                    <input type="number" className='col' min="1" step="any" placeholder='Total' name='orderTotal' value={orderTotal} onChange={e => onChange(e)} required />
                </div>

                <input type="submit" className="btn btn-primary w-100" value="Submit Order" />
            </form>
        </div>
        <hr/>
        <div className="ordersSubContainer">
            <h3>Orders</h3>
            {orders.map(order => <OrderItem order={order}/>)}
        </div>
    </div>
}

Orders.propTypes = {
    getOrders: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    order: state.order
});

export default connect(mapStateToProps, {getOrders, createOrder})(Orders)
