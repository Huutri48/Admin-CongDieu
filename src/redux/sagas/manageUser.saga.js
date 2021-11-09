import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL, URL_API } from '../../constants/index';
import authHeaderAdmin from '../../services/auth-headers-admin';
import history from "../../utils/history.js";
import { openNotificationWithIcon } from "../../helpers";

function* getListUserAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + URL_API.API_MANAGE_USER,

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_USER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_USER_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}

	} catch (error) {
		yield put({
			type: "GET_LIST_USER_ADMIN_FAIL",
			payload: {
				error: error?.response?.data ? error?.response?.data : "Lỗi"
			},
		});
	}
}

function* getListCategoryUserAdminSaga() {
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + URL_API.API_CATEGORY_USER,

		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_CATEGORY_USER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
		} else {
			yield put({
				type: "GET_LIST_CATEGORY_USER_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}

	} catch (error) {

		yield put({
			type: "GET_LIST_CATEGORY_USER_ADMIN_FAIL",
			payload: {
				error: error?.response?.data ? error?.response?.data : "Lỗi"
			},
		});
	}
}

function* getListUserAdminByNameSaga(actions) {
	const { valueSearch } = actions.payload
	try {
		const result = yield axios({
			method: 'GET',
			url: URL + URL_API.API_SEARCH_USER + "?MaNhom=GP01&tuKhoa=" + valueSearch,
		});
		if (result.status === 200) {
			yield put({
				type: "GET_LIST_USER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
				headers: authHeaderAdmin(),
			});
		} else {
			yield put({
				type: "GET_LIST_USER_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}

	} catch (error) {

		yield put({
			type: "GET_LIST_USER_ADMIN_FAIL",
			payload: {
				error: error?.response?.data ? error?.response?.data : "Lỗi " + error?.response?.status
			},
		});
	}
}

function* postAddUserAdminSaga(action) {
	const { name, userName, email, password, phone, maNhom, maLoaiNguoiDung } = action.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + URL_API.API_REGISTER,
			data: {
				taiKhoan: userName,
				matKhau: password,
				email: email,
				soDt: phone,
				maNhom: maNhom,
				maLoaiNguoiDung: maLoaiNguoiDung,
				hoTen: name
			},
		});
		if (result.status === 200) {
			history.push('/manage-user')
		} else {
			openNotificationWithIcon('error', result.message.data, 10)
		}
	} catch (error) {
		openNotificationWithIcon('error', error?.response?.data ? error?.response?.data : "Lỗi " + error?.response?.status, 10)
	}
}

function* putUserAdminSaga(action) {

	const {
		hoTen,
		taiKhoan,
		matKhau,
		email,
		soDt,
		maNhom,
		maLoaiNguoiDung,
	} = action.payload.valueFormState;
	try {
		const result = yield axios({
			method: 'PUT',
			//url: URL + URL_API.API_PUT_USER,
			url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
			data: {
				taiKhoan: taiKhoan,
				matKhau: matKhau,
				email: email,
				soDt: soDt,
				maNhom: maNhom,
				maLoaiNguoiDung: maLoaiNguoiDung,
				hoTen: hoTen,
			},
			headers: authHeaderAdmin(),
		});
		console.log("result: ", result)
		if (result.status === 200) {
			window.location.reload();
		} else {
			openNotificationWithIcon('error', result.message.data, 10)
		}
	} catch (error) {
		console.log("123123: ", error)
		openNotificationWithIcon('error', error?.response?.data ? error?.response?.data : "Lỗi " + error?.response?.status, 10)
	}
}

function* deleteUserAdminSaga(action) {
	const { taikhoan } = action.payload;
	try {
		const result = yield axios({
			method: 'DELETE',
			url: URL + URL_API.API_DELETE_USER + "?TaiKhoan=" + taikhoan,
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

export default function* manageUserSaga() {
	yield takeEvery('GET_LIST_USER_ADMIN_REQUEST', getListUserAdminSaga);
	yield takeEvery('GET_LIST_CATEGORY_USER_ADMIN_REQUEST', getListCategoryUserAdminSaga);
	yield takeEvery('GET_LIST_USER_ADMIN_BY_NAME_REQUEST', getListUserAdminByNameSaga);
	yield takeEvery('POST_ADD_USER_ADMIN_REQUEST', postAddUserAdminSaga);
	yield takeEvery('PUT_USER_ADMIN_REQUEST', putUserAdminSaga);
	yield takeEvery('DELETE_USER_ADMIN_REQUEST', deleteUserAdminSaga);
}
