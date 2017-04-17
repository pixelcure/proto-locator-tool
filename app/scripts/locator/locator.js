// React
import React, { Component } from 'react'
import { Provider } from 'react-redux';

// Redux Store
import store from './store/store';

// Main Component
import App from './components/app';



class Locator extends Component {

	// Render App
	render () {

		// Render Base Components
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);

	};

}; // End Locator


// Export App
export default Locator