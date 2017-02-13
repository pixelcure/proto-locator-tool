// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'

// EntryDetail Class Component
class EntryDetail extends Component {

	// Constructor
	constructor(props){
		super(props);
	};

	// Render Entry Detail
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Entry Detail`) : '';

		return (
			<div className={'entry-detail'}>
				<button className={`close-detail`} onClick={this.props.closeEntryDetail}>&times;</button>
				<strong className={'entry-name'}>{this.props.detail.store_title}</strong>
			</div>
		);
	};

};

// Entry Detail Proptypes
EntryDetail.PropTypes = {
	debug : React.PropTypes.bool,
	detail : React.PropTypes.object.isRequired,
	closeEntryDetail : React.PropTypes.func.isRequired,
	index : React.PropTypes.number.isRequired
};

// Export EntryDetail Component
export { EntryDetail }