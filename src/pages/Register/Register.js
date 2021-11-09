import React, { useEffect, useState } from 'react'
import { Select, Spin } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { postRegisterAdminAction } from "../../redux/actions"
import "./Register.css"
const { Option } = Select;
function Register({ registerAdmin, postRegisterAdminTask }) {

	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (!registerAdmin.load) {
			setIsLoading(false);
		}
	}, [registerAdmin]);
	const [valueFormState, setValueFormState] = useState({
		name: "",
		userName: "",
		password: "",
		confirmPassword: "",
		email: "",
		phone: "",
		maNhom: "GP01",
		maLoaiNguoiDung: "KhachHang",
	})

	const [errorFormState, setErrorFormState] = useState({
		userName: "",
		password: "",
		confirmPassword: "",
		email: "",
		phone: "",
		name: ""
	})

	function handleChangeInput(e) {
		const { name, value } = e.target;
		setValueFormState({
			...valueFormState,
			[name]: value,
		});
	}

	function onChangeSelectLoaiKhach(value) {
		setValueFormState({
			...valueFormState,
			maLoaiNguoiDung: value
		})
	}

	function onChangeSelectNhom(value) {
		setValueFormState({
			...valueFormState,
			maNhom: value
		})
	}

	function handleSubmitRegister() {
		let isValue = true;

		const errorValue = {
			name: "",
			email: "",
			phone: "",
			userName: "",
			password: "",
			confirmPassword: "",
		};

		if (valueFormState.name === "") {
			isValue = false;
			errorValue.name = "Vui lòng họ tên của bạn";
		} else {
			errorValue.name = "";
		}

		if (valueFormState.email === "") {
			isValue = false;
			errorValue.email = "Vui lòng nhập email của bạn";
		}
		else if (!/.+@.+\.[A-Za-z]+$/.test(valueFormState.email)) {
			isValue = false;
			errorValue.email = "Email không hợp lệ.";
		}
		else {
			errorValue.email = "";
		}

		if (valueFormState.phone === "") {
			isValue = false;
			errorValue.phone = "Vui lòng số điện thoại của bạn";
		} else {
			errorValue.phone = "";
		}

		if (valueFormState.userName === "") {
			isValue = false;
			errorValue.userName = "Vui lòng tên tài khoản của bạn";
		} else {
			errorValue.userName = "";
		}

		if (valueFormState.password === "") {
			isValue = false;
			errorValue.password = "Vui lòng nhập mật khẩu của bạn";
		} else {
			errorValue.password = "";
		}

		if (valueFormState.confirmPassword === "") {
			isValue = false;
			errorValue.confirmPassword = "Vui lòng xác nhận mật khẩu của bạn";
		} else if (valueFormState.confirmPassword !== valueFormState.password) {
			isValue = false;
			errorValue.confirmPassword = "Mật khẩu không khớp";
		} else {
			errorValue.confirmPassword = "";
		}

		if (isValue) {
			setIsLoading(true);
			setErrorFormState({ ...errorValue });
			postRegisterAdminTask(valueFormState);
		} else {
			setErrorFormState({ ...errorValue });
		}
	}


	return (
		<>
			<Spin tip="Loading..." spinning={isLoading}>
				<div className="wrapper-register">
					<div className="wrapper-register-more">
						<div className="content-register">
							<h2 className="title-register">Đăng ký</h2>
							<div className="form-groups">
								<label htmlFor="userName" className="form-label"> Tài khoản </label>
								<input
									className="form-input"
									type="text"
									id="userName"
									name="userName"
									value={valueFormState.userName}
									onChange={handleChangeInput}
									placeholder="Tên tài khoản"
								/>
								{errorFormState.userName.length > 0 && (
									<small className="input-error">
										{errorFormState.userName}
									</small>
								)}
							</div>
							<div className="form-groups">
								<label htmlFor="email" className="form-label"> Email </label>
								<input
									className="form-input"
									type="text"
									id="email"
									name="email"
									value={valueFormState.email}
									onChange={handleChangeInput}
									placeholder="abc@gmail.com"

								/>
								{errorFormState.email.length > 0 && (
									<small className="input-error">
										{errorFormState.email}
									</small>
								)}
							</div>
							<div className="form-groups">
								<label htmlFor="name" className="form-label"> Họ tên </label>
								<input
									className="form-input"
									type="text"
									id="name"
									name="name"
									value={valueFormState.name}
									onChange={handleChangeInput}
									placeholder="Họ và tên của bạn"
								/>
								{errorFormState.name.length > 0 && (
									<small className="input-error">
										{errorFormState.name}
									</small>
								)}
							</div>

							<div className="form-groups">
								<label htmlFor="phone" className="form-label"> Số điện thoại </label>
								<input
									className="form-input"
									type="text"
									id="phone"
									name="phone"
									value={valueFormState.phone}
									onChange={handleChangeInput}
									placeholder="Số điện thoại"
								/>
								{errorFormState.phone.length > 0 && (
									<small className="input-error">
										{errorFormState.phone}
									</small>
								)}
							</div>

							<div className="form-groups">
								<label htmlFor="phone" className="form-label"> Loại người dùng </label>
								<Select
									showSearch
									style={{ width: 200, marginLeft: "20px" }}
									placeholder="Select a person"
									optionFilterProp="children"
									onChange={onChangeSelectLoaiKhach}
									defaultValue="KhachHang"
								>
									<Option value="KhachHang">Khách hàng</Option>
									<Option value="QuanTri">Quản trị</Option>
								</Select>
							</div>
							<div className="form-groups">
								<label htmlFor="phone" className="form-label"> Nhóm </label>
								<Select
									showSearch
									style={{ width: 200, marginLeft: "20px" }}
									placeholder="Select a person"
									optionFilterProp="children"
									onChange={onChangeSelectNhom}
									defaultValue="GP01"
								>
									<Option value="GP01">GP01</Option>
									<Option value="GP02">GP02</Option>
								</Select>
							</div>
							<div className="form-groups">
								<label htmlFor="password" className="form-label"> Mật khẩu </label>
								<input
									className="form-input"
									type="password"
									id="password" name="password"
									value={valueFormState.password}
									onChange={handleChangeInput}
								/>
								{errorFormState.password.length > 0 && (
									<small className="input-error">
										{errorFormState.password}
									</small>
								)}
							</div>
							<div className="form-groups">
								<label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu </label>
								<input
									className="form-input"
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									value={valueFormState.confirmPassword}
									onChange={handleChangeInput}
								/>
								{errorFormState.confirmPassword.length > 0 && (
									<small className="input-error">
										{errorFormState.confirmPassword}
									</small>
								)}
							</div>
							<div className="form-groups">
								<button className="bg-button btn-register w-100" onClick={handleSubmitRegister}>Tạo tài khoản</button>
							</div>
							{/* <hr className="divider"></hr> */}

							<div className="more-title-register">
								<p>Bạn đã có tài khoản ? <Link to="/login" className="text-more-register">Đăng nhập</Link> </p>
							</div>
						</div>
					</div>
				</div>
			</Spin>
		</>
	)
}


const mapStateToProps = (state) => {
	const { registerAdmin } = state.authAdminReducer;
	return {
		registerAdmin: registerAdmin,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		postRegisterAdminTask: (params) => dispatch(postRegisterAdminAction(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
