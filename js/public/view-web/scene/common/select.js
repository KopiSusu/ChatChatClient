/* @flow */
import React from 'react'

const search = {
    icon: 'Search',
    iconClass: 'interactive'
}

class Search extends React.Component {
    render() {
        return (
            <div className='select'>
                <select 
                    onChange={(e) => { 
                        const findUser = _.find(this.props.options, (option) => parseInt(e.target.value) === option.id)
                        this.props.selectItem(this.props.item, 'assignee', findUser) 
                    }} 
                    value={this.props.value}
                    className='column-1'>
                    {
                        _.map(this.props.options, (option, index) => {
                            return (
                                <option 
                                    key={index}
                                    value={option.id}>
                                        {option.username}
                                </option>
                            )
                        })
                    }
                    <option 
                        value='Unassigned'>
                            Unassigned
                    </option>
                </select>
            </div>
        );
    }
}

export default Search;