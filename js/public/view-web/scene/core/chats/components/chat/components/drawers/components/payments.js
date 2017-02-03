/* @flow */
import React from 'react'
import moment from 'moment'

import Icon from './../../../../../../../common/icon'

class Payments extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='payments column-1'>
                {this.renderTitle()}
                <h1 className='title'>Bank Transfer</h1>
                <div className='column-1'>
                    <div className='payment no column-1'>
                        <div className='empty column-1'>
                            <div className='iconTitle'>
                                <Icon icon='Receipt'/>
                                <h1>No receipt recieved</h1>
                                <p>Add image as bank transfer</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='title'>Credit Card</h1>
                <div className='column-1'>
                    <div className='credit column-1'>
                        <h1 className='subtitle column-2'>Card Information</h1>
                        <div className='editable column-1'>
                            <label className='column-2'>Name</label>
                            <input className='column-1 row-1'/>
                        </div>
                        <div className='editable column-1'>
                            <label className='column-2'>Card Number</label>
                            <input type='number' className='column-1 row-1'/>
                        </div>
                        <div className='editable column-1'>
                            <label className='column-2'>CVC</label>
                            <input type='number' className='column-1 row-1'/>
                        </div>
                        <div className='editable column-1'>
                            <label className='column-2'>Exp. date</label>
                            <input type='month' className='column-1 row-1'/>
                        </div>
                    </div>
                    <div className='credit column-1'>
                        <h1 className='subtitle column-2'>Billing Information</h1>
                        <div className='editable noHeight column-1'>
                            <label className='column-2'>Address</label>
                            <textarea className='column-1'/>
                        </div>
                        <div className='editable column-1'>
                            <label className='column-2'>City</label>
                            <input className='column-1 row-1'/>
                        </div>
                        <div className='editable column-1'>
                            <label className='column-2'>State</label>
                            <input className='column-10-9 row-1'/>
                            <Icon icon='Down'/>
                        </div>
                        <div className='editable column-1'>
                            <label className='column-2'>Postal Code</label>
                            <input className='column-1 row-1'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderTitle() {
        if (this.props.order && this.props.order.item_list.length > 0) {
            return (<h1 className='recieved'>Awaiting payment</h1>)
        } else {
            return (<h1 className='recieved no'>No active order</h1>)            
        }
    }
}

export default Payments;

