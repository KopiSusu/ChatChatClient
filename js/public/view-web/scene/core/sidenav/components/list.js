/* @flow */
import React from 'react'
import { browserHistory } from 'react-router'

import Icon from './../../../common/icon'

class List extends React.Component {

  	render() {
  		const selected = this.props.selected.name
  		const selectItem = this.props.selectItem
	    return (
	        <ul>
				{
					_.map(this.props.list, function (item, index) {
						return (
	                        <li 
	                            key={index} 
	                            className={ ( selected === item.name ? 'selected' : '' ) + " title"} 
	                            onClick={(e) => { 
	                            	selectItem(item, 'view') 
	                            	browserHistory.push(`/${item.name.toLowerCase()}`)
	                            }}
	                        >
	                            <Icon icon={item.icon}/>
	                            <p className="column-2-1 right">{item.name}</p>
	                            
	                        </li>
	                    )
					})
				}
			</ul>
	    )
  	}
}

export default List;
