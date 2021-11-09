import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL, URL_API } from '../../constants';
import authHeaderAdmin from '../../services/auth-headers-admin';
import history from "../../utils/history.js";
import { openNotificationWithIcon } from '../../helpers';
function* getListFilmAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + URL_API.API_MANAGE_FILM,
		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_FILM_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_FILM_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}

	} catch (error) {
		console.log("error: ", error?.response)
		yield put({
			type: "GET_LIST_FILM_ADMIN_FAIL",
			payload: {
				error: error?.response?.data ? error?.response?.data : "Lỗi"
			},
		});
	}
}

function* getListFilmAdminByDateSaga(action) {
	const { valueDateState } = action.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + URL_API.API_SEARCH_FILM + "?maNhom=GP01&tenPhim=''&soTrang=1&soPhanTuTrenTrang=10&tuNgay=" + valueDateState.tuNgay + "&denNgay=" + valueDateState.denNgay,
		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_FILM_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_FILM_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}
	} catch (error) {
		console.log("error: ", error?.response)
		openNotificationWithIcon('error', error?.response?.data ? error?.response?.data : "Lỗi " + error?.response?.status, 10)
	}
}

function* postAddFilmAdminSaga(action) {
	const {
		maPhim,
		tenPhim,
		biDanh,
		trailer,
		hinhAnh,
		moTa,
		maNhom,
		ngayKhoiChieu,
		danhGia,
	} = action.payload;

	console.log("action 123: ", action)

	try {
		const result = yield axios({
			method: 'POST',
			url: URL + URL_API.API_ADD_FILM,
			data: {
				maPhim: maPhim,
				tenPhim: tenPhim,
				biDanh: biDanh,
				trailer: trailer,
				hinhAnh: hinhAnh,
				moTa: moTa,
				maNhom: maNhom,
				ngayKhoiChieu: ngayKhoiChieu,
				danhGia: danhGia,
			},
			headers: authHeaderAdmin()
		});
		if (result.status === 200) {
			history.push('/manage-film')
		} else {
			openNotificationWithIcon('error', result.message.data, 10)
		}
	} catch (error) {
		openNotificationWithIcon('error', error?.response?.data ? error?.response?.data : "Lỗi " + error?.response?.status, 10)
	}
}

function* postEditFilmAdminSaga(action) {
	const {
		maPhim,
		tenPhim,
		biDanh,
		trailer,
		hinhAnh,
		moTa,
		maNhom,
		ngayKhoiChieu,
		danhGia,
	} = action.payload;

	console.log("action 123: ", action)

	try {
		const result = yield axios({
			method: 'POST',
			url: URL + URL_API.API_EDIT_FILM,
			data: {
				maPhim: maPhim,
				tenPhim: tenPhim,
				biDanh: biDanh,
				trailer: trailer,
				hinhAnh: hinhAnh,
				moTa: moTa,
				maNhom: maNhom,
				ngayKhoiChieu: ngayKhoiChieu,
				danhGia: danhGia,
			},
			headers: authHeaderAdmin()
		});
		if (result.status === 200) {
			history.push('/manage-film')
		} else {
			openNotificationWithIcon('error', result.message.data, 10)
		}
	} catch (error) {
		openNotificationWithIcon('error', error?.response?.data ? error?.response?.data : "Lỗi " + error?.response?.status, 10)
	}
}

function* deleteFilmAdminSaga(action) {
	const { MaPhim } = action.payload;
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + URL_API.API_DELETE_FILM + "?MaPhim=" + MaPhim,
			headers: authHeaderAdmin(),
		});
		if (result.status === 200) {
			window.location.reload();
		} else {
			openNotificationWithIcon('error', result.message.data, 10)
		}
	} catch (error) {
		openNotificationWithIcon('error', error?.response?.data ? error?.response?.data : "Lỗi " + error?.response?.status, 10)
	}
}

function* getInfoMovieShowtimeAdminSaga(action) {
	const { MaPhim } = action.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + URL_API.API_INFO_MOVIE_FILM + "?MaPhim=" + MaPhim,
		});
		if (result.status === 200) {
			yield put({
				type: "GET_INFO_MOVIE_SHOWTIME_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_INFO_MOVIE_SHOWTIME_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}
	} catch (error) {
		yield put({
			type: "GET_INFO_MOVIE_SHOWTIME_ADMIN_FAIL",
			payload: {
				error: error?.response?.data ? error?.response?.data : "Lỗi"
			},
		});
	}
}

function* postAddShowTimesSaga(action) {
	console.log("action.payload11: ", action.payload)
	const { maPhim, ngayChieuGioChieu, maRap, giaVe } = action.payload
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + URL_API.API_ADD_SHOW_TIMES,
			data: {
				maPhim: maPhim,
				ngayChieuGioChieu: ngayChieuGioChieu,
				maRap: maRap,
				giaVe: giaVe
			},
			headers: authHeaderAdmin()
		});
		console.log("result add lich chieu: ", result)
		if (result.status === 200) {
			window.location.reload();
		} else {
			openNotificationWithIcon('error', result.message.data, 10)
		}
	} catch (error) {
		openNotificationWithIcon('error', error?.response?.data && error?.response?.data, 10)
	}
}

export default function* manageFilmSaga() {
	yield takeEvery('GET_LIST_FILM_ADMIN_REQUEST', getListFilmAdminSaga);
	yield takeEvery('DELETE_FILM_ADMIN_REQUEST', deleteFilmAdminSaga);
	yield takeEvery('POST_ADD_FILM_ADMIN_REQUEST', postAddFilmAdminSaga);
	yield takeEvery('POST_EDIT_FILM_ADMIN_REQUEST', postEditFilmAdminSaga);
	yield takeEvery('GET_LIST_FILM_ADMIN_BY_DATE_REQUEST', getListFilmAdminByDateSaga);
	yield takeEvery('GET_INFO_MOVIE_SHOWTIME_ADMIN_REQUEST', getInfoMovieShowtimeAdminSaga);

	yield takeEvery('POST_ADD_SHOW_TIMES_REQUEST', postAddShowTimesSaga);
}
