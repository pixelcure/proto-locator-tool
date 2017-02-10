// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'
// Google Map
import { Map, Marker } from "google-maps-react";


class GoogleMap extends Component {

	// Constructor
	constructor(props){
		super(props);

		// Render Locations (Binding "this" so we are in context to our class)
		this.renderLocations = this.renderLocations.bind(this);
		// Render Matches (Binding "this" so we are in context to our class)
		this.renderMatches = this.renderMatches.bind(this);

	};

	// Render Locations
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

	// Render Matches
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
			    icon={this.props.markerIcon}
		    />
		);

	};

	// Render Default Map
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
					styles={this.props.mapStyle}
					initialCenter={this.props.initialCenter}
					centerAroundCurrentLocation={this.props.geoLocator ? true : false}
					zoom={this.props.mapZoom}
					zoomControl={true}
					clickableIcons={true}>


					{
						// Do we have matches? Call renderMatches();
						// Otherwise, call renderLocations();
						!this.props.matches ? Object.keys(this.props.locations).map(this.renderLocations) : Object.keys(this.props.matches).map(this.renderMatches)
					}

				</Map>
			</div>
		);
	};
};

// GoogleMap Proptypes
GoogleMap.propTypes = {
	debug : React.PropTypes.bool,
	google: React.PropTypes.object.isRequired,
	zoom: React.PropTypes.number.isRequired,
	matches : React.PropTypes.array,
	locations : React.PropTypes.array,
	initialCenter: React.PropTypes.object.isRequired,
	zoom : React.PropTypes.number
};

// Export GoogleMap
export { GoogleMap }