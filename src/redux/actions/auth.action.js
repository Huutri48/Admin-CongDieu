export function postLoginAdminAction(params) {
	return {
		type: 'POST_LOGIN_ADMIN_REQUEST',
		payload: params
	}
}

export function postRegisterAdminAction(params) {
	return {
		type: 'POST_REGISTER_ADMIN_REQUEST',
		payload: params
	}
}