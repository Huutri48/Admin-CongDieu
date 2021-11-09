export function getListFilmAdminAction() {
	return {
		type: 'GET_LIST_FILM_ADMIN_REQUEST',
		payload: ""
	}
}

export function getListFilmAdminByDateAction(params) {
	return {
		type: 'GET_LIST_FILM_ADMIN_BY_DATE_REQUEST',
		payload: params
	}
}

export function postAddFilmAdminAction(params) {
	return {
		type: 'POST_ADD_FILM_ADMIN_REQUEST',
		payload: params
	}
}

export function postEditFilmAdminAction(params) {
	return {
		type: 'POST_EDIT_FILM_ADMIN_REQUEST',
		payload: params
	}
}

export function deleteFilmAdminAction(params) {
	return {
		type: 'DELETE_FILM_ADMIN_REQUEST',
		payload: params
	}
}

export function getInfoMovieShowtimeAdminAction(params) {
	return {
		type: 'GET_INFO_MOVIE_SHOWTIME_ADMIN_REQUEST',
		payload: params
	}
}

export function postAddShowTimesAction(params) {
	console.log("params 1112: ", params)
	return {
		type: 'POST_ADD_SHOW_TIMES_REQUEST',
		payload: params
	}
}




