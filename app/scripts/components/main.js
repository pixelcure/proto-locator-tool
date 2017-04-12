import React, { Component } from 'react';


// Zip Code
import { Zipcode } from './zipcode';
// Entries
import { Entries } from './entries';
// Entry Detail
import { EntryDetail } from './entryDetail';
// Google Map
import { GoogleMap } from './gmap'

// Main Parent Component
class Main extends Component {

	// Constructor
	constructor(props){
		super(props);

		// Initial Center Fallback, The center of the USA
		this.initialMapPositionFallback = {
			lat: 39.639538,
			lng : -9.492188
		};

	};

	// Component Will Mounta Lifecycle Func
	componentWillMount () {

		// Cache this
		const that = this;

		// If goelocation exists, lets use it
		if(navigator.geolocation && this.props.zipCode == undefined){

			// Loading zipcode, geoLocator exists

			// Update loading, calling loadingStatus reducer
			that.props.loading(true);
			// Update geoLocator feature boolean
			that.props.geoLocator(true);


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

					// Get zipcode, follow through promise
					getZip
						.then(res => res.json())
						.then(res => {

							// Zipcode
							let zip =  res.results[0].address_components[0].short_name;

							// Add zip to input field (forces change)
							// that.zipCodeComponent.input.value = zip;
							// Set zio code state
							that.props.updateZip(zip);

						});

				};
			}, function(positionError){


				// Debug
				that.props.debug ? console.info(`DEBUG: App mounting, Geolocation - Failure to get position. \nPosition Error: ${positionError} `) : '';

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

	// Component Did Mount
	componentDidMount() {

		// Debug
		this.props.debug ? console.info(`DEBUG: App mounted`) : '';

	};


	// Render Entry
	render () {

		// Debug
		this.props.debug ? console.info(`DEBUG: Rendering Entry`) : '';

		// Return list element of entry
		return (
			<div>
				<GoogleMap
					google={window.google}
					lat={this.props.geoLat}
					long={this.props.geoLng}
					locations={this.props.locations}
					markerIcon={this.props.markerIcon}
					matches={this.props.matches}
					mapStyle={this.props.mapStyle}
					mapZoom={this.props.mapZoom}
					focusOnEntry={this.props.focusOnEntry}
					debug={this.props.debug}
					geoLocator={this.props.geoLocator}
					// initialCenter={this.props.initialCenter}
				/>
				<div className={`search`}>
					<Zipcode
						ref={(el) => this.zipCodeComponent = el }
						loading={this.props.loading}
						updateZip={this.updateZip}
						zipCode={this.props.zipCode}
						debug={this.props.debug}
					/>
					<Entries
						serverErrorStatus={this.props.serverErrorStatus}
						serverError={this.props.serverError}
						serverErrorMessage={this.props.serverErrorMessage}
						matches={this.props.matches}
						openEntryDetail={this.props.openEntryDetail}
						closeEntryDetail={this.props.closeEntryDetail}
						entryDetailOpen={this.props.entryDetailOpen}
						entryDetailOpenKey={this.props.entryDetailOpenKey}
						geoLocator={this.props.geoLocator}
						activeEntryIndex={this.props.activeEntryIndex}
						loading={this.props.loading}
						addUsersEmail={this.props.addUsersEmail}
						userEmail={this.props.userEmail}
						printEntryDetail={this.props.printEntryDetail}
						emailEntryDetail={this.props.emailEntryDetail}
						emailSent={this.props.emailSent}
						emailSentError={this.props.emailSentError}
						emailInputValidationError={this.props.emailInputValidationError}
						debug={this.props.debug}
					/>
				</div>
			</div>
		);

	};

};

// Export Entry
export { Main }