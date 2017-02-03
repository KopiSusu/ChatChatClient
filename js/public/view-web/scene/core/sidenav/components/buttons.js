/* @flow */
import React from 'react'
import Icon from './../../../common/icon'

class Buttons extends React.Component {

  	render() {
	    return (
	        <ul className='buttons'>
				{
					_.map(this.props.buttons, function (button, index) {
						return (
	                        <li 
	                            key={index} 
	                            className={" title button"} 
	                            style={{'color': button.color}}
	                            onClick={(e) => {  }}
	                        >
	                            <Icon icon={button.icon} iconClass="right"/>
	                            <p className="column-2-1">{button.name}</p>
	                        </li>
	                    )
					})
				}
			</ul>
	    )
  	}
}

export default Buttons;
