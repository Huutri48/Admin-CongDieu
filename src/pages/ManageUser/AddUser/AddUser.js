import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Select } from 'antd'
import { connect } from "react-redux";
import { postAddUserAdminAction, getListCategoryUserAdminAction } from '../../../redux/actions'
import "./AddUser.css"

const { Option } = Select;

function AddUser({ listCategoryUser, getListCategoryUserAdminTask, postAddUserAdminTask }) {

	useEffect(() => {
		getListCategoryUserAdminTask()
	}, [getListCategoryUserAdminTask])

	const [valueFormState, setValueFormState] = useState({
		name: "",
		userName: "",
		password: "",
		// confirmPassword: "",
		email: "",
		phone: "",
		maNhom: "GP01",
		maLoaiNguoiDung: "KhachHang",
	})

	const [errorFormState, setErrorFormState] = useState({
		userName: "",
		password: "",
		// confirmPassword: "",
		email: "",
		phone: "",
		name: ""
	})

	if (listCategoryUser.load) {
		return (
			<h1>Loading ...</h1>
		)
	}

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

	function renderListOptionCategory() {
		return listCategoryUser.data?.map((item, index) => {
			return (
				<Option key={index} value={item.maLoaiNguoiDung}>{item.tenLoai}</Option>
			)
		})
	}

	function handleSubmitAddUser() {
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

		// if (valueFormState.confirmPassword === "") {
		// 	isValue = false;
		// 	errorValue.confirmPassword = "Vui lòng xác nhận mật khẩu của bạn";
		// } else if (valueFormState.confirmPassword !== valueFormState.password) {
		// 	isValue = false;
		// 	errorValue.confirmPassword = "Mật khẩu không khớp";
		// } else {
		// 	errorValue.confirmPassword = "";
		// }

		if (isValue) {
			// setIsLoading(true);
			setErrorFormState({ ...errorValue });
			postAddUserAdminTask(valueFormState);
		} else {
			setErrorFormState({ ...errorValue });
		}
	}

	return (
		<>
			<div className="wrapper-add-user">
				<div className="add-user-header bg-white">
					<div className="wrapper-breadcrumb">
						<ul className="content-breadcrumb">
							<li>
								<Link to="/manage-user" > Manage User </Link>
							</li>
							<li> {'>'} </li>
							<li>
								Add User
							</li>
						</ul>
					</div>
					<button
						className="d-inline-block bg-button btn-create-user"
						onClick={handleSubmitAddUser}>
						Tạo người dùng
					</button>
				</div>
				<div className="add-user-main bg-white">
					<Row gutter={[16, 16]}>
						<Col md={12} >
							<div className="form-groups" >
								<label htmlFor="userName" className="form-label"> Tài khoản </label>
								<input
									className="form-input"
									type="text"
									id="userName"
									name="userName"
									value={valueFormState.userName}
									onChange={handleChangeInput}
									placeholder=""

								/>
								{errorFormState.userName.length > 0 && (
									<small className="input-error">
										{errorFormState.userName}
									</small>
								)}
							</div>
						</Col>
						<Col md={12} >
							<div className="form-groups" >
								<label htmlFor="name" className="form-label"> Họ Tên </label>
								<input
									className="form-input"
									type="text"
									id="name"
									name="name"
									value={valueFormState.name}
									onChange={handleChangeInput}
									placeholder=""

								/>
								{errorFormState.name.length > 0 && (
									<small className="input-error">
										{errorFormState.name}
									</small>
								)}
							</div>
						</Col>

					</Row>
					<Row gutter={[16, 16]}>
						<Col md={12} >
							<div className="form-groups" >
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
						</Col>
						<Col md={12} >
							<div className="form-groups" >
								<label htmlFor="phone" className="form-label"> Số điện thoại </label>
								<input
									className="form-input"
									type="text"
									id="phone"
									name="phone"
									value={valueFormState.phone}
									onChange={handleChangeInput}
									placeholder="099999XXXX"

								/>
								{errorFormState.phone.length > 0 && (
									<small className="input-error">
										{errorFormState.phone}
									</small>
								)}
							</div>
						</Col>

					</Row>
					<Row gutter={[16, 16]}>
						<Col md={12} >
							<div className="form-groups" >
								<label htmlFor="codeGroup" className="form-label"> Nhóm </label>
								<Select
									showSearch
									id="codeGroup"
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
						</Col>
						<Col md={12} >
							<div className="form-groups" >
								<label htmlFor="codeCustomer" className="form-label"> Loại người dùng </label>
								<Select
									showSearch
									style={{ width: 200, marginLeft: "20px" }}
									placeholder="Select a person"
									id="codeCustomer"
									optionFilterProp="children"
									onChange={onChangeSelectLoaiKhach}
									defaultValue="KhachHang"
								>
									{renderListOptionCategory()}
								</Select>
							</div>
						</Col>
					</Row>
					<Row >
						<Col md={24}>
							<div className="form-groups" style={{ width: "98%" }}>
								<label htmlFor="password" className="form-label"> Mật khẩu </label>
								<input
									className="form-input"
									type="password"
									id="password"
									name="password"
									value={valueFormState.password}
									onChange={handleChangeInput}
								// placeholder="abc@gmail.com"

								/>
								{errorFormState.password.length > 0 && (
									<small className="input-error">
										{errorFormState.password}
									</small>
								)}
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	const { listCategoryUser } = state.manageUserReducer;
	return {
		listCategoryUser: listCategoryUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getListCategoryUserAdminTask: () => dispatch(getListCategoryUserAdminAction()),
		postAddUserAdminTask: (params) => dispatch(postAddUserAdminAction(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)

