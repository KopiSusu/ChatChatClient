/* @flow */
import React from 'react'
import Icon from './icon'

const search = {
    icon: 'Search',
    iconClass: 'interactive'
}

class ContextMenu extends React.Component {
    render() {
        return (
            <div className='contextMenu' style={this.props.contextPlacement}>
                {
                    _.map(this.props.contextMenu, (option, index) => {
                        return (
                            <button 
                                key={index}
                                className='contextItem'
                                value={option.value}
                                onClick={(e) => {
                                    e.preventDefault()

                                    this.props.selectItem(e.currentTarget.value, 'TAGS_MESSAGE') 
                                    this.props.selectItem(false, 'CONTEXT_OPEN')
                                }}>
                                    <Icon icon={option.icon}/>
                                    <p>{option.text}</p>
                            </button>
                        )
                    })
                }
            </div>
        );
    }
}

export default ContextMenu;