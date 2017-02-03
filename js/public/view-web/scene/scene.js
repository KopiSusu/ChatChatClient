/* @flow */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as  Actions from './../../actions'

import Sidenav from './core/sidenav/sidenav'

import './core/global.styl'

class Scene extends React.Component {
  	render() {      
  		switch(this.props.user) {
  			case null:
  			case undefined:
  				return null;
  			default:
  				return (
  					<section className="window">
						  <Sidenav></Sidenav>
              {this.props.children}
				    </section>
  				)
  		}
  	}

}

const mapStateToProp = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProp, Actions)(Scene);
