export function getListUserAdminAction() {
	return {
		type: 'GET_LIST_USER_ADMIN_REQUEST',
		payload: ""
	}
}

export function getListCategoryUserAdminAction() {
	return {
		type: 'GET_LIST_CATEGORY_USER_ADMIN_REQUEST',
		payload: ""
	}
}

export function getListUserAdminByNameAction(params) {
	return {
		type: 'GET_LIST_USER_ADMIN_BY_NAME_REQUEST',
		payload: params
	}
}

export function postAddUserAdminAction(params) {
	return {
		type: 'POST_ADD_USER_ADMIN_REQUEST',
		payload: params
	}
}

export function deleteUserAdminAction(params) {
	return {
		type: 'DELETE_USER_ADMIN_REQUEST',
		payload: params
	}
}

export function putUserAdminAction(params) {
	return {
		type: 'PUT_USER_ADMIN_REQUEST',
		payload: params
	}
}