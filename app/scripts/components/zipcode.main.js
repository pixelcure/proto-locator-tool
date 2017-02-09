// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'

// Zipcode Class Component
class Zipcode extends Component {

	// Constructor
	constructor(props){
		super(props);
	};

	// Render Zipcode Component
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Zipcode Input field. \n\n Current Zipcode: ${this.props.zipCode}`) : '';

		return (
			<form>
				<input
					ref={input => this.input = input}
					maxLength={5}
					type={`text`}
					// value={ this.props.loading ? 'Locating...' : `` }
					placeholder={ this.props.loading ? 'Locating...' : ( this.props.zipCode ) || `Please enter a zip code` }
					onChange={ e => this.props.updateZip( e.currentTarget.value ) }
				/>
			</form>
		);
	};
};

// Zipcode Proptypes
Zipcode.PropTypes = {
	debug : React.PropTypes.bool,
	updateZip : React.PropTypes.func.isRequired,
	zipCode : React.PropTypes.string,
};

// Export Zipcode Class
export { Zipcode }