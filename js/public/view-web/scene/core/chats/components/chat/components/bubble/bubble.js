/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import Icon from './../../../../../../common/icon'
import Message from './message'
import Header from './header'

class Bubble extends React.Component {
    constructor(props) {
        super(props)

        this._processAction = this._processAction.bind(this)
    }

    _processAction(message) {

        let action = message.split('~')[1].split(' ')[0]
        let index = parseInt(message.split('~')[1].split(' ')[1]) - 1

        let newCart = this.props.order

        switch(action) {
            case 'add':
                newCart.item_list.push(this.props.products[index].id + '')
                newCart.item_list = newCart.item_list.join(',')

                this.props.updateData(newCart, `collection/${this.props.order.id}`, '_FETCH_ORDER')
                this.props.submitItem(this.props.products[index], 'PRODUCT_CART')
                break;
            case 'remove':
                const itemId = this.props.order.item_list.indexOf(this.props.products[index].id + '')

                newCart.item_list.splice(itemId, 1)
                newCart.item_list = newCart.item_list.join(',')

                if(newCart.item_list.length === 0) {
                    newCart.item_list = "0"
                }

                this.props.updateData(newCart, `collection/${this.props.order.id}`, '_FETCH_ORDER')
                this.props.removeItem(this.props.products[index], 'PRODUCT_CART')
                break;
            case 'cart':
        }
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollTop = ReactDOM.findDOMNode(this).scrollHeight;

    }
    
    componentDidUpdate(prevProps) {
        if(this.props.messages.length !== prevProps.messages.length) {
            ReactDOM.findDOMNode(this).scrollTop = ReactDOM.findDOMNode(this).scrollHeight;
            const isCommand = this.props.messages[this.props.messages.length - 1].body.replace(/ /g,'')[0]

            if(isCommand === '~') {

                this._processAction(this.props.messages[this.props.messages.length - 1].body)
            }
        }
    }

    render() {	
        return (
            <div 
                ref='bubble' 
                className={`${this.props.selectedChatTab.id !== 0 ? 'shrink' : ''} bubble column-1`} 
                onDrop={(e) => {
                    e.preventDefault()

                    const data = JSON.parse(e.dataTransfer.getData('text'))
                    let newMessages = {}

                    switch(data.item_type) {
                        case 'template':
                            newMessages = {
                                "account_id": 1, 
                                "body": data.value, 
                                "created_on": moment(), 
                                "customer_id": 2, 
                                "data": null, 
                                "img_src": null, 
                                "id": (Math.random() * 10000000), 
                                "from": "+19179001106", 
                                "read": true, 
                                "source_type": "sms", 
                                "tag": null, 
                                "to": `+${this.props.selectedTicket.mobile_number}`,
                                "updated_on": moment()
                            }
                            break
                        case 'product':
                            newMessages = {
                                "account_id": 1, 
                                "body": `${data.name}\n${data.price}`, 
                                "created_on": moment(), 
                                "customer_id": 2, 
                                "data": data.img_src, 
                                "img_src": data.img_src, 
                                "id": (Math.random() * 10000000), 
                                "from": "+19179001106", 
                                "read": true, 
                                "source_type": "sms", 
                                "tag": null, 
                                "to": `+${this.props.selectedTicket.mobile_number}`,
                                "updated_on": moment()
                            }
                            break
                    }
                    e.currentTarget.value = ''

                    this.props.postData(newMessages, `account/1/customer/${this.props.selectedTicket.id}/msg`, '_SUBMIT_MESSAGE')
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    // Logic here
                }}
                onContextMenu={(e) => {
                    // e.preventDefault()
                    // this.props.selectItem(true, 'CONTEXT_OPEN')
                    // this.props.selectItem({
                    //     top: e.nativeEvent.y,
                    //     left: e.nativeEvent.x
                    // }, 'CONTEXT_PLACEMENT')
                }}
                onMouseDown={(e) => {
                    if (
                        !this.props.dragging && 
                        this.props.highlightedMessages.length > 0 && 
                        e.nativeEvent.which !== 3 &&
                        !this.props.contextOpen
                    ) {
                        this.props.selectItem('empty', 'HIGHLIGHT_MESSAGE')
                    } else {
                        this.props.selectItem(false, 'CONTEXT_OPEN')
                    }
                }}                                        
                onMouseUp={(e) => {
                    if (this.props.dragging && !this.props.contextOpen)
                        this.props.selectItem(false, 'DRAGGING')
                }}>
                <Header
                    {...this.props}
                    />
                {
                    this.props.messages.length === 0 ? (
                            <div className='empty column-1'>
                                <div className='iconTitle'>
                                    <Icon icon='EmptyChat'/>
                                    <h1>Whoops! No messages available</h1>
                                    <p>Dont be shy, break the ice!</p>
                                </div>
                            </div>
                    ) : _.map(this.props.allMessages, (messages, date, index) => {
                        return (
                            <div key={date}>
                                <div className="day">
                                    <h1 className="day">{moment(date).format('LL')}</h1>
                                </div>
                                {
                                    _.map(messages, (message, index) => {
                                        return (
                                            <Message 
                                                dragging={this.props.dragging}
                                                selectItem={this.props.selectItem}
                                                key={index} 
                                                order={this.props.order}
                                                highlightedMessages={this.props.highlightedMessages}
                                                {...message} 
                                                />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Bubble