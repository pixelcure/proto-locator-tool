// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'
// Google Map
import { Map, Marker, InfoWindow } from "google-maps-react";



// Google Map Component
class GoogleMap extends Component {

	// Constructor
	constructor(props){

		// Call Compontent constructor
		super(props);

		// Map Reset
		this.mapReset = this.mapReset.bind(this);
		// Render Locations (Binding "this" so we are in context to our class)
		this.renderLocations = this.renderLocations.bind(this);
		// Render Matches (Binding "this" so we are in context to our class)
		this.renderMatches = this.renderMatches.bind(this);
		// Map Marker Click
		this.onMarkerClick = this.onMarkerClick.bind(this);
		// On map clicked, close an open info window
		this.onMapClick = this.onMapClick.bind(this);

		// Map specific state (only available in this class and not passed with props)
		this.state = {
	      showingInfoWindow: false,
	      activeMarker: {},
	      selectedPlace: {},
	      activeMarkerDetails: {}
		};

	};

	// On Map Click
	onMapClick(props){

		// Debug
		this.props.debug ? console.info(`DEBUG: Google Map - Map clicked on, checking to see if there is an active info window to close`) : '';

	  	// Are we currently showing an info window?
	    if (this.state.showingInfoWindow) {

			// Debug
			this.props.debug ? console.info(`DEBUG: Google Map - Map clicked on, currently hiding open info window and changing MAP state`): '';

			// Setting MAP state No longer showing info window, no longer have an active marker with details
			this.setState({
				showingInfoWindow: false,
				activeMarker: null,
				activeMarkerDetails : null,
				selectedPlace: {}
			});

			// Updated our global App state, no longer selecting a locations marker
			this.props.focusOnEntry(null);

	    };

	};

	// Reset Map (If info window open, or marker selected, etc)
	mapReset(){

		// Debug
		this.props.debug ? console.info(`DEBUG: Google Map - Resetting MAP Local State`) : '';

		// Reset MAP State
		this.setState({
			showingInfoWindow: false,
			activeMarker: null,
			activeMarkerDetails : null,
			selectedPlace: {}
		});

		// Pull null to focus on entry (no index), which will re render entry
		this.props.focusOnEntry(null);

	};

	// On Marker Click
	onMarkerClick(props, marker, e){

		// Debug
		this.props.debug ? console.info(`DEBUG: Google Map - Map Marker clicked on, currently updating MAP state with active marker`) : '';

		// Set updated Map specific state
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true,
			activeMarkerDetails : props.details
		});

		// Add highlighted class to our selected markers entry in our locations list
		this.props.focusOnEntry(props.index);

	};

	// Render Locations
	renderLocations(key) {

		// Current iteration of single location
		const location = this.props.locations[key];

		// Debug
		this.props.debug ? console.info(`DEBUG: Google Map - Rendering Locations \n (No Matches Found, or they haven't searched yet)`) : '';

		// Reset Map
		// this.mapReset();

		// Render Markers
		return (
		  	<Marker
			  	key={key}
		  		onClick={this.onMarkerClick}
			    name={location.store_title}
			    details={location}
			    index={key}
			    position={{lat: location.latitude, lng: location.longitude}}
			    icon={this.props.markerIcon}
		    />
		);

	};

	// Render Matches
	renderMatches(key) {

		// Current iteration of single match
		const match = this.props.matches[key];

		// Debug
		this.props.debug ? console.info(`DEBUG: Google Map - Rendering Matches`) : '';

		// Reset Map
		// this.mapReset();

		// Render Markers
		return (
			<Marker
				key={key}
				onClick={this.onMarkerClick}
				name={match.store_title}
				details={match}
				index={key}
				position={{lat: match.latitude, lng: match.longitude}}
			    icon={this.props.markerIcon}
		    />
		);

	};

	// Render Default Map
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Google Map`) : '';

		// Do we have locations? If so grab the first one
		const positionMap = (this.props.locations.length > 0 ? this.props.locations[0] : null);

		// Get latitude and longitude of first location to set general area
		const latLng = positionMap != null ? { lat : positionMap.latitude, lng : positionMap.longtitude } : null;

		// Render Map, Markers, Infowindows
		return (
			<div className={`map`}>
				<Map
					// mapCenter={{lat: 37.09024, lng: -95.712891}}
					google={this.props.google}
					positionCenter={true}
					mapCenter={true}
					onClick={this.onMapClick}
					styles={this.props.mapStyle}
					initialCenter={latLng != null ? latLng : this.props.initialCenter}
					centerAroundCurrentLocation={this.props.geoLocator ? true : false}
					zoom={latLng != null ? 14 : this.props.mapZoom}
					zoomControl={true}
					clickableIcons={true}>


					{
						// Do we have matches? Call renderMatches();
						// Otherwise, call renderLocations();
						!this.props.matches.length > 0 ? Object.keys(this.props.locations).map(this.renderLocations) : Object.keys(this.props.matches).map(this.renderMatches)

					}

			        <InfoWindow
			          className={`infoWindow`}
			          marker={this.state.activeMarker}
			          visible={this.state.showingInfoWindow ? true : false}>
						<div className={`marker-popup`}>
							<span className={`title`}>{ this.state.activeMarkerDetails ? this.state.activeMarkerDetails.store_title : '' }</span>
							<span>{ this.state.activeMarkerDetails ? this.state.activeMarkerDetails.address : '' }</span>
							<span>{ this.state.activeMarkerDetails ? this.state.activeMarkerDetails.zip : ''}</span>
						</div>
			        </InfoWindow>

				</Map>
			</div>
		);
	};
};

// GoogleMap Proptypes
GoogleMap.propTypes = {
	debug : React.PropTypes.bool,
	google: React.PropTypes.object.isRequired,
	geoLocator: React.PropTypes.bool.isRequired,
	matches : React.PropTypes.array,
	locations : React.PropTypes.array,
	lat : React.PropTypes.number,
	long : React.PropTypes.number,
	initialCenter: React.PropTypes.object.isRequired,
	focusOnEntry: React.PropTypes.func.isRequired,
	mapZoom : React.PropTypes.number,
	markerIcon : React.PropTypes.string,
	mapStyle : React.PropTypes.array
};

// Export GoogleMap
export { GoogleMap }