// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'
// Google Map
import { Map, Marker } from "google-maps-react";


class GoogleMap extends Component {

	constructor(props){
		super(props);

		// Render Locations (Binding "this" so we are in context to our class)
		this.renderLocations = this.renderLocations.bind(this);
		// Render Matches (Binding "this" so we are in context to our class)
		this.renderMatches = this.renderMatches.bind(this);

	};

	renderLocations(key) {

		// Current iteration of single location
		const location = this.props.locations[key];

		// Debug
		this.props.debug ? console.info(`DEBUG: Google Map - Rendering Locations \n (No Matches Found, or they haven't searched yet)`) : '';

		// Render Markers
		return (
		  	<Marker
			  	key={key}
			    name={location.store_title}
			    position={{lat: location.latitude, lng: location.longitude}}
			    icon={{
			      url: this.props.markerIcon
			    }}
		    />
		);

	};

	renderMatches(key) {

		// Current iteration of single match
		const match = this.props.matches[key];

		// Debug
		this.props.debug ? console.info(`DEBUG: Google Map - Rendering Matches`) : '';

		// Render Markers
		return (
			<Marker
				key={key}
				name={match.store_title}
				position={{lat: match.latitude, lng: match.longitude}}
			    icon={{
			      url: this.props.markerIcon
			    }}
		    />
		);

	};

	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Google Map`) : '';

		// Render Map
		return (
			<div className={`map`}>
				<Map
					mapCenter={{lat: 37.09024, lng: -95.712891}}
					google={this.props.google}
					positionCenter={true}
					mapCenter={true}
					centerAroundCurrentLocation={true}
					zoom={14}>

					{
						// Do we have matches? Call renderMatches();
						// Otherwise, call renderLocations();
						!this.props.matches ? Object.keys(this.props.locations).map(this.renderLocations) : Object.keys(this.props.matches).map(this.renderMatches)
					}

				</Map>
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