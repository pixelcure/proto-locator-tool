// React (PropTypes and Component)
import React, { PropTypes, Component } from 'react'
// Jquery
import $ from 'jquery';
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

class App extends Component {

	constructor(props){

		// Load Component constructor, pass in props
		super(props);

		// Initial State
		this.state = {
			zipCode : undefined,
			locations : locations,
			loading : false,
			geoLocator : false,
			radiusLocations : null,
			matches : [],
			options : {
				unit : props.unit,
				radius : props.radius,
				markerIcon: props.markerIcon,
				debug : props.debug
			},
			coords : {
				lat : undefined,
				long : undefined
			}
		};

		// Update Zip
		this.updateZip = this.updateZip.bind(this);

	}

	componentWillMount () {

		// Cache this
		const that = this;

		// If goelocation exists, lets use it
		if(navigator.geolocation && this.state.zipCode == undefined){

			// Loading zipcode, geolocator exists
			that.setState({
				loading : true,
				geoLocator : true
			})

			// Get position
			navigator.geolocation.getCurrentPosition(function(position){
				// If we have a position, otherwise their browser doesn't support this feature and they can enter it through the database
				if(position != 'null'){


					// Latitude of geolocator position
					let lat = position.coords.latitude;

					// Longitute of geolocator position
					let long = position.coords.longitude;

					that.setState({
						coords : {
							lat : lat,
							long : long
						}
					});

					// Get zipcode of current location
					$.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyB--PyZackddr9VdwbFA8U8nB45772zHMg&result_type=postal_code', function(res){

						// Zipcode
						let zip =  res.results[0].address_components[0].short_name;

						// Add zip to input field (forces change)
						// that.zipCodeComponent.input.value = zip;
						// Set zio code state
						that.updateZip(zip);

					});
				};
			}, function(positionError){

				that.setState({
					loading : false,
					geolocator : false
				});

			});

		} else {
			// Geocoding doesn't exist (they will need to enter their zip code)

			this.setState({
				loading : false,
				geolocator : false
			});

			return;

		}; // End get position

	};

	// updateZip(e, zip){
	updateZip(zip){

		// Zip Code
		let zipCode = zip;

		// Debug
		this.state.options.debug ? console.info(`DEBUG: Update zip, confirming postal zipcode is 5 digits`) : ''

		// Only do Zip code radius call if we have a full 5 digit zipcode
		if(/^\d{5}$/.test(zipCode)){

			// Debug
			this.state.options.debug ? console.info(`DEBUG: Updating state, Object key zipCode: ${zipCode}`) : ''

			// Update state
			this.setState({
				zipCode : zipCode,
				loading : false
			});

			// Find radial zips
			this.findRadialZips();

		};

	};

	findRadialZips() {

		// Cache This
		let that = this;

		// Debug
		this.state.options.debug ? console.info(`DEBUG: Calling zip codes API to find radial zip codes in relation to ${this.state.zipCode}`) : ''

		// Radial Zips (Cleaning up our response, sticking every zip code in this array)
		let radialZips = [];

		// Find radius postal codes
		$.ajax({
			url: `https://www.zipcodeapi.com/rest/js-XgxKp01IY05hBefThffqUtk7ANNzFQAC67nv7oe5pjn0yCUPRafMDzTdmHN2xoED/radius.json/${this.state.zipCode}/${this.state.options.radius}/${this.state.options.unit}`,
			// url: `https://www.zipcodeapi.com/rest/js-Sxe3Vv6539wXykOHGsYDJLTVorgWvvbn3qqYVx4ZGBWfVKWCdVfWH9R5B827EduH/radius.json/${this.state.zipCode}/${this.state.options.radius}/${this.state.options.unit}`,
			method : 'GET',
			dataType : 'json',
			// On Success
			success : function(response) {

				that.state.options.debug ? console.info(`DEBUG: Successfully found radial zipcodes for ${that.state.zipCode}`) : ''

				// Store zip radius zip codes
				let res = response.zip_codes;

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

			},
			// On Error
			error : function(error){

				// Error Message
				let errorMessage = error.statusText;

				// Debug
				that.state.options.debug ? console.warn(`DEBUG: Error found. \n Message: ${errorMessage}`) : ''

				// Set state
				that.setState({
					serverError : true,
					serverErrorMessage : errorMessage
				});

			}
		});

	};

	findLocations () {

		// Debug
		this.state.options.debug ? console.info(`DEBUG: Searching for matching locations in relation to ${this.state.zipCode}`) : ''

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
				this.state.options.debug ? console.info('DEBUG: Last match test, setting state Object key: matches') : ''

				// Set state, add "matches"
				this.setState({
					matches : newEntries
				});
			};

		};

	};

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
					lat={this.state.coords.lat}
					long={this.state.coords.long}
					locations={this.state.locations}
					markerIcon={this.state.options.markerIcon}
					matches={this.state.matches}
					debug={this.state.options.debug}
				/>
				<Entries
					serverError={this.state.serverError}
					serverErrorMessage={this.state.serverErrorMessage}
					matches={this.state.matches}
					loading={this.state.loading}
					debug={this.state.options.debug}
				/>
			</div>
		);
	};

}; // End App

export { App }