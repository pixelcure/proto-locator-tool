// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'

class Entry extends Component {
	constructor(props){
		super(props);
	}
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Entry`) : '';

		return (
			<li key={this.key}>
				<h3>{this.props.title}</h3>
				<span>{this.props.city}</span>
				<a href="#" className={`button`} onClick={() => this.props.viewEntry(this.key) } title={this.props.name}> Details</a>
			</li>
		)
	}
}

export { Entry }