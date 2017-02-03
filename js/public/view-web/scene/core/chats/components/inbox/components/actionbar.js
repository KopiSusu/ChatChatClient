/* @flow */
import React from 'react'
import Icon from './../../../../../common/icon'
import Search from './../../../../../common/search/search'

class Actionbar extends React.Component {

    render() {
        return (
            <div className='actionbar'>
                <h1>No New Updates</h1>
                <Icon icon='Check' iconClass='interactive'/>
                <Icon icon='Refresh' iconClass='interactive'/>
                <Icon icon='Trash' iconClass='interactive'/>
                <p>Sort By</p>
                <p>More</p>
                <div className='searchbar right column-6-2 row-1 right'>
                    <Search
                        selectItem={this.props.selectItem} 
                        query={this.props.query} 
                        iconClass='column-1 row-1'
                        />
                </div>
            </div>
        )
    }
}

export default Actionbar;
