/* @flow */
import React from 'react'
import Icon from './../icon'
import Subtitle from './components/subtitle'
import Search from './../search/search'

class Ribbon extends React.Component {
    render() {
        const iconArray = this.props.iconArray || [];
        return (
    	    <section className={`ribbon column-1 ${this.props.titleClass ? this.props.titleClass : ''}`}>
                {
                    this.props.subTitle ? <div className={ ( this.props.subTitle ? 'subtitle ' : '') + 'header'}>
    	      	        { this.props.title ? <h1>{this.props.title}</h1> : null }
                        { 
                            this.props.subTitle ? ( 
                                <Subtitle {...this.props.subTitle}/>
                            ) : null 
                        }
                    </div> : null
                }
	      	    {
                    _.map(iconArray, (icon, index) => {
                        return this.renderComponent(icon, index)
                    })
	      	    }
    	    </section>
        );
    }
    renderComponent (item, index) {
        switch (item.type) {
            case 'icon':
                return <Icon key={index} {...item}/>
            case 'search':
                return (
                    <div key={index} className={`searchbar ${item.searchClass}`}>
                        <Search
                            {...item}
                            selectItem={this.props.selectItem} 
                            query={this.props.query} 
                            iconClass='column-1 row-1'
                            />
                    </div>
                )
        }
    }
}

export default Ribbon;