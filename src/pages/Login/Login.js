import React, { useState, useEffect } from 'react'
import { Spin } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { postLoginAdminAction } from "../../redux/actions"

import "./Login.css";

function Login({ infoAdmin, postLoginAdminTask }) {

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!infoAdmin.load) {
			setIsLoading(false);
		}
	}, [infoAdmin]);

	const [valueFormState, setValueFormState] = useState({
		email: "",
		password: ""
	})

	const [errorFormState, setErrorFormState] = useState({
		email: "",
		password: ""
	})

	function handleChangeInput(e) {
		const { name, value } = e.target;
		setValueFormState({
			...valueFormState,
			[name]: value,
		});
	}

	function handleSubmitLogin() {
		let isValue = true;

		const errorValue = {
			email: "",
			password: "",
		};

		if (valueFormState.email === "") {
			isValue = false;
			errorValue.email = "Vui lòng tên tài khoản của bạn";
		}
		//else if (!/.+@.+\.[A-Za-z]+$/.test(valueFormState.email)) {
		// 	isValue = false;
		// 	errorValue.email = "Email không hợp lệ.";
		// }
		else {
			errorValue.email = "";
		}

		if (valueFormState.password === "") {
			isValue = false;
			errorValue.password = "Vui lòng nhập mật khẩu của bạn";
		} else {
			errorValue.password = "";
		}

		if (isValue) {
			setIsLoading(true);
			setErrorFormState({ ...errorValue });
			postLoginAdminTask(valueFormState);
		} else {
			setErrorFormState({ ...errorValue });
		}
	}

	return (
		<>
			<Spin tip="Loading..." spinning={isLoading}>
				<div className="wrapper-login">
					<div className=" wrapper-login-more">
						<div className="content-login">
							<h2 className="title-login">Đăng nhập </h2>
							<div className="form-groups">
								<label htmlFor="email" className="form-label"> Tài khoản </label>
								<input
									className="form-input"
									type="text"
									id="email"
									name="email"
									placeholder="abc"
									value={valueFormState.email}
									onChange={handleChangeInput}
								/>
								{errorFormState.email.length > 0 && (
									<small className="input-error">
										{errorFormState.email}
									</small>
								)}
							</div>
							<div className="form-groups">
								<div className="form-groups-sub">
									<label htmlFor="password" className="form-label"> Mật khẩu </label>
									{/* <p>Quên mật khẩu</p> */}
								</div>
								<input
									className="form-input"
									type="password"
									id="password"
									name="password"
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
								<button className="bg-button btn-login w-100" onClick={handleSubmitLogin}>Đăng nhập</button>
							</div>
							{/* <hr className="divider"></hr> */}
							<div className="more-title-login">
								<p>Bạn chưa có tài khoản ? <Link to="/register" className="text-more-login">Đăng ký</Link> </p>
							</div>
						</div>
					</div>
				</div>
			</Spin>
		</>
	)
}

const mapStateToProps = (state) => {
	const { infoAdmin } = state.authAdminReducer;
	return {
		infoAdmin: infoAdmin,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		postLoginAdminTask: (params) => dispatch(postLoginAdminAction(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

