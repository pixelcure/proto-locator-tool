// React (PropTypes and Component)
import React, { Component } from 'react'

// Zipcode Class Component
class Zipcode extends Component {

	// Constructor
	constructor(props){
		super(props);

		// update input bind
		this.updateInput = this.updateInput.bind(this);

		// component state to track input value
		this.state = {
			inputText : ''
		};

	};

	updateInput (zip) {

		// update state
		this.setState({ inputText : zip })

		// if(zip.length === 5){ this.props.updateZip( zip ) }
		this.props.updateZip( zip )

	};

	// Render Zipcode Component
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Zipcode Input field. \n\n Current Zipcode: ${this.props.zipCode}`) : '';

		return (
			<form className={`form`}>
				<input
					ref={input => this.input = input}
					maxLength={5}
					type={`text`}
					placeholder={ this.props.loading ? 'Locating...' : ( this.props.zipCode ) || `Zip code` }
					onChange={ e => this.updateInput( e.currentTarget.value ) }
					value={ this.state.inputText || '' }
				/>
			</form>
		);
	};
};


// Export Zipcode Class
export { Zipcode }