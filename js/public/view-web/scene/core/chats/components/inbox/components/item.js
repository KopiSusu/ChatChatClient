/* @flow */
import React from 'react'
import { browserHistory } from 'react-router'

import Icon from './../../../../../common/icon'
import Select from './../../../../../common/select'

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.formatPhoneNumber = this.formatPhoneNumber.bind(this)
    }

    formatPhoneNumber(s) {
        s = s.substr(2)
        s = (""+s).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');
        s = '+1 ' + s
        return s
    }

    render() {
        
        const assignee = this.props.ticket.assignee ? this.props.ticket.assignee : this.props.user;
        const read = this.props.ticket.activity_status && this.props.ticket.activity_status.read ? this.props.ticket.activity_status.read : true     
        const active = this.props.ticket.activity_status && (this.props.ticket.activity_status.order_active || this.props.ticket.activity_status.payment_active) ? true : false
        const platform = this.props.ticket.platform ? this.props.ticket.platform : 'SMS'
        return (
            <li 
                className={`item ${this.props.highlightTicket === this.props.ticket ? 'selected' : ''} ${!read && this.props.user.id === assignee.id ? 'unread' : ''}`} 
                onClick={() => { this.props.selectItem(this.props.ticket, 'highlight', this.props.user.id) }}>
                <div className='row'>
                    <Icon 
                        icon='CheckEmpty' 
                        iconClass='interactive'/>
                    <Icon 
                        icon={active ? 'FillCircle' : 'UnfillCircle'}
                        iconClass={active ? 'ur' : 'd'}/>
                    <p className='column-6'><span className='bold'>From: </span>{this.formatPhoneNumber(this.props.ticket.mobile_number)}</p>
                    <Select
                        options={this.props.users}
                        selectItem={this.props.selectItem}
                        updateItem={this.props.updateItem}
                        value={assignee.id ? assignee.id : 'Unassigned'} 
                        item={this.props.ticket}
                        compare={this.props.user}
                        />
                    <p className='right'>{this.props.created_at}</p>
                    <Icon icon={platform} iconClass='right'/>
                </div>

                <div className='row toolbar'>
                    <div className='buttonGroup right'>
                        <button 
                            disabled={assignee.id !== this.props.user.id}
                            onClick={() => { 
                                if(assignee.id === this.props.user.id) {
                                    this.props.selectItem(this.props.ticket, 'ticket') 
                                    browserHistory.push(`/chats/${this.props.ticket.id}`)
                                }
                            }}>
                            Join Conversation
                        </button>
                    </div>
                    <p className={`response lineRight ${active ? 'ur' : 'd'}`}>
                        {active ? 'Unresolved' : 'Resolved'}
                    </p>
                    <div className='status column-3 row-1'>
                        <div className='column-1 row-2'>  
                            <Icon 
                                icon='Cart' 
                                iconClass={this.props.ticket.activity_status && this.props.ticket.activity_status.order_active ? 'o' : 'd'}/>
                            <p>{this.props.ticket.activity_status && this.props.ticket.activity_status.order_active ? 'Order in progress' : 'No order'}</p>
                        </div>
                        <div className='column-1 row-2'>
                            <Icon 
                                icon='Cash' 
                                iconClass={this.props.ticket.activity_status && this.props.ticket.activity_status.payment_active ? 'p' : 'd'}/>
                            <p>{this.props.ticket.activity_status && this.props.ticket.activity_status.payment_active ? 'Order in progress' : 'No Payment'}</p>
                        </div>
                    </div>
                </div>

            </li>
        );
    }
}

export default Item;

//                     <p className='snippit'> - {this.props.ticket.messages[0].value}</p>
// // 