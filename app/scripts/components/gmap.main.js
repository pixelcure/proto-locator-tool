// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'
// Google Map
import { Map } from "google-maps-react";


class GoogleMap extends Component {
	
	constructor(props){
		super(props);

		// Map specific state
		this.state = {
			lat : props.lat,
			lng : props.long
		};

	};

	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Google Map`) : '';

		// Render Map
		return (
			<div className={`map`}>
				<Map 
					mapCenter
					google={this.props.google}
					positionCenter={true}
					centerAroundCurrentLocation={true}
					position={{lat: this.props.lat, lng: this.props.long}} 
					zoom={14}
				/>
			</div>
		)
	};
};

GoogleMap.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object
};

export { GoogleMap }