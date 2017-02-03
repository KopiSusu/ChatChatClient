/* @flow */
import React from 'react'
import moment from 'moment'
import Icon from './../../../../../../common/icon'

const pin = {
    icon: 'Pin',
    iconClass: 'interactive'
}

class Message extends React.Component {
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
        const me = this.props.msg_from.indexOf('19179001106') > -1 || this.props.msg_from.indexOf('12129259229') > -1
        return (
            <div className={'message ' + (me ? 'me' : 'them')}>
                <div className="container">
                    {
                        this.renderTags()
                    }
                </div>
                <div className='chevron bottom'></div>
            </div>
        )
    }

    renderTags() {
        const me = this.props.msg_from.indexOf('19179001106') > -1 || this.props.msg_from.indexOf('12129259229') > -1
        const created_on = moment().diff(this.props.created_on, 'days') === 0 ? moment(this.props.created_on).format('h:mm A') : moment(this.props.created_on).format('MMM D')
        const image = me ? 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRJGnYgJdw2uxmt6-3mqglDnT9BFOvMeO91fpc-Tp4vluON3sAT' : 'http://iconshow.me/media/images/ui/ios7-icons/png/512/person_1.png'
        const last = (this.props.tags.length - 1)
        return _.map(this.props.tags, (tag, index) => {
            return (
                <div className={`tag ${tag.tag}`} key={index}>
                    {index === last ? (
                        <img src={image} className="profile column-15-1"/>
                    ) : (
                        <div className="column-15-1"/>
                    )}
                    <div className='text column-15-13'>
                        {index === 0 ? (<h1>{me ? 'Tulola' : this.formatPhoneNumber(this.props.msg_from)}<span>{`${created_on}`}</span></h1>) : null}
                        {
                            _.map(tag.messages, (message, index) => {
                                const message_date = moment().diff(message.created_on, 'days') === 0 ? moment(message.created_on).format('h:mm A') : moment(message.created_on).format('MMM D')
                                const multiSelect = this.props.highlightedMessages.indexOf(message.id) > -1
                                return (
                                    <span 
                                        key={index}
                                        className={multiSelect ? 'multiSelect' : ''}
                                        onMouseDown={(e) => {
                                            if(this.props.msg_from !== '+12129259229' && e.nativeEvent.which !== 3) {
                                                this.props.selectItem(true, 'DRAGGING')
                                                this.props.selectItem(message.id, 'HIGHLIGHT_MESSAGE')
                                            }
                                        }}
                                        onMouseOver={() => {
                                            if (this.props.dragging && this.props.msg_from !== '+12129259229')
                                                this.props.selectItem(message.id, 'HIGHLIGHT_MESSAGE')
                                        }}>
                                        {
                                            message.data || message.img_src ? this.renderImage(message, multiSelect, me) : null
                                        }
                                        <p 
                                            className={multiSelect ? 'multiSelect' : ''} >
                                                {message.body}
                                                <span className="created">
                                                    {message_date}
                                                </span>
                                        </p>
                                    </span>
                                )
                            })
                        }
                    </div>
                    <div className='actions column-15-1'>

                    </div>
                </div>
            ) 
        })
    }

    renderImage(message, multiSelect, me) {
        return (
            <div 
                className={`image column-1 ${multiSelect ? 'multiSelect' : ''}`} 
                style={{
                    backgroundImage: `url(${message.img_src ? message.img_src : message.data})`,
                }}>
                <div className='actions'>
                    {!me && this.props.order && this.props.order.item_list && this.props.order.item_list.length > 0 ? (
                            <div className='action'>
                                <Icon icon='Cash'/>
                                <p>Mark Transfer</p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

export default Message

