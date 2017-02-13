// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'

// Entry Class Component
class Entry extends Component {

	// Constructor
	constructor(props){
		super(props);
	};

	// Render Entry
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Entry`) : '';

		// Return list element of entry
		return (
			<li key={this.key} className={this.props.activeEntry ? `active` : ''} ref={this.props.activeEntry ? (activeEntry) => { this.activeEntry = activeEntry; } : ''}>
				<h3>{this.props.title}</h3>
				<span>{this.props.city}</span>
				<a href="#" className={`button`} onClick={() => this.props.viewEntry(this.key) } title={this.props.name}> Details</a>
			</li>
		);

	};

};

// Entry Proptypes
Entry.PropTypes = {
	debug : React.PropTypes.bool,
	title : React.PropTypes.string.isRequired,
	city : React.PropTypes.string,
	viewEntry : React.PropTypes.func.isRequired,
	activeEntry : React.PropTypes.bool.isRequired
};

// Export Entry
export { Entry }