import { combineReducers } from 'redux';

import zipCode from './zipCode'
import geoLocator from './geoLocator'
import loading from './loading'

const rootReducer = combineReducers({
	zipCode, geoLocator, loading
});


export default rootReducer;