// React
import React from 'react';
// Render
import { render } from 'react-dom';
// App
import { App } from './app.main.js'

// Document Ready
document.addEventListener('DOMContentLoaded', function() {

	// If using unit "mile", supply unit with "mile"
	// If using unit "kilometers", supply unit with "km"
	// Choose radius in which you want to search (No set option)
	// pass debug as true if you want logging (True/False)
	// pass markerIcon with image url if you want a custom marker
	render( <App
				debug={true}
				radius={25}
				unit={`mile`}
				markerIcon={`images/marker.png`}
			/>,
			document.getElementById('app')
		);

});