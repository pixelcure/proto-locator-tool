// Actions are just objects that have two things, the TYPE, and some
// type of payload. to send to your reducer


// Update Zip
export function updateZip (value) {
	return {
		type : 'UPDATE_ZIP',
		value
	}
};

// Loading
export function loading (bool) {
	return {
		type : 'LOADING_STATUS',
		value : bool
	}
}

// Geo Locator
export function geoLocator (bool) {
	return {
		type : 'GEOLOCATOR_FEATURE',
		value : bool
	}
}


