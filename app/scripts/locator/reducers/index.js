import { combineReducers } from 'redux';

import updateZipCode from './updateZipCode'
import { updateFoo } from './updateZipCode'
import geoLocator from './geoLocator'
import loading from './loading'



const rootReducer = combineReducers({
	updateZipCode, geoLocator, loading
});


export default rootReducer;