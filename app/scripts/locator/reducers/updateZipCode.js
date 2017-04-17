// Zipcode Reducer


export function updateZipCode(state = {}, action) {

	switch(action.type){
		case 'UPDATE_ZIP_CODE' :

			const val = action.value;

			return state;

		default :

			return state;
	};

};

export default updateZipCode;