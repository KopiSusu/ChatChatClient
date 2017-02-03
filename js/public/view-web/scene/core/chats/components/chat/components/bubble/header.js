/* @flow */
import React from 'react'
import Icon from './../../../../../../common/icon'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.formatPhoneNumber = this.formatPhoneNumber.bind(this)
    }

    formatPhoneNumber(s) {
        if (s.length > 10)
            s = s.slice((s.length - 10));

        return (""+s).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    render() {
        return this.props.selectedTicket ? (
            <div className='header column-1'>
                <div className='title row-1'>
                    <div className='text row-1 column-2'>
                        <p className='column-1 row-2'>
                            {this.props.selectedTicket.from} <span>{`<${this.props.selectedTicket.name ? this.props.selectedTicket.name : 'no record'}>`}</span>
                        </p><br/><p className='column-1 row-2'>
                            {`${this.props.selectedTicket ? this.formatPhoneNumber(this.props.selectedTicket.mobile_number) : ''}`}
                        </p>
                    </div>
                </div>
            </div>
        ) : null
    }
}

export default Header;
