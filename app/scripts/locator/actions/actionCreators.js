// Actions are just objects that have two things, the TYPE, and some
// type of payload. to send to your reducer


// Update Zip
export function updateZipCode (value) {
	return {
		type : 'UPDATE_ZIP_CODE',
		value
	};
};

// Loading
export function loading (bool) {
	return {
		type : 'LOADING_STATUS',
		value : bool
	};
};

// Geo Locator
export function geoLocator (bool) {
	return {
		type : 'GEOLOCATOR_FEATURE',
		value : bool
	};
};

export function zipCode (value) {
	return {
		type : '',
		value
	};
};

// export function locations (locations) {
// 	return {
// 		type : '',
// 		value : locations
// 	};
// };

// export function loading (bool) {
// 	return {
// 		type : '',
// 		value : bool
// 	};
// };

// export function geoLocatorSupport (bool) {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function radiusLocations () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function matches () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function activeEntryIndex () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function entryDetailOpen () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function entryDetailOpenKey () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function printInProgress () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function userEmail () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function emailSent () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function emailSentError () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function emailInputValidationError () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function mailsendUrl () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function unit () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function radius () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function markerIcon() {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function debug () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function mapStyle () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function mapZoom () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function initialCenter () {
// 	return {
// 		type : '',
// 		value
// 	};
// };

// export function geoCoords () {
// 	return {
// 		type : '',
// 		value
// 	};
// }; 