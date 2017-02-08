// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'

class Zipcode extends Component {

	constructor(props){
		super(props);
	}

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
		)
	}
}


export { Zipcode }