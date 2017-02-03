/* @flow */
import React from 'react'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as  Actions from './../../../../../../actions'

import Item from './components/item'
import Actionbar from './components/actionbar'
import Tabs from './../../../../common/tabs/tabs'

import './inbox.styl'

class Inbox extends React.Component {
    constructor(props) {
        super(props)
        this._constructQuery = this._constructQuery.bind(this)
    }

    componentWillMount() {
        if(this.props.tickets.length === 0) {
            this.props.fetchRealData('account/1/user', '_FETCH_USERS')
            this.props.fetchRealData('account/1/customer', '_FETCH_TICKETS')
            // this.props.fetchData('company', '_FETCH_COMPANY')
       }
    }

    _constructQuery (ticket) {
        switch (this.props.selectedTab.query) {
            case 'Mine':
                return this.props.user.id === (ticket.assignee ? ticket.assignee.id : this.props.user.id)
            case 'New':
                return (
                    ticket.assignee ? !ticket.assignee.id : !this.props.user.id
                )
            default:
                return true
        }
    }

    render() {
    	const highlightTicket = this.props.highlightTicket
        const user = this.props.user
        const users = this.props.users

        const selectItem = this.props.selectItem
        const updateItem = this.props.updateItem

        // this will most likely happen on server, request for filtered lists
        const query = this.props.selectedTab.query

        const filteredTickets = _.filter(this.props.tickets, (ticket) => {
            return this._constructQuery(ticket)
        })

        return (
            <section className='inbox column-1 row-8-7'>
                <Tabs
                    parent={this.props.pathname === '/chats' ? 'chats' : 'ticket'}
                    {...this.props}/>
                <Actionbar
                    parent={this.props.pathname === '/chats' ? 'chats' : 'ticket'}
                    {...this.props}/>
                {
                    _.map(filteredTickets, function (ticket, index) {
                        const created_at = moment().diff(ticket.last_updated, 'days') === 0 ? moment(ticket.last_updated).format('h:mm A') : moment(ticket.last_updated).format('MMM D')                       
                        return (
                            <Item 
                                key={index}
                                created_at={created_at}
                                ticket={ticket}
                                user={user}
                                users={users}
                                updateItem={updateItem}
                                highlightTicket={highlightTicket}
                                selectItem={selectItem}/>
                        )
                    })
                }
            </section>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        pathname: state.routing.locationBeforeTransitions.pathname,
        user: state.auth.user,
        company: state.auth.company,
        query: state.inbox.query,
        users: state.auth.users,
        tickets: state.inbox.tickets,
        tabs: state.inbox.tabs,
        highlightTicket: state.inbox.highlightTicket,
        selectedTab: state.inbox.selectedTab
    }
}

export default connect(mapStateToProp, Actions)(Inbox);
