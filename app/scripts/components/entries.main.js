// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'
// Jquery
import $ from 'jquery';

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

	onComponentDidMount() {



	};

	// Map through entry items
	entryItem (key) {

		// Single Entry
		const entry = this.props.matches[key];

		// Debug
		this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Entries Found, Mapping through entries`) : '';

		// Pass data into our "Entry" template
		return (
			<Entry key={key} index={key} openEntryDetail={this.props.openEntryDetail} activeEntry={this.props.activeEntryIndex == key ? true : false} city={entry.city} title={entry.store_title} />
		);

	};

	// Render Entries, Certain JSX will render depending on the condition
	render () {

		// Choose which template to render based based on condition
		if (this.props.serverError && this.props.serverErrorStatus != `404`){

			// Debug
			this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Server Error :(`) : '';

			// Server Error :(
			return (
				<div className={'entries server-error'}>
					<h2>Database Error: <br />{ this.props.serverErrorMessage }</h2>
				</div>
			);

		} else if(this.props.loading){

			// Debug
			this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Loading`) : '';

			// Loading
			return (
				<div className={'entries loading'}>
					<img src="images/loading.gif" />
				</div>
			);

		} else if (this.props.serverError && this.props.serverErrorStatus == 404 && this.props.matches.length == 0){

			// Debug
			this.props.debug ? console.info(`DEBUG: Entries Component Rendering - 404, false zip code :(`) : '';

			// No results found
			return (
				<div className={'entries server-error'}>
					<h2>No results found.</h2>
				</div>
			);

		} else if (this.props.matches.length == 0){

			// Debug
			this.props.debug ? console.info(`DEBUG: Entries Component Rendering - No Entries Found, Please search for a location`) : '';

			// Please search
			return (
				<div className={'entries none-found'}>
					<h2>Please search for a location</h2>
				</div>
			);

		} else if (this.props.entryDetailOpen) {

			// Debug
			this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Rendering Entry Detail Component`) : '';

			return (
				<EntryDetail 
					detail={this.props.entryDetailOpen != null ? this.props.matches[this.props.entryDetailOpenKey] : null} 
					closeEntryDetail={this.props.closeEntryDetail} 
				/>
			)
		};

		// Debug
		this.props.debug ? console.info(`DEBUG: Entries Component Rendering - Entries Found`) : '';

		// If none of the above, just return matches
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
	serverErrorStatus : React.PropTypes.string,
	geoLocator : React.PropTypes.bool,
	loading : React.PropTypes.bool,
	debug : React.PropTypes.bool,
	matches : React.PropTypes.object.isRequired,
	locations : React.PropTypes.object.isRequired,
	activeEntryIndex : React.PropTypes.string,
	openEntryDetail : React.PropTypes.func.isRequired,
	closeEntryDetail : React.PropTypes.func.isRequired,
	entryDetailOpen : React.PropTypes.bool.isRequired,
	entryDetailOpenKey : React.PropTypes.number.isRequired
};

// Entries Class Export
export { Entries }