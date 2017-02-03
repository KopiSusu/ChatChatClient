/* @flow */
import React from 'react'
import moment from 'moment'
import ReactDOM from 'react-dom'

import Details from './components/details'
import Order from './components/order'
import Payments from './components/payments'

class Drawers extends React.Component {
    constructor(props) {
        super(props)
        this.scrollComponent = this.scrollComponent.bind(this)
    }

    scrollComponent(to) {
        ReactDOM.findDOMNode(this).scrollTop = to
    }

    render() {
        return (
            <div className={`details column-1`}>
                {
                    this.renderDetails()
                }
            </div>
        );
    }

    renderDetails() {
        switch (this.props.selectedTab.query) {
            case 'details':
                return this.props.selectedTicket ? (
                    <Details
                        scrollComponent={this.scrollComponent}
                        {...this.props}/>
                ) : null
            case 'order':
                return (
                    <Order
                        postImage={this.props.postImage}
                        scrollComponent={this.scrollComponent}
                        {...this.props}/>
                )
            case 'payment':
                return (
                    <Payments
                        postImage={this.props.postImage}
                        scrollComponent={this.scrollComponent}
                        {...this.props}/>
                )
        }
    }
}

export default Drawers;

