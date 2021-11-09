
const initialState = {
	listInfoSystemCinema: {
		data: [],
		load: false,
		error: ''
	},

}

export default function manageCinemaReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_INFO_SYSTEM_CINEMA_ADMIN_REQUEST': {
			return {
				...state,
				listInfoSystemCinema: {
					...state.listInfoSystemCinema,
					load: true
				}
			}
		}

		case 'GET_LIST_INFO_SYSTEM_CINEMA_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listInfoSystemCinema: {
					...state.listInfoSystemCinema,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'GET_LIST_INFO_SYSTEM_CINEMA_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listInfoSystemCinema: {
					...state.listInfoSystemCinema,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}
