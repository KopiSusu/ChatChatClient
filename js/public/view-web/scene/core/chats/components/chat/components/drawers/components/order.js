/* @flow */
import React from 'react'
import moment from 'moment'
import ReactDOM from 'react-dom'
import domtoimage from 'dom-to-image';

import Icon from './../../../../../../../common/icon'

class Order extends React.Component {
    constructor(props) {
        super(props)
        this._takeSnapshot = this._takeSnapshot.bind(this)
    }

    _takeSnapshot() {
        let node = ReactDOM.findDOMNode(this)
        domtoimage.toJpeg(node).then((dataUrl) => {
            this.props.postImage(dataUrl, `account/1/customer/${this.props.selectedTicket.id}/msg`, this.props.selectedTicket)
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.order.id && this.props.order.item_list.length !== nextProps.order.item_list.length) {
            this.props.fetchRealData(`collection/items/${this.props.order.id}`, '_FETCH_CART')
        }
    }

    componentWillMount() {
        if(this.props.selectedTab.query === 'order' && this.props.order.id) {
            this.props.fetchRealData(`collection/items/${this.props.order.id}`, '_FETCH_CART')
        }
    }

    componentDidMount() {
        this.props.scrollComponent(ReactDOM.findDOMNode(this).scrollHeight);
    }

    componentDidUpdate(props) {
        if(this.props.cart.length !== props.cart.length)
            this.props.scrollComponent(ReactDOM.findDOMNode(this).scrollHeight);
    }

    render() {
        let subtotal = 0
        let items = 0
        return (
            <div 
                className='order column-1'>
                <div className='items column-1'> 

                    {
                        this.props.cart.length === 0 ? (
                            <div className='empty column-1'>
                                <div className='iconTitle'>
                                    <Icon icon='Empty'/>
                                    <h1>No active order</h1>
                                    <p>Add items to cart to initiate order</p>
                                </div>
                            </div>
                        ) : ( _.map(this.props.cart, (item, index) => {
                            subtotal += (parseInt(item.price.replace(/[,Rp ]+/g, '')) * item.quantity);
                            items += item.quantity                            
                            return (
                                <div className='item column-1' key={index}>
                                    <div className='column-3'>
                                        <div 
                                            className='cancel'
                                            onClick={() => {
                                                let newCart = this.props.order
                                                let id = newCart.item_list.indexOf(item.id + '')

                                                newCart.item_list.splice(id, 1)
                                                newCart.item_list = newCart.item_list.join(',')

                                                if(newCart.item_list === '')
                                                    newCart.item_list = '0'

                                                // if(newCart.item_list === '0') {
                                                //     let newTicket = this.props.selectedTicket
                                                //     newTicket.activity_status = {
                                                //         payment_active: false, 
                                                //         order_active: false, 
                                                //     }
                                                //     this.props.updateData(newTicket, `account/1/customer/${this.props.selectedTicket.id}`, '_FETCH_TICKETS')
                                                //     this.props.updateItem(newTicket, 'ticket') 
                                                // }

                                                this.props.updateData(newCart, `account/1/customer/${this.props.selectedTicket.id}/collection/${this.props.order.id}`, '_FETCH_ORDER')
                                                this.props.removeItem(item, 'PRODUCT_CART')
                                            }}>
                                            <Icon
                                                icon='Close'
                                                iconClass='column-1 row-1'/>
                                        </div>
                                        <div 
                                            className='image column-1' 
                                            style={{
                                                backgroundImage: `url(${item.img_src})`,
                                            }}/>
                                    </div>
                                    <div className='column-3-2'>
                                        <div className='text row-1 column-1'>
                                            <h1 className='column-1'>{item.name}</h1>
                                            <p className='price column-1'>{item.price}</p>
                                        </div>
                                        <div className='inputs column-1'>
                                            <p>Quantity</p>
                                            <input 
                                                value={item.quantity}
                                                type="number"
                                                className='quantity column-1'
                                                onChange={(e) => {
                                                    item.quantity = parseInt(e.target.value)

                                                    this.props.submitItem(item, 'PRODUCT_CART')
                                                }}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))
                    }
                </div>
                <div className='toolbar column-1'>
                    <h1 className='column-1'>{items} items in cart</h1>
                    <div className='column-1'>
                        <p className='column-2'>Order Subtotal</p>
                        <p className='column-2'>{`Rp ${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                    </div>
                    <div className='column-1'>
                        <p className='column-2'>Shipping</p>
                        <p className='column-2'>{`Rp ${(subtotal * 0.01).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                    </div>
                    <div className='column-1'>
                        <p className='column-2'>Tax</p>
                        <p className='column-2'>{`Rp ${(subtotal * 0.07).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                    </div>
                    <div className='total column-1'>
                        <h2 className='column-2'>Total</h2>
                        <p className='column-2'>{`Rp ${(subtotal * 1.08).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                    </div>
                    <div className='send column-1'>
                        <h1 className='column-1' onClick={() => {
                            this._takeSnapshot()
                        }}>Send</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;

