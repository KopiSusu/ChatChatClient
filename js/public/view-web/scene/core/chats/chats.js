/* @flow */
import React from 'react'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as  Actions from './../../../../actions'

import Tabs from './../../common/tabs/tabs'
import ContextMenu from './../../common/contextMenu'

import './chats.styl'

// Weird pattern, Should this be provider to sub?

class Chats extends React.Component {
    constructor(props) {
        super(props)
    }

  	render() {
    	return (
    		<section className='chats list column-6-5'>
                {
                    this.props.children
                }
    		</section>
    	)
  	}
}

export default Chats;
