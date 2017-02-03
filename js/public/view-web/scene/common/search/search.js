/* @flow */
import React from 'react'
import Icon from './../icon'

const search = {
    icon: 'Search',
    iconClass: 'interactive'
}

class Search extends React.Component {
  render() {
    return (
      <div className={ 'search ' + this.props.iconClass }>
        <Icon {...search}/>
      	<input 
            placeholder='Search...' 
            value={this.props.query} 
            onChange={(e) => { this.props.selectItem(e.currentTarget.value, 'query')}}
          />
      </div>
    );
  }
}

export default Search;