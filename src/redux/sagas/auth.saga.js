import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { URL, URL_API } from '../../constants/index';
import history from "../../utils/history.js";
function* postLoginAdminSaga(action) {
	const { email, password } = action.payload;
	try {
		const result = yield axios({
			method: 'POST',
			url: URL + URL_API.API_LOGIN,
			data: {
				taikhoan: email,
				matKhau: password
			},
		});
		if (result.status === 200) {
			history.push("/dashboard")
			yield put({
				type: "POST_LOGIN_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
			history.push("/dashboard")
		} else {
			yield put({
				type: "POST_LOGIN_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}

	} catch (error) {
		yield put({
			type: "POST_LOGIN_ADMIN_FAIL",
			payload: {
				error: error?.response?.data ? error?.response?.data : "Lỗi"
			},
		});
	}
}

function* postRegisterAdminSaga(action) {
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
			history.push("/login")
			yield put({
				type: "POST_REGISTER_ADMIN_SUCCESS",
				payload: {
					data: result.data
				},
			});
			history.push("/login")
		} else {
			yield put({
				type: "POST_REGISTER_ADMIN_FAIL",
				payload: {
					error: result.data.message
				},
			});
		}

	} catch (error) {
		console.log("error: ", error?.response)
		yield put({
			type: "POST_REGISTER_ADMIN_FAIL",
			payload: {
				error: error?.response?.data ? error?.response?.data : "Lỗi"
			},
		});
	}
}

export default function* authAdminSaga() {
	yield takeEvery('POST_LOGIN_ADMIN_REQUEST', postLoginAdminSaga);
	yield takeEvery('POST_REGISTER_ADMIN_REQUEST', postRegisterAdminSaga);
}
