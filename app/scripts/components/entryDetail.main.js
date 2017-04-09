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

	componentDidMount() {

		// Debug
		this.props.debug ? console.info(`DEBUG: Entry Detail mounted, Is print in progress: ${this.props.printInProgress}`) : '';		

		// If print in progress, call print() on browser
		this.props.printInProgress ? window.print() : '';

	};

	renderHcp(key){

		// Single HCP
		const hcp = key;

		// Render LI
		return (
			<li key={hcp.name_title} className={`hcp`}>
				<strong className={`doctor-name`}>{hcp.name_title}</strong>
				<span className={`specialty`}>{hcp.specialty}</span>
			</li>
		);

	};

	// Render Entry Detail
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Entry Detail`) : '';

		// Detail class (if printing, it'll append 'printing' class)
		let detailClass = this.props.printInProgress ? `entries entry-detail printing` : `entries entry-detail`;
		
		// Checks to see if we've sent an email yet, and successfully 
		// to determine which jsx to return
		let handleEmailInputField = () => {
			
			if(this.props.emailSent && !this.props.emailSentError){
			
				// Email of current detail info sent successfully to user
				return (
						<p className={`email-success`}>
							An email has been sent to <span className={`user-email`}>{this.props.userEmail}</span> with your search information.
							<strong className={`thank-you`}>Thank you!</strong>
						</p>
					);
			
			} else if (!this.props.emailSent && this.props.emailSentError){
			
				// Error sending
				return (<span className={`email-send-fail`}>There was an error sending your information.</span>);
			
			} else if (!this.props.emailSent && !this.props.emailSentError){
			
				// No email of this detail has been sent, therefore load the field.
				// Flag field as invalid if this.state.emailInputValidationError == true
				return (<input onChange={this.props.addUsersEmail} className={this.props.emailInputValidationError ? `error` : ''} type={'email'} placeholder={`Enter Email Address`} />);
			
			};

		};

		return (
			<div className={detailClass}>
				<div className="closeEntryDetail" title="Close" onClick={this.props.closeEntryDetail}>&times;</div>
				<div className={`address`} ref={(el) => this.address = el}>
					<strong className={'entry-name'}>{this.props.detail.store_title}</strong>
					<span className={'entry-street'}>{this.props.detail.address}</span>
					<span className={'entry-city-state-zip'}>{`${this.props.detail.city + ` ` + this.props.detail.state + ` ` + this.props.detail.zip}`}</span>
					<a href={`tel:${this.props.detail.phone}`} className={'entry-phone'}>{this.props.detail.phone}</a>
				</div>
				<div className={`location-hcps`} ref={(el) => this.locationHcps = el}>
					<h2>HCPs at this location</h2>
					<ul>
						{ this.props.detail.hcps.map(this.renderHcp) }
					</ul>
				</div>
				<div className={'more-info'}>
					<h2>Email or print this information</h2>
						{ /* handle email field based on state */ handleEmailInputField() }
					<ul>
						<li>
							<input onClick={this.props.emailEntryDetail} type={'submit'} id={'email'} value={'Email'}/>
						</li>
						<li>
							<input onClick={this.props.printEntryDetail} type={'submit'} id={'print'} value={'Print'}/>
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
	printEntryDetail : React.PropTypes.func,
	addUsersEmail : React.PropTypes.func.isRequired,
	userEmail : React.PropTypes.string.isRequired,
	emailEntryDetail : React.PropTypes.func.isRequired,
	emailSent : React.PropTypes.bool.isRequired,
	emailSentError : React.PropTypes.bool.isRequired,
	emailInputValidationError : React.PropTypes.bool.isRequired,
	printInProgress : React.PropTypes.bool,
	index : React.PropTypes.number.isRequired
};

// Export EntryDetail Component
export { EntryDetail }