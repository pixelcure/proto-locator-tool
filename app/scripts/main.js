// React
import React from 'react';
// Render
import { render } from 'react-dom';
// App
import { App } from './app.main.js'

// Document Ready
document.addEventListener('DOMContentLoaded', function() {

	// Map Style
	const mapStyle = [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]}];

	// Initial Center for Google Map (Somewhat center of US)
	const initialCenter = {
		lat: 39.639538,
		lng : -79.492188
	};

    /**
     * The <App/> Component/Class creates a Locator App using GoogleMaps, Zipcodes API.
     * @param {number} radius - Pass an integer/number as your radius for locating relative locations based on the users postal code.
     * @param {string} unit - The unit of measurement for finding relative locations based on postal code. if using standard, pass 'mile', if using metric, pass 'km'.
     * @param {string} markerIcon - Pass a string with the image path to your custom google map marker icon. PNG/SVG preferred.
     * @param {array} mapStyle - Add custom map styles to your google map by passing an array. I suggest searching on https://snazzymaps.com to customize or find opensource styles.
     * @param {number} mapZoom - To control the zooming of your map, pass an integer. FYI: 1 will be zoomed out, 15 will be zoomed in, and so on.
     * @param {boolean} debug - If you'd like console logging during the operation/run through of the app, pass true to debug prop.
     */
	render( <App
				debug={false}
				radius={25}
				unit={`mile`}
				markerIcon={`images/marker.png`}
				mapStyle={mapStyle}
				initialMapPosition={initialCenter}
				mapZoom={5}
			/>,
			document.getElementById('app')
		);

});