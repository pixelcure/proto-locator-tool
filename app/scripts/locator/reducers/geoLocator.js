// Geolocator Reducer

export function geoLocator(state, action) {

	switch(action.type){
		case 'GEOLOCATOR_FEATURE' :

			// boolean
			const val = action.value;

			// return state
			return state;

		default :
			// return current state
			return state;
	};

};

export default geoLocator;