// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'

// EntryDetail Class Component
class EntryDetail extends Component {

	// Constructor
	constructor(props){
		super(props);

		// Rencer HCP
		this.renderHcp = this.renderHcp.bind(this);

	};

	renderHcp(key){

		// Single HCP
		const hcp = key;

		// Render LI
		return (
			<li key={key.id}>
				<strong className={`doctor-name`}>{hcp.name_title}</strong>
				<span className={`specialty`}>{hcp.specialty}</span>
			</li>
		);

	};

	// Render Entry Detail
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Entry Detail`) : '';

		return (
			<div className={'entries entry-detail'}>
				<div className="closeEntryDetail" title="Close" onClick={this.props.closeEntryDetail}>&times;</div>
				<div className={`address`}>
					<strong className={'entry-name'}>{this.props.detail.store_title}</strong>
					<span className={'entry-street'}>{this.props.detail.address}</span>
					<span className={'entry-city-state-zip'}>{`${this.props.detail.city + ` ` + this.props.detail.state + ` ` + this.props.detail.zip}`}</span>
					<a href={`tel:${this.props.detail.phone}`} className={'entry-phone'}>{this.props.detail.phone}</a>
				</div>

				<h2>HCPs at this location</h2>

				<ul>
					{ this.props.detail.hcps.map(this.renderHcp) }
				</ul>

				<div className={'more-info'}>
					<h2>Email or print this information</h2>
					<input type={'email'} placeholder={'Enter Email Address'} />
					<ul>
						<li>
							<input type={'submit'} id={'email'} value={'Email'}/>
						</li>
						<li>
							<input type={'submit'} id={'print'} value={'Print'}/>
						</li>
					</ul>
				</div>
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