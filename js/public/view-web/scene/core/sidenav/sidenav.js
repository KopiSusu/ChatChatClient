/* @flow */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as  Actions from './../../../../actions'

import Ribbon from './../../common/ribbon/ribbon'
import Icon from './../../common/icon'

import Scroll from './components/Scroll'

import './sidenav.styl'


class Sidenav extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // this.props.fetchData('navigation', '_FETCH_NAVIGATION')
    }

    render() {
        return (
            <section className='sidenav list column-6-1'>
                <div className='header column-1'>
                    <div className='logo row-1'>
                        <img 
                            className={`row-1`} 
                            src='https://s3.amazonaws.com/datadummy/templogo.svg'/>
                        <p className={`text`}>ChatChat</p>
                    </div>
                </div>
                <Scroll 
                    user={this.props.user}
                    company={this.props.company}
                    navigation={this.props.navigation} 
                    selected={this.props.selected} 
                    selectItem={this.props.selectItem}
                ></Scroll>
            </section>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        user: state.auth.user,
        company: state.auth.company,
        navigation: state.sidenav.navigation,
        selected: state.sidenav.selected,
        isFetching: state.sidenav.isFetching
    }
}

export default connect(mapStateToProp, Actions)(Sidenav);
