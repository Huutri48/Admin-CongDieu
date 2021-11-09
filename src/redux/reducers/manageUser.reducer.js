
const initialState = {
	listUser: {
		data: [],
		load: false,
		error: ''
	},

	listCategoryUser: {
		data: [],
		load: false,
		error: ''
	},

	addUser: {
		data: {},
		load: false,
		error: ''
	},
}

export default function manageUserReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_USER_ADMIN_REQUEST': {
			return {
				...state,
				listUser: {
					...state.listUser,
					load: true
				}
			}
		}

		case 'GET_LIST_USER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listUser: {
					...state.listUser,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'GET_LIST_USER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listUser: {
					...state.listUser,
					load: false,
					error: error,
				},
			};
		}

		// ----------------------------

		case 'GET_LIST_CATEGORY_USER_ADMIN_REQUEST': {
			return {
				...state,
				listCategoryUser: {
					...state.listCategoryUser,
					load: true
				}
			}
		}

		case 'GET_LIST_CATEGORY_USER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listCategoryUser: {
					...state.listCategoryUser,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'GET_LIST_CATEGORY_USER_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listCategoryUser: {
					...state.listCategoryUser,
					load: false,
					error: error,
				},
			};
		}



		default:
			return state
	}
}
