
const initialState = {
	listFilm: {
		data: [],
		load: false,
		error: ''
	},

	listInfoMovieShowtime: {
		data: [],
		load: false,
		error: ''
	}

}

export default function manageFilmReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_LIST_FILM_ADMIN_REQUEST': {
			return {
				...state,
				listFilm: {
					...state.listFilm,
					load: true
				}
			}
		}

		case 'GET_LIST_FILM_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listFilm: {
					...state.listFilm,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'GET_LIST_FILM_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listFilm: {
					...state.listFilm,
					load: false,
					error: error,
				},
			};
		}

		// ---------------------------------------

		case 'GET_INFO_MOVIE_SHOWTIME_ADMIN_REQUEST': {
			return {
				...state,
				listInfoMovieShowtime: {
					...state.listInfoMovieShowtime,
					load: true
				}
			}
		}

		case 'GET_INFO_MOVIE_SHOWTIME_ADMIN_SUCCESS': {
			const { data } = action.payload;
			return {
				...state,
				listInfoMovieShowtime: {
					...state.listInfoMovieShowtime,
					data: data,
					load: false,
					error: ""
				},
			}
		}

		case 'GET_INFO_MOVIE_SHOWTIME_ADMIN_FAIL': {
			const { error } = action.payload
			return {
				...state,
				listInfoMovieShowtime: {
					...state.listInfoMovieShowtime,
					load: false,
					error: error,
				},
			};
		}

		default:
			return state
	}
}
