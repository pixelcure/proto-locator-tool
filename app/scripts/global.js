// React
import React from 'react';
// Render
import { render } from 'react-dom';
// App
import Locator from './locator/locator'

// Document Ready
document.addEventListener('DOMContentLoaded', function() {

	// Render Locator App
	render(<Locator />, document.getElementById('app'));

});