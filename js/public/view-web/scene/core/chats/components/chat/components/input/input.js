/* @flow */
import React from 'react'
import moment from 'moment'
import Icon from './../../../../../../common/icon'
import Textarea from './components/textarea'
import Items from './components/items'

class Input extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`${this.props.selectedChatTab.id !== 0 ? 'expand' : ''} inputs column-1`}>
                <div className='actions column-15-1 row-1'>
                    {
                        _.map(this.props.chatTabs, (tab, index) => {
                            return (
                                <span 
                                    key={index}
                                    className={`${this.props.selectedChatTab.id === tab.id ? 'selected' : ''} column-1 row-3`}
                                    onClick={() => {
                                        this.props.selectItem(tab, 'TAB_CHAT')
                                    }}>
                                    <Icon 
                                        icon={tab.icon}/>
                                </span>
                            )
                        })
                    }
                </div>
                <div className='input column-15-14 row-1'>
                    {
                        this.renderInput()
                    }
                </div>
            </div>
        );
    }

    renderInput() {
        let items = this.props.products
        switch (this.props.selectedChatTab.action) {
            case 'templates':
            items = this.props.templates
            case 'products':
                return (
                    <Items 
                        selectedChatTab={this.props.selectedChatTab}
                        selectItem={this.props.selectItem}
                        postData={this.props.postData}
                        updateData={this.props.updateData}
                        updateItem={this.props.updateItem}
                        submitItem={this.props.submitItem}
                        removeItem={this.props.removeItem}
                        selectedTicket={this.props.selectedTicket}
                        fetchRealData={this.props.fetchRealData}
                        cart={this.props.cart}
                        order={this.props.order}
                        items={items}/>
                )
            default:
                return (
                    <Textarea 
                        {...this.props}/>
                )
        }
    }
}

export default Input;




// <div 
//     className='textarea column-15-14 row-1'
//     ref={(input) => { this.textInput = input }} 
//     onKeyPress={this._handleKeyPress.bind(this)}
//     contentEditable={true}
//     dangerouslySetInnerHTML={{__html: 'start styping...'}}/>
