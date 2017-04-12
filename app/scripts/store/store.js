// CreateStore(), compose()
import { createStore, compse } from 'redux';


// Root Reducer
import rootReducer from '../reducers/index';

// Data
import locations from '../data/locations.json';

// EVERY piece of your state, needs a reducer associated with it
const defaultState = {
		zipCode : null,
		locations : locations,
		loading : false,
		geoLocatorSupport : false,
		radiusLocations : null,
		matches : [],
		activeEntryIndex : null,
		entryDetailOpen : false,
		entryDetailOpenKey : null,
		printInProgress : false,
		userEmail : null,
		emailSent : false,
		emailSentError : false,
		emailInputValidationError : false,
		mailsendUrl : `http://mailserv.local:8888/`,
		unit : `mile`,
		radius : 25,
		markerIcon: `images/marker.png`,
		debug : false,
		mapStyle : [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]}],
		mapZoom : 10,
		initLat: 39.639538,
		initLng : -79.492188,
		geoLat : null,
		geoLng : null
};

const store = createStore(rootReducer, defaultState);


export default store;
