import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import { Main } from './main';



// Map Redux State to React Props 
// THIS RETURNED OBJECT NEEDS TO MATCH STATE (IDEALLY BY KEY/VAL BUT MOST CERTAINLY KEY IS CONSISTENT)
function mapStateToProps (state) {
	return {
		zipCode : state.zipCode,
		locations : state.locations,
		loading : state.loading,
		geoLocator : state.geoLocator,
		radisLocations : state.radiusLocations,
		matches : state.matches,
		activeEntryIndex : state.activeEntryIndex,
		entryDetailOpen : state.entryDetailOpen,
		entryDetailOpenKey : state.entryDetailOpenKey,
		printInProgress : state.printInProgress,
		userEmail : state.userEmail,
		emailSent : state.emailSent,
		emailSentError : state.emailSentError,
		emailInputValidationError : state.emailInputValidationError,
		mailsendUrl : state.mailsendUrl,
		unit : state.unit,
		radius : state.radius,
		markerIcon: state.markerIcon,
		debug : state.debug,
		mapStyle : state.mapStyle,
		mapZoom : state.mapZoom,
		initLat: state.initLat,
		initLng : state.initLng,
		geoLat : state.geoLat,
		geoLng : state.geoLng
	};
};

// Map Dispatch to props (listening for acations)
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

// Connect our Redux State to our Props (method from react-redux)
const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;

