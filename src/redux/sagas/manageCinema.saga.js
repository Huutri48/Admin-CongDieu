import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL, URL_API } from '../../constants/index';
function* getListInfoSystemCinemaAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + URL_API.API_INFO_SYSTEM_CINEMA,
		});
		console.log("")
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_INFO_SYSTEM_CINEMA_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_INFO_SYSTEM_CINEMA_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}

	} catch (error) {
		console.log("error: ", error?.response)
		yield put({
			type: "GET_LIST_INFO_SYSTEM_CINEMA_ADMIN_FAIL",
			payload: {
				error: error?.response?.data ? error?.response?.data : "Lỗi"
			},
		});
	}
}

export default function* manageCinemaSaga() {
	yield takeEvery('GET_LIST_INFO_SYSTEM_CINEMA_ADMIN_REQUEST', getListInfoSystemCinemaAdminSaga);
}
