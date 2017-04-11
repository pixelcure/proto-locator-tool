// Zipcode Reducer

export function zipCode(state = [], action) {

	switch(action.type){
		case 'UPDATE_ZIP' :

			const val = action.value;

			return state;

		default :

			return state;
	};

};

export default zipCode;