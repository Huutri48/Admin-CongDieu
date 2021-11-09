import React, { useState, useEffect } from 'react'
import { Col, Row, Select } from 'antd'
import { Table } from 'antd';
import { connect } from "react-redux";
import {
	getListUserAdminAction,
	getListUserAdminByNameAction,
	deleteUserAdminAction,
	getListCategoryUserAdminAction,
	putUserAdminAction
} from "../../redux/actions"

import "./ManageUser.css"
import history from '../../utils/history';

const { Option } = Select;

function ManageUser({
	listUser,
	listCategoryUser,
	getListCategoryUserAdminTask,
	getListUserAdminTask,
	getListUserAdminByNameTask,
	putUserAdminTask,
	deleteUserAdminTask,
}) {

	const [listUserState, setListUserState] = useState(listUser.data)

	const [getInfoByClickState, setGetInfoByClickState] = useState({
		display: false,
		info: {}
	})

	useEffect(() => {
		getListUserAdminTask();
		getListCategoryUserAdminTask()
	}, [getListUserAdminTask, getListCategoryUserAdminTask]);

	useEffect(() => {
		setListUserState(listUser.data)
	}, [listUser]);

	const columns = [
		{
			title: '#',
			dataIndex: 'STT',
			key: 'STT',
		},
		{
			title: 'Tài khoản',
			dataIndex: 'taikhoan',
			key: 'taikhoan',
		},
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
			key: 'hoTen',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'soDt',
			key: 'soDt',
		},
		{
			title: 'Loại khách hàng',
			dataIndex: 'maLoaiNguoiDung',
			key: 'maLoaiNguoiDung',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
		},
	];

	function renderListUser() {
		return listUserState.map((item, index) => {
			return {
				key: index,
				STT: index + 1,
				taikhoan: item.taiKhoan,
				hoTen: item.hoTen,
				email: item.email,
				soDt: item.soDt,
				maLoaiNguoiDung: item.maLoaiNguoiDung,
				action: (
					<>
						<button
							className="bg-edit"
							title="Chỉnh sữa"
							style={{ marginRight: "12px" }}
							onClick={() => {
								setValueFormState({
									hoTen: item.hoTen,
									taiKhoan: item.taiKhoan,
									matKhau: item.matKhau,
									email: item.email,
									soDt: item.soDt,
									maNhom: "GP01",
									maLoaiNguoiDung: item.maLoaiNguoiDung,
								})
								setGetInfoByClickState({
									display: true,
									info: { item }
								})
							}}
						>
							<i className="far fa-edit"></i>
						</button>
						<button
							className="bg-delete"
							title="Xóa"
							onClick={() => { deleteUserAdminTask({ taikhoan: item.taiKhoan }) }}
						>
							<i className="far fa-trash"></i>
						</button>
					</>
				)
			}
		})
	}

	const [valueSearch, setValueSearch] = useState("");

	function handleChangeSearch(e) {
		setValueSearch(e.target.value);
	}

	function handleKeyDown(e) {
		if (valueSearch.length > 0) {
			if (e.key === "Enter") {
				getListUserAdminByNameTask({ valueSearch: valueSearch })
			}
		}
	}

	const [valueFormState, setValueFormState] = useState({
		hoTen: "",
		taiKhoan: "",
		matKhau: "",
		email: "",
		soDt: "",
		maNhom: "GP01",
		maLoaiNguoiDung: "",
	})

	function handleChangeInput(e) {
		const { name, value } = e.target;
		setValueFormState({
			...valueFormState,
			[name]: value,
		});
	}

	function renderListOptionCategory() {
		return listCategoryUser.data?.map((item, index) => {
			return (
				<Option key={index} value={item.maLoaiNguoiDung}>{item.tenLoai}</Option>
			)
		})
	}

	return (
		<>
			{getInfoByClickState.display && (
				<div className="position-fixed-top-0-left-0 wrapper-model-edit bg-blur-gray ">
					<div className="content-model-edit bg-white">
						<h3> Edit user </h3>
						<Row>
							<Col md={12} >
								<div className="form-groups" style={{ width: "95%" }}>
									<label htmlFor="taiKhoan" className="form-label"> Tài khoản </label>
									<input
										className="form-input"
										type="text"
										id="taiKhoan"
										name="taiKhoan"
										value={valueFormState.taiKhoan}
										onChange={handleChangeInput}
										placeholder=""
									/>
									{/* {errorFormState.taiKhoan.length > 0 && (
										<small className="input-error">
											{errorFormState.taiKhoan}
										</small>
									)} */}
								</div>
							</Col>
							<Col md={12} >
								<div className="form-groups" style={{ width: "95%" }}>
									<label htmlFor="hoTen" className="form-label"> Họ Tên </label>
									<input
										className="form-input"
										type="text"
										id="hoTen"
										name="hoTen"
										value={valueFormState.hoTen}
										onChange={handleChangeInput}
										placeholder=""

									/>
									{/* {errorFormState.hoTen.length > 0 && (
										<small className="input-error">
											{errorFormState.hoTen}
										</small>
									)} */}
								</div>
							</Col>

						</Row>
						<Row>
							<Col md={12} >
								<div className="form-groups" style={{ width: "95%" }}>
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
									{/* {errorFormState.email.length > 0 && (
										<small className="input-error">
											{errorFormState.email}
										</small>
									)} */}
								</div>
							</Col>
							<Col md={12} >
								<div className="form-groups" style={{ width: "95%" }}>
									<label htmlFor="soDt" className="form-label"> Số điện thoại </label>
									<input
										className="form-input"
										type="text"
										id="soDt"
										name="soDt"
										value={valueFormState.soDt}
										onChange={handleChangeInput}
										placeholder="099999XXXX"

									/>
									{/* {errorFormState.soDt.length > 0 && (
										<small className="input-error">
											{errorFormState.soDt}
										</small>
									)} */}
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={24} >
								<div className="form-groups" style={{ width: "95%" }}>
									<label htmlFor="codeCustomer" className="form-label"> Loại người dùng </label>
									<Select
										showSearch
										style={{ width: "100%" }}
										placeholder="Select a person"
										id="codeCustomer"
										optionFilterProp="children"
										// onChange={onChangeSelectLoaiKhach}
										defaultValue={valueFormState.maLoaiNguoiDung === "KhachHang" ? "KhachHang" : "QuanTri"}
									>
										{renderListOptionCategory()}
									</Select>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={24}>
								<div className="form-groups" style={{ width: "98%" }}>
									<label htmlFor="password" className="form-label"> Mật khẩu </label>
									<input
										className="form-input"
										type="text"
										id="password"
										name="password"
										value={valueFormState.matKhau}
										onChange={handleChangeInput}
									// placeholder="abc@gmail.com"

									/>
									{/* {errorFormState.password.length > 0 && (
										<small className="input-error">
											{errorFormState.password}
										</small>
									)} */}
								</div>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col md={12} className="text-center">
								<button
									className="d-inline-block w-100 bg-button-danger pt-1 pb-1"
									onClick={() => { setGetInfoByClickState({ display: false, info: {} }) }}
								>
									Hủy
								</button>
							</Col>
							<Col md={12} className="text-center">
								<button
									className="d-inline-block w-100 bg-button pt-1 pb-1"
									onClick={() => { putUserAdminTask({ valueFormState: valueFormState }) }}
								>
									OK</button>
							</Col>
						</Row>
					</div>
				</div>
			)}
			<div className="wrapper-manage-user">
				<div className="manager-user-header bg-white">
					<h3>Manage User</h3>
					<button
						className="d-inline-block bg-button"
						onClick={() => {
							history.push("/manage-user/add-user")
						}}
					>
						Thêm khách hàng
					</button>
				</div>
				<div className="wrapper-action">
					<Row>
						<Col md={14}>
						</Col>
						<Col md={10}>
							<div className="wrapper-field-input">
								<div className="content-input">
									<input
										className="form-input"
										placeholder="Tìm kiếm theo tên"
										onChange={(e) => handleChangeSearch(e)}
										onKeyDown={(e) => handleKeyDown(e)}
									/>
									<div className="icon-search">
										<i
											className="fa fa-search"
											onClick={() => { valueSearch.length > 0 && getListUserAdminByNameTask({ valueSearch: valueSearch }) }}
										>
										</i>
									</div>
								</div>

								<button
									className="d-inline-block bg-button-danger"
									onClick={() => {
										getListUserAdminTask()
									}}
								>
									Hủy
								</button>
							</div>
						</Col>
					</Row>

				</div>
				<div className="wrapper-table">
					<Table dataSource={renderListUser()} columns={columns} loading={listUser.load} />
				</div>
			</div>
		</>
	)
}
const mapStateToProps = (state) => {
	const { listUser, listCategoryUser } = state.manageUserReducer;
	return {
		listUser: listUser,
		listCategoryUser: listCategoryUser
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getListUserAdminTask: () => dispatch(getListUserAdminAction()),
		getListCategoryUserAdminTask: () => dispatch(getListCategoryUserAdminAction()),
		getListUserAdminByNameTask: (params) => dispatch(getListUserAdminByNameAction(params)),
		putUserAdminTask: (params) => dispatch(putUserAdminAction(params)),
		deleteUserAdminTask: (params) => dispatch(deleteUserAdminAction(params))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);

