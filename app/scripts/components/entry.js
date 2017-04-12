// React
import React, { Component } from 'react'

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
				<button className={`button`} onClick={() => this.props.openEntryDetail(this.props.index) } title={this.props.name}> Details</button>
			</li>
		);

	};

};

// Export Entry
export { Entry }