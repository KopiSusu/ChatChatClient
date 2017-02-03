/* @flow */
import React from 'react'
import moment from 'moment'

import Icon from './../../../../../../../common/icon'

class Items extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if(this.props.selectedChatTab.action === 'products')
            this.props.fetchRealData(`account/1/items`, '_FETCH_PRODUCTS')
    }

    componentDidUpdate(props) {

        if (
            this.props.selectedChatTab.action === 'products' &&
            this.props.items.length === 0
        )
            this.props.fetchRealData(`account/1/items`, '_FETCH_PRODUCTS')
    }


    dragStart(e) {

        var data = {
          name: 'foobar',
          age: 15 
        };

        e.dataTransfer.setData('text', JSON.stringify(data)); 

    }

    render() {
        return (
            <div className='items column-1 row-1'>
                {
                    _.map(this.props.items, (item, index) => {
                        return this.renderItem(item, index)
                    })
                }
            </div>    
        );
    }

    renderItem(item, index) {
        switch (item.item_type) {
            case 'template':
                return (
                    <div 
                        draggable='true'
                        onDragStart={(e) => {
                            e.dataTransfer.setData('text', JSON.stringify(item)); 
                        }}
                        className='template column-3 row-1' 
                        key={index}>
                        <p>{item.value}</p>
                    </div>
                )
            case 'product':
                const inCart = this.props.order ? this.props.order.item_list.indexOf(item.id + '') : -1

                return (
                    <div 
                        draggable='true'
                        key={index} 
                        onDragStart={(e) => {
                            e.dataTransfer.setData('text', JSON.stringify(item)); 
                        }}
                        className='product column-3 row-1'>
                        <div 
                            className='button add'
                            onClick={(e) => {

                                let action = this.props.submitItem
                                let newCart = this.props.order
                                let newTicket = this.props.selectedTicket
                                let create = false

                                if(!newCart.id) {
                                    create = true
                                }

                                if(inCart === -1) {
                                    newCart.item_list.push(item.id)
                                    newCart.item_list = newCart.item_list.join(',')
                                } else {
                                    action = this.props.removeItem
                                    newCart.item_list.splice(inCart, 1)
                                    newCart.item_list = newCart.item_list.join(',')
                                }

                                if(newCart.item_list.length === 0) {
                                    newCart.item_list = "0"
                                }

                                // if(newCart.item_list.length === 1) {
                                //     newTicket.activity_status = {
                                //         payment_active: false, 
                                //         order_active: newCart.item_list === "0" ? false : true, 
                                //     }

                                //     this.props.updateData(newTicket, `account/1/customer/${this.props.selectedTicket.id}`, '_FETCH_TICKETS')
                                //     this.props.updateItem(newTicket, 'ticket') 
                                // }

                                if(create) {
                                    this.props.postData(newCart, `collection`, '_FETCH_ORDER')
                                } else {
                                    this.props.updateData(newCart, `account/1/customer/${this.props.selectedTicket.id}/collection/${this.props.order.id}`, '_FETCH_ORDER')
                                }

                                action(item, 'PRODUCT_CART')
                            }}>
                            <Icon icon='Cart'/>
                            <p>{ inCart === -1 ? 'Add' : 'Remove'}</p>
                        </div>
                        <div 
                            className='image row-3-2 column-1' 
                            style={{
                                backgroundImage: `url(${item.img_src})`,
                            }} />
                        <div className='text row-3-1 column-1'>
                            <p className='column-1'>{item.name}</p>
                            <p className='price column-1'>{item.price}</p>
                        </div>
                    </div>
                )
        }
    }

}

export default Items;
// 