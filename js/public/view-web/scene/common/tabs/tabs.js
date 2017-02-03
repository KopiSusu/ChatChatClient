/* @flow */
import React from 'react'
import { browserHistory } from 'react-router'
import moment from 'moment'

import Icon from './../icon'
import Search from './../search/search'

class Tabs extends React.Component {
    constructor(props) {
        super(props)

        this._clickHandler = this._clickHandler.bind(this)
    }

    formatPhoneNumber(s) {
        if (s.length > 10)
            s = s.slice((s.length - 10));

        return (""+s).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    _clickHandler(tab) {
        switch(tab.type) {
            case 'tab':
                this.props.selectItem(tab, `tab_${this.props.parent}`)
                break;
            case 'icon':
                this._handleAction(tab)
                break;
        }
    }

    _handleAction(tab) {
        switch(tab.action) {
            case 'back':
                this.props.selectItem(null, 'ticket')
                browserHistory.push('/chats')
                break;
        }
    }

    render() {
        return (
            <section className='tabs column-1'>
                {
                    _.map(this.props.tabs, (tab, index) => {
                        let addClass = '';
                        switch (tab.type) {
                            case 'tab':
                                return (
                                    <div 
                                        key={index} 
                                        onClick={ () => { this._clickHandler(tab) }} 
                                        className={`tab ${tab.className} row-1 ${this.props.selectedTab.id === tab.id ? 'selected' : ''}`}>
                                            <Icon icon={tab.icon} iconClass='column-10-3 row-1'/>
                                            <p className='column-3-2 row-1'>{tab.title}</p>
                                    </div>
                                ) 
                            case 'icon':
                                return (
                                    <div 
                                        key={index} 
                                        onClick={ () => { this._clickHandler(tab) }} 
                                        className={`iconButton ${tab.className} tab column-5-1 row-1`}>
                                            <Icon icon={tab.icon} iconClass='column-3 row-1'/>
                                    </div>
                                )  
                            case 'text bubble':
                                return this.props.selectedTicket ? (
                                    <div key={index} className='title row-1'>
                                        <div className='platform row-1'>
                                            <Icon icon={this.props.selectedTicket.platform} iconClass='row-2'/>
                                            <p className='row-2'>{this.props.selectedTicket.platform}</p>
                                        </div>
                                        <div className='text row-1 column-2'>
                                            <p className='column-1 row-2'>
                                                {this.props.selectedTicket.from} <span>{`<no record>`}</span>
                                            </p><br/><p className='column-1 row-2'>
                                                {`${this.props.selectedTicket ? this.formatPhoneNumber(this.props.selectedTicket.mobile_number) : ''}`}
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            case 'select':
                                let value = 's'
                                return (
                                    <select 
                                        key={index} 
                                        className='column-5-1 row-1' 
                                        value={value}
                                        onChange={(e) => { 
                                            e.preventDefault()
                                            this.props.selectItem(e.currentTarget.value, 'TAGS') 
                                        }}>
                                        <option value='s' disabled="disabled">Actions</option>
                                        {
                                            _.map(tab.options, (option) => {
                                                return (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                )
                        }
                    })
                }
            </section>
        );
    }
}

//                                         <div className='platform row-1'>
//                                             <Icon icon={this.props.selectedTicket.platform} iconClass='row-2'/>
//                                             <p className='row-2'>{this.props.selectedTicket.platform}</p>
//                                         </div>

export default Tabs;