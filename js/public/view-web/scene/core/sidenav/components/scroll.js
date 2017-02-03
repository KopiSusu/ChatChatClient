/* @flow */
import React from 'react'
import Ribbon from './../../../common/ribbon/ribbon'
import List from './list'
import Buttons from './buttons'

const listsData =  {
    title: null,
    subTitle: {
        name: 'Current User',
        type: 'icon',
        icon: 'Circle',
        iconClass: 'online'
    },
    iconArray: [
        {   
            type: 'icon',
            icon: 'Down',
            iconClass: 'interactive'
        },
        {
            type: 'icon',
            icon: 'Bell',
            iconClass: 'interactive'
        }
    ]
}
class Scroll extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let lists = listsData
        if(this.props.company)
            lists.title = this.props.company.name

        lists.subTitle.name = this.props.user.username
        return (
            <div className="scroll">
                <div className="sub">
                    <List
                        list={this.props.navigation} 
                        selected={this.props.selected} 
                        selectItem={this.props.selectItem}
                    ></List>
                </div>
            </div>
        );
    }
}

export default Scroll;
