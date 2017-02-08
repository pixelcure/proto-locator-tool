// React
import React from 'react';
// Render
import { render } from 'react-dom';
// App
import { App } from './app.main.js'

// Document Ready
document.addEventListener('DOMContentLoaded', function() {

	// If using unit "kilometers", supply unit with "km"
	// If using unit "mile", supply unit with "mile" (Commented for clarity)
	// Choose radius in which you want to search
	// pass debug as true if you want logging
	render( <App 
				debug={true} 
				radius={25} 
				unit={'mile'} 
			/>, document.getElementById('app')
		);

});