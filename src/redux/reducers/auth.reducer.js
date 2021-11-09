import { openNotificationWithIcon } from "../../helpers";

var infoAdmin = JSON.parse(localStorage.getItem("infoAdmin"));
const initialState = {
	infoAdmin: {
		data: infoAdmin ? infoAdmin : {},
		load: false,
		error: ''
	},

	registerAdmin: {
		data: {},
		load: false,
		error: ''
	},

}

export default function authAdminReducer(state = initialState, action) {
	switch (action.type) {
		case 'POST_LOGIN_ADMIN_REQUEST': {
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					load: true
				}
			}
		}

		case 'POST_LOGIN_ADMIN_SUCCESS': {
			const { data } = action.payload;
			localStorage.setItem('infoAdmin', JSON.stringify(data));
			openNotificationWithIcon('success', "Đăng nhập thành công", 10)
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'POST_LOGIN_ADMIN_FAIL': {
			const { data, error } = action.payload
			openNotificationWithIcon('error', error, 10)
			return {
				...state,
				infoAdmin: {
					...state.infoAdmin,
					data: data === undefined ? {} : data,
					load: false,
					error: error,
				},
			};
		}

		// -------------------------------

		case 'POST_REGISTER_ADMIN_REQUEST': {
			return {
				...state,
				registerAdmin: {
					...state.registerAdmin,
					load: true
				}
			}
		}

		case 'POST_REGISTER_ADMIN_SUCCESS': {
			const { data } = action.payload;
			openNotificationWithIcon('success', "Đăng ký thành công", 10)
			return {
				...state,
				registerAdmin: {
					...state.registerAdmin,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'POST_REGISTER_ADMIN_FAIL': {
			const { data, error } = action.payload
			openNotificationWithIcon('error', error, 10)
			return {
				...state,
				registerAdmin: {
					...state.registerAdmin,
					data: data === undefined ? {} : data,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}
