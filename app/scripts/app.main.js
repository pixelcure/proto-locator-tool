// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'
// Underscore
import _ from 'underscore';
/* React Components */
// Zip Code
import { Zipcode } from './components/zipcode.main';
// Entries
import { Entries } from './components/entries.main';
// Google Map
import { GoogleMap } from './components/gmap.main'
// Locations
import locations from './data/locations';

// App Class Component, This invokes the entire Application and all of the shared components
class App extends Component {

	// App Constructor
	constructor(props){

		// Load Component constructor, pass in props
		super(props);

		// Initial Center Fallback, The center of the USA
		this.initialMapPositionFallback = {
			lat: 39.639538,
			lng : -9.492188
		};

		// Initial State
		this.state = {
			zipCode : undefined,
			locations : locations,
			loading : false,
			geoLocator : false,
			radiusLocations : null,
			matches : [],
			activeEntryIndex : null,
			entryDetailOpen : false,
			entryDetailOpenKey : null,
			options : {
				unit : props.unit ? props.unit : 'mile',
				radius : props.radius ? props.radius : 25,
				markerIcon: props.markerIcon ? props.markerIcon : null,
				debug : props.debug ? props.debug : false,
				mapStyle : props.mapStyle ? props.mapStyle : null,
				mapZoom : props.mapZoom ? props.mapZoom : 10,
				initialCenter : props.initialMapPosition ? props.initialMapPosition : this.initialMapPositionFallback
			},
			geoCoords : {
				lat : null,
				lng : null
			}
		};

		// Update Zip
		this.updateZip = this.updateZip.bind(this);
		// Focus On Entry
		this.focusOnEntry = this.focusOnEntry.bind(this);
		// Open Entry Detail
		this.openEntryDetail = this.openEntryDetail.bind(this);
		// Close Entry Detail
		this.closeEntryDetail = this.closeEntryDetail.bind(this);

	};

	// Component Will Mounta Lifecycle Func
	componentWillMount () {

		// Cache this
		const that = this;

		// If goelocation exists, lets use it
		if(navigator.geolocation && this.state.zipCode == undefined){

			// Loading zipcode, geoLocator exists
			that.setState({
				loading : true,
				geoLocator : true
			})

			// Get position
			navigator.geolocation.getCurrentPosition(function(position){
				// If we have a position, otherwise their browser doesn't support this feature and they can enter it through the database
				if(position != 'null'){


					// Latitude of geoLocator position
					let lat = position.coords.latitude;

					// Longitute of geoLocator position
					let lng = position.coords.longitude;

					that.setState({
						geoCoords : {
							lat : lat,
							lng : lng
						}
					});

					// Get zipcode of current location
					const getZip = fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyB--PyZackddr9VdwbFA8U8nB45772zHMg&result_type=postal_code');

					getZip
						.then(res => res.json())
						.then(res => {
							
							// Zipcode
							let zip =  res.results[0].address_components[0].short_name;

							// Add zip to input field (forces change)
							// that.zipCodeComponent.input.value = zip;
							// Set zio code state
							that.updateZip(zip);

						});

				};
			}, function(positionError){


				// Debug
				that.state.options.debug ? console.info(`DEBUG: App mounting, Geolocation - Failure to get position. \nPosition Error: ${positionError} `) : '';

				// Set state, we don't have geolocation/geo failed
				that.setState({
					loading : false,
					geoLocator : false
				});

			});

		} else {
			
			// Geocoding doesn't exist (they will need to enter their zip code)
			that.setState({
				loading : false,
				geoLocator : false
			});

			return;

		}; // End get position

	};

	// updateZip(e, zip){
	updateZip(zip){

		// Loading as it runs through
		this.setState({
			loading : true,
			activeEntryIndex : null
		});

		// Zip Code
		let zipCode = zip;

		// Debug
		this.state.options.debug ? console.info(`DEBUG: Update zip, confirming postal zipcode is 5 digits`) : '';
		// Only do Zip code radius call if we have a full 5 digit zipcode
		if(/^\d{5}$/.test(zipCode)){

			// Debug
			this.state.options.debug ? console.info(`DEBUG: Updating state, Object key zipCode: ${zipCode}`) : '';
			// Update state
			this.setState({
				zipCode : zipCode,
				loading : false
			});

			// Debug
			this.state.options.debug ? console.info(`DEBUG: Invoking function to find radial zip codes for, Object key zipCode: ${zipCode}`) : '';
			// Find radial zips
			this.findRadialZips();

		};

	};

