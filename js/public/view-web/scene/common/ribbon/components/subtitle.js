/* @flow */
import React from 'react'
import Icon from './../../icon'

class Subribbon extends React.Component {
  	render() {
  		switch(this.props.type) {
  			case 'icon': 
		  		return <span>
		      		<Icon icon={this.props.icon} iconClass={this.props.iconClass}/>
		        	<p>{this.props.name}</p> 
		        </span>
  			case 'button':
		  		return <span className={'button ' + this.props.iconClass}>
		      		<Icon icon={this.props.icon} iconClass={this.props.iconClass}/>
		        	<p>{this.props.name}</p> 
		        </span>
		    case 'subtitle':
		    	return <span>
		    		<p>{this.props.name}</p> 
		    	</span>
  		}
  	}
}

export default Subribbon;