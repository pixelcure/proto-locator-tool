// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'

// Entry
import { Entry } from './entry.main';
import { EntryDetail } from './entryDetail.main';

// Entries Class Component
class Entries extends Component {

	// Constructor
	constructor(props){
		super(props);

		// Entry Item (Bind this)
		this.entryItem = this.entryItem.bind(this);
	};

	// Map through entry items
	entryItem (key) {

		// Single Entry
		const entry = this.props.matches[key]

		// Debug
		this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Entries Found, Mapping through entries`) : '';

		// Pass data into our "Entry" template
		return (
			<Entry key={key} city={entry.city} title={entry.store_title} />
		);

	};

	// Render Entries, Certain JSX will render depending on the condition
	render () {

		// Server Error :(
		if (this.props.serverError){

			// Debug
			this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Server Error :(`) : '';

			return (
				<div className={'entries server-error'}>
					<h2>Database Error: <br />{ this.props.serverErrorMessage }</h2>
				</div>
			);
		};

		// Loading? Or, no entries found?
		if(this.props.loading){

			// Debug
			this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Loading`) : '';

			return (
				<div className={'entries loading'}>
					<img src="images/loading.gif" />
				</div>
			);
		} else if (this.props.matches.length == 0){

			// Debug
			this.props.debug ? console.info(`DEBUG: Entries Component Rendering - No Entries Found`) : '';

			return (
				<div className={'entries none-found'}>
					<h2>No locations found.</h2>
				</div>
			);
		};

		// Debug
		this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Entries Found`) : '';

		// Return locations
		return (
			<div className={'entries'}>
				<ul>
					{ Object.keys(this.props.matches).map(this.entryItem) }
				</ul>
			</div>
		);
	};
};

// Entries Proptypes
Entries.PropTypes = {
	serverError : React.PropTypes.string,
	serverErrorMessage : React.PropTypes.string,
	loading : React.PropTypes.bool,
	debug : React.PropTypes.bool,
	matches : React.PropTypes.object.isRequired,
	locations : React.PropTypes.object.isRequired,
};

// Entries Class Export
export { Entries }