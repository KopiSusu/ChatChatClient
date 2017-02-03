/* @flow */
import React from 'react'
import moment from 'moment'


import Icon from './../../../../../../../common/icon'

class Details extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const edit = false;

        return (
            <div className='customer column-1'>
                <div className='block column-1'>
                    <h1 
                        className='column-1'>Customer Details</h1>
                    <div className='inputs column-1'>
                        <div className={`${edit ? '' : 'no'} editable column-1`}>
                            <label className={`${edit ? '' : 'bottom'} column-2`}>Current Platform</label>
                            <Icon icon={this.props.selectedTicket.platform}/>
                            <p className='column-15-12'>{this.props.selectedTicket.platform}</p>
                        </div>
                        <div className={`${edit ? '' : 'no'} editable column-1`}>
                            <label className={`${edit ? '' : 'bottom'} column-2`}>Number</label>
                            <p className='column-1'>{this.props.selectedTicket.mobile_number}</p>
                        </div>
                        <div className={`${edit ? '' : 'no'} editable column-1`}>
                            <label className={`${edit ? '' : 'bottom'} column-2`}>Email</label>
                            <p className='column-1'>{this.props.selectedTicket.email}</p>
                        </div>
                        <div className={`${edit ? '' : 'no'} editable column-1`}>
                            <label className={`${edit ? '' : 'bottom'} column-2`}>Name</label>
                            <p className='column-1'>{this.props.selectedTicket.name}</p>
                        </div>
                    </div>
                </div>
                <div className='block column-1'>
                    <h1 
                        className='column-1'>Shipping Information</h1>
                    <div className='inputs column-1'>
                        <div className={`${edit ? '' : 'no'} noHeight editable column-1`}>
                            <label className={`${edit ? '' : 'bottom'} column-2`}>Address</label>
                            <p className='column-1'></p>
                            <p className='column-1'></p>
                            <p className='column-1'></p>
                        </div>
                        <div className={`${edit ? '' : 'no'} editable column-1`}>
                            <label className={`${edit ? '' : 'bottom'} column-2`}>City</label>
                            <p className='column-1'></p>
                        </div>
                        <div className={`${edit ? '' : 'no'} editable column-1`}>
                            <label className={`${edit ? '' : 'bottom'} column-2`}>State</label>
                            <p className='column-1'></p>
                        </div>
                        <div className={`${edit ? '' : 'no'} editable column-1`}>
                            <label className={`${edit ? '' : 'bottom'} column-2`}>Postal Code</label>
                            <p className='column-1'></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;

