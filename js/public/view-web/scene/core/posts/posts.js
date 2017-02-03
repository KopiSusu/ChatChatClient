/* @flow */
import React from 'react'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as  Actions from './../../../../actions'

import Tabs from './../../common/tabs/tabs'
import ContextMenu from './../../common/contextMenu'

import './posts.styl'

class Posts extends React.Component {
    constructor(props) {
        super(props)
    }

  	render() {
    	return (
    		<section className='posts list column-6-5'>
                <div className='view column-1 row-1'>
                    Hello
                </div>
    		</section>
    	)
  	}
}



export default Posts;
