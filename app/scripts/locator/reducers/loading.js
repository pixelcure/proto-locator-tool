// Loading Reducer

export function loading(state = {}, action) {

	switch(action.type){
		case 'LOADING_STATUS' :

			// boolean
			const val = action.value;
			console.log(state);
			// return state
			return state;

		default :
			// return current state
			return state;
	};

};

export default loading;