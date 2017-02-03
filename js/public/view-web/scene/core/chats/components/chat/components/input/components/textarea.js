/* @flow */
import React from 'react'
import moment from 'moment'

class Textarea extends React.Component {
    constructor(props) {
        super(props)

        this._handleKeyPress = this._handleKeyPress.bind(this)
    }

    componentDidMount() {
        this.textInput.focus()
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault()

            const newMessages = {
                "account_id": 1, 
                "body": e.currentTarget.value, 
                "created_on": moment(), 
                "customer_id": 2, 
                "data": null, 
                "img_src": null, 
                "id": parseInt((Math.random() * 10000000)), 
                "from": "+19179001106", 
                "read": true, 
                "source_type": "sms", 
                "tag": null, 
                "to": `+${this.props.selectedTicket.mobile_number}`,
                "updated_on": moment()
            }

            e.currentTarget.value = ''

            this.props.postData(newMessages, `account/1/customer/${this.props.selectedTicket.id}/msg`, '_SUBMIT_MESSAGE')
            // this.props.submitItem(newMessages, 'MESSAGE')
        }
    }

    render() {
        return (
            <textarea
                className='textarea column-1 row-1'
                ref={(input) => { this.textInput = input }} 
                onKeyPress={this._handleKeyPress.bind(this)}
                placeholder='Start typing...'/>
        );
    }

}

export default Textarea;




// <div 
//     className='textarea column-15-14 row-1'
//     ref={(input) => { this.textInput = input }} 
//     onKeyPress={this._handleKeyPress.bind(this)}
//     contentEditable={true}
//     dangerouslySetInnerHTML={{__html: 'start styping...'}}/>