	// Find Radial Zips
	findRadialZips() {

		// Cache This
		let that = this;

		// Debug
		this.state.options.debug ? console.info(`DEBUG: Calling zip codes API to find radial zip codes in relation to ${this.state.zipCode}`) : '';

		// Radial Zips (Cleaning up our response, sticking every zip code in this array)
		let radialZips = [];

		// Find radius postal codes
		let radiusPostalCodes = fetch(`https://www.zipcodeapi.com/rest/js-XgxKp01IY05hBefThffqUtk7ANNzFQAC67nv7oe5pjn0yCUPRafMDzTdmHN2xoED/radius.json/${this.state.zipCode}/${this.state.options.radius}/${this.state.options.unit}`);
			// radiusPostalCodes = fetch(`https://www.zipcodeapi.com/rest/js-Sxe3Vv6539wXykOHGsYDJLTVorgWvvbn3qqYVx4ZGBWfVKWCdVfWH9R5B827EduH/radius.json/${this.state.zipCode}/${this.state.options.radius}/${this.state.options.unit}`);

		// Carry out Promise
		radiusPostalCodes
			.then(zips => zips.json())
			.then(zips => {
			
				that.state.options.debug ? console.info(`DEBUG: Successfully found radial zipcodes for ${that.state.zipCode}`) : '';

				// Store zip radius zip codes
				let res = zips.zip_codes;

				for(let x = 0; x < res.length; ++x){

					// Push zip code into our array
					radialZips.push(res[x].zip_code);

					// if last iteration
					if(x === res.length - 1){

						// Set State of Radius Locations
						that.setState({
							radiusLocations : radialZips
						});

						// Find Location Entries
						that.findLocations();
					};

				}; // End for
			})
			.catch(error => {

				// Error Message
				let errorMessage = error.statusText;
				
				// Error Status
				let errorStatus = error.status

				// Debug
				that.state.options.debug ? console.warn(`DEBUG: Error found. \n Message: ${errorMessage}`) : '';
				// Set state
				that.setState({
					serverErrorStatus : errorStatus,
					serverError : true,
					serverErrorMessage : errorMessage,
					matches : []
				});

			});

	};

	// Find Locations radial relative locations based on postal code
	findLocations () {

		// Debug
		this.state.options.debug ? console.info(`DEBUG: Searching for matching locations in relation to ${this.state.zipCode}`) : '';
		// New entries
		let newEntries = [];

		// Loop through our locations, see if any match our radius location zip codes
		for(let x = 0; x < this.state.locations.length; ++x){

			// If a location item has a radius zip code, add it to our "newEntries" local array
			if(_.contains(this.state.radiusLocations, this.state.locations[x].zip)){
				// Push entry
				newEntries.push(this.state.locations[x]);
			};

			// If last iteration
			if(x === this.state.locations.length - 1) {

				// Debug
				this.state.options.debug ? console.info('DEBUG: Last match test, setting state Object key: matches') : '';
				// Set state, add "matches"
				this.setState({
					matches : newEntries,
					loading : false
				});
			};

		};

	};

	// Focus On Entry

	focusOnEntry(key){

		// Clicked Marker Index ( Will match entry Index list )
		let entryIndex = key;

		// Set current Active Entry Index
		this.setState({
			activeEntryIndex : entryIndex
		});

	};

	// Open Entry Detail
	openEntryDetail(key){
		
		// Debug
		this.props.debug ? console.info(`DEBUG: Opening Entry Detail, Index ${key}. Updating State, entryDetailOpen is true`) : '';

		this.setState({
			entryDetailOpen : true,
			entryDetailOpenKey : key
		});

	};

	// Close Entry Detail
	closeEntryDetail(){
		
		// Debug
		this.props.debug ? console.info(`DEBUG: Opening Entry Detail, Index ${key}. Updating State, entryDetailOpen is true`) : '';

		this.setState({
			entryDetailOpen : false,
			entryDetailOpenKey : null
		});

	};	

	// Render App
	render () {

		// Render Components
		return (
			<div>
				<Zipcode
					ref={(el) => this.zipCodeComponent = el }
					loading={this.state.loading}
					updateZip={this.updateZip}
					zipCode={this.state.zipCode}
					debug={this.state.options.debug}
				/>
				<GoogleMap
					google={window.google}
					lat={this.state.geoCoords.lat}
					long={this.state.geoCoords.long}
					locations={this.state.locations}
					markerIcon={this.state.options.markerIcon}
					matches={this.state.matches}
					mapStyle={this.state.options.mapStyle}
					mapZoom={this.state.options.mapZoom}
					focusOnEntry={this.focusOnEntry}
					debug={this.state.options.debug}
					geoLocator={this.state.geoLocator}
					initialCenter={this.state.options.initialCenter}
				/>
				<Entries
					serverErrorStatus={this.state.serverErrorStatus}
					serverError={this.state.serverError}
					serverErrorMessage={this.state.serverErrorMessage}
					matches={this.state.matches}
					openEntryDetail={this.openEntryDetail}
					closeEntryDetail={this.closeEntryDetail}
					entryDetailOpen={this.state.entryDetailOpen}
					entryDetailOpenKey={this.state.entryDetailOpenKey}
					geoLocator={this.state.geoLocator}
					activeEntryIndex={this.state.activeEntryIndex}
					loading={this.state.loading}
					debug={this.state.options.debug}
				/>
			</div>
		);
	};

}; // End App

// App Proptypes
App.PropTypes = {
	debug : React.PropTypes.bool,
	radius : React.PropTypes.number,
	unit : React.PropTypes.string,
	markerIcon : React.PropTypes.string,
	mapStyle : React.PropTypes.array,
	initialMapPosition : React.PropTypes.object,
	mapZoom : React.PropTypes.number
};

// Export App
export { App }