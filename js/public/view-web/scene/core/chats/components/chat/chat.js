/* @flow */
import React from 'react'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as  Actions from './../../../../../../actions'
import { browserHistory } from 'react-router'

import Icon from './../../../../common/icon'
import Bubble from './components/bubble/bubble'
import Input from './components/input/input'
import Drawers from './components/drawers/drawers'
import Tabs from './../../../../common/tabs/tabs'

import './chat.styl'

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this._startPolling = this._startPolling.bind(this)
    }

    // Replace with live socket connection, current polling hack for demo.
    _startPolling(stop) {
        if(stop) {
            if(self)
                clearTimeout(self.timeout)

            clearTimeout(this.timeout)
        } else {
            let self = this
            self.timeout = setTimeout(() => {
                console.log('in timeout')
                self.props.fetchRealData(`account/1/customer/${self.props.selectedTicket.id}/msg`, '_FETCH_MESSAGES')
                self._startPolling()
            }, 5000);
        }
    }

    componentWillMount() {
        this._startPolling()

        if (!this.props.selectedTicket)
            browserHistory.push('/chats')

        if(this.props.selectedTicket) {
            this.props.fetchRealData(`account/1/customer/${this.props.selectedTicket.id}/msg`, '_FETCH_MESSAGES')
            this.props.fetchRealData(`collection/customer/${this.props.selectedTicket.id}/type/order`, '_FETCH_ORDER')
            this.props.fetchRealData(`account/1/items`, '_FETCH_PRODUCTS')
        }
    }

    componentWillUnmount() {
        this._startPolling(true)
    }

    // Group Messages based on Date, Sender, and tag based on that heigharchy
    // Should move to actions
    _groupMessages() {
        let groupedMessages = {}
        let previousDateIndex = 0
        let previousMessageIndex = 0
        let previousFrom = 'start'
        let previousTag = 'start'
        let previousDate = moment(1989)
        let lastMessage = ''

        _.forEach(this.props.messages, (message, index) => { 
            const key = moment(message.created_on).format('MM-DD-YYYY')

            if (!moment(previousDate).isSame(key, 'day'))  
                groupedMessages[key] = []

            switch (previousFrom === message.msg_from) {
                case true:
                    if (groupedMessages[key][previousDateIndex]) {
                                
                        switch (previousTag === message.tag) {
                            case true:
                                if (groupedMessages[key][previousDateIndex].tags[previousMessageIndex]) {
                                    groupedMessages[key][previousDateIndex].tags[previousMessageIndex].messages.push(message)
                                    break
                                }
                            default:
                                groupedMessages[key][previousDateIndex].tags.push({
                                    tag: message.tag,
                                    messages: [message]
                                })

                                previousMessageIndex = groupedMessages[key][previousDateIndex].tags.length - 1
                                break
                        }
                        break
                    }
                default:
                    groupedMessages[key].push({
                        msg_from: message.msg_from,
                        created_on: message.created_on,
                        tags: [{
                            tag: message.tag,
                            messages: [message]
                        }]
                    })

                    previousDateIndex = groupedMessages[key].length - 1
                    previousMessageIndex = groupedMessages[key][previousDateIndex].tags.length - 1

                    break;
            }

            previousDate = message.created_on
            previousFrom = message.msg_from
            previousTag = message.tag
            lastMessage = message.body
        })

        return groupedMessages

    }

    render() {
        const allMessages = this._groupMessages()
        return (
            <section className='chat column-1'>
                <div className='side column-3 row-1'>
                    <Tabs
                        {...this.props}
                        parent={this.props.pathname === '/chats' ? 'chats' : 'ticket'}
                        tabs={this.props.tabs[0]}/>
                    <Drawers
                        postImage={this.props.postImage}
                        postData={this.props.postData}
                        updateData={this.props.updateData}
                        selectItem={this.props.selectItem}
                        submitItem={this.props.submitItem}
                        removeItem={this.props.removeItem}
                        {...this.props}/>
                </div>
                <div className='thread column-3-2 row-1'>
                    <div className='flow column-1'>
                        <div className='stream column-1'>
                            <Bubble
                                dragging={this.props.dragging}
                                selectItem={this.props.selectItem}
                                highlightedMessages={this.props.highlightedMessages}
                                allMessages={allMessages}
                                postData={this.props.postData}
                                updateData={this.props.updateData}
                                updateItem={this.props.updateItem}
                                submitItem={this.props.submitItem}
                                contextOpen={this.props.contextOpen}
                                {...this.props}/>
                            <Input
                                fetchRealData={this.props.fetchRealData}
                                postData={this.props.postData}
                                updateData={this.props.updateData}
                                updateItem={this.props.updateItem}
                                {...this.props}/>
                            <div className='column-1 padding'/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        pathname: state.routing.locationBeforeTransitions.pathname,
        dragging: state.chat.dragging,
        user: state.auth.user,
        order: state.chat.order,
        cart: state.chat.cart,
        tabs: state.chat.tabs,
        products: state.items.products,
        templates: state.items.templates,
        chatTabs: state.chat.chatTabs,
        selectedChatTab: state.chat.selectedChatTab,
        messages: state.chat.messages,
        highlightedMessages: state.chat.highlightedMessages,
        selectedTab: state.chat.selectedTab,
        selectedTicket: state.chat.selectedTicket
    }
}

export default connect(mapStateToProp, Actions)(Chat);

// type "add item to shipping cart"
// 