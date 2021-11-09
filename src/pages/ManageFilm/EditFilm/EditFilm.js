import React, { useState } from 'react'
import { Col, DatePicker, Row } from 'antd';
import { Redirect, useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	postEditFilmAdminAction
} from '../../../redux/actions'
import './EditFilm.css'

function EditFilm({ postEditFilmAdminTask }) {
	let data = useLocation();
	const {
		biDanh,
		// danhGia,
		hinhAnh,
		// maNhom,
		maPhim,
		moTa,
		ngayKhoiChieu,
		tenPhim,
		trailer,
	} = data.state?.dataFilm
	const [valueFormState, setValueFormState] = useState({
		maPhim: maPhim,
		tenPhim: tenPhim,
		biDanh: biDanh,
		trailer: trailer,
		hinhAnh: hinhAnh,
		moTa: moTa,
		maNhom: "GP01",
		ngayKhoiChieu: ngayKhoiChieu,
		danhGia: 0
	})

	console.log("valueFormState: ", valueFormState)

	const [errorFormState, setErrorFormState] = useState({
		maPhim: 0,
		tenPhim: "",
		biDanh: "",
		trailer: "",
		hinhAnh: "",
		moTa: "",
		maNhom: "",
		ngayKhoiChieu: "",
		danhGia: 0
	})

	if (data.state === undefined) {
		return (
			< Redirect to="/manage-film" />
		)
	}

	function handleChangeInput(e) {
		const { name, value } = e.target;
		setValueFormState({
			...valueFormState,
			[name]: value,
		});
	}

	function onChange(value, dateString) {
		// console.log('Selected Time: ', value);
		// console.log('Formatted Selected Time: ', dateString);
		setValueFormState({
			...valueFormState,
			ngayKhoiChieu: dateString
		})
	}

	function onOk(value) {
		// console.log('onOk: ', value);
	}

	function handleSubmitEditFilm() {
		let isValue = true;

		const errorValue = {
			tenPhim: "",
			biDanh: "",
			trailer: "",
			hinhAnh: "",
			moTa: "",
			ngayKhoiChieu: "",
		};

		if (valueFormState.tenPhim === "") {
			isValue = false;
			errorValue.tenPhim = "Vui lòng nhập tên phim của bạn";
		} else {
			errorValue.tenPhim = "";
		}

		if (valueFormState.biDanh === "") {
			isValue = false;
			errorValue.biDanh = "Vui lòng nhập bí danh của bạn";
		}
		else {
			errorValue.biDanh = "";
		}

		if (valueFormState.trailer === "") {
			isValue = false;
			errorValue.trailer = "Vui lòng gắn link youtube của bạn";
		} else {
			errorValue.trailer = "";
		}

		if (valueFormState.hinhAnh === "") {
			isValue = false;
			errorValue.hinhAnh = "Vui lòng chọn hình ảnh trước khi thêm của bạn";
		} else {
			errorValue.hinhAnh = "";
		}

		if (valueFormState.moTa === "") {
			isValue = false;
			errorValue.moTa = "Vui lòng nhập mô tả bộ phim của bạn";
		} else {
			errorValue.moTa = "";
		}

		if (valueFormState.ngayKhoiChieu === "") {
			isValue = false;
			errorValue.ngayKhoiChieu = "Vui lòng chọn ngày khởi chiếu của bạn";
		} else {
			errorValue.ngayKhoiChieu = "";
		}

		if (isValue) {
			setErrorFormState({ ...errorValue });
			postEditFilmAdminTask(valueFormState);
		} else {
			setErrorFormState({ ...errorValue });
		}
	}


	return (
		<>
			<div className="wrapper-edit-film">
				<div className="add-film-header bg-white">
					<div className="wrapper-breadcrumb">
						<ul className="content-breadcrumb">
							<li>
								<Link to="/manage-film" > Manage Film </Link>
							</li>
							<li> {'>'} </li>
							<li>
								Edit Film
							</li>
						</ul>
					</div>
					<button
						className="d-inline-block bg-button btn-create-user"
						onClick={handleSubmitEditFilm}
					>
						Cập nhật phim
					</button>
				</div>
				<div className="edit-film-main bg-white">
					<Row gutter={[16, 16]}>
						<Col md={12}>
							<div className="form-groups" >
								<label htmlFor="tenPhim" className="form-label"> Tên phim </label>
								<input
									className="form-input"
									type="text"
									id="tenPhim"
									name="tenPhim"
									value={valueFormState.tenPhim}
									onChange={(e) => {
										// setValueImageState({
										// 	...valueImageState,
										// 	tenphim: e.target.value
										// })
										handleChangeInput(e)
									}}
									placeholder=""

								/>
								{errorFormState.tenPhim.length > 0 && (
									<small className="input-error">
										{errorFormState.tenPhim}
									</small>
								)}
							</div>
						</Col>
						<Col md={12}>
							<div className="form-groups" >
								<label htmlFor="biDanh" className="form-label"> Bí danh </label>
								<input
									className="form-input"
									type="text"
									id="biDanh"
									name="biDanh"
									value={valueFormState.biDanh}
									onChange={handleChangeInput}
									placeholder=""

								/>
								{errorFormState.biDanh.length > 0 && (
									<small className="input-error">
										{errorFormState.biDanh}
									</small>
								)}
							</div>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col md={12}>
							<div className="form-groups" >
								<label htmlFor="trailer" className="form-label"> Trailer </label>
								<input
									className="form-input"
									type="text"
									id="trailer"
									name="trailer"
									value={valueFormState.trailer}
									onChange={handleChangeInput}
									placeholder=""
								/>
								{errorFormState.trailer.length > 0 && (
									<small className="input-error">
										{errorFormState.trailer}
									</small>
								)}
							</div>
						</Col>
						<Col md={12}>
							<div className="form-groups" >
								<label htmlFor="ngayKhoiChieu" className="form-label"> Ngày khởi chiếu </label>
								<DatePicker
									showTime
									format={"DD/MM/YYYY"}
									id="ngayKhoiChieu"
									name="ngayKhoiChieu"
									onChange={onChange}
									onOk={onOk}
								/>
								{errorFormState.ngayKhoiChieu.length > 0 && (
									<small className="input-error">
										{errorFormState.ngayKhoiChieu}
									</small>
								)}
							</div>
						</Col>
					</Row>
					<Row>

						<Col md={12}>
							<div className="form-groups" >
								<label htmlFor="hinhAnh" className="form-label"> Link hình ảnh sau khi chọn ảnh </label>
								<input
									className="form-input"
									type="text"
									id="hinhAnh"
									name="hinhAnh"
									value={valueFormState.hinhAnh}
									onChange={handleChangeInput}
									placeholder=""
								/>
								{errorFormState.hinhAnh.length > 0 && (
									<small className="input-error">
										{errorFormState.hinhAnh}
									</small>
								)}
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							<div className="form-groups" >
								<label htmlFor="moTa" className="form-label"> Mô tả </label>
								<textarea
									style={{ height: "130px" }}
									className="form-input"
									id="moTa"
									name="moTa"
									value={valueFormState.moTa}
									onChange={handleChangeInput}
									placeholder="Hãy viết gì đó ..."
								/>
								{errorFormState.moTa.length > 0 && (
									<small className="input-error">
										{errorFormState.moTa}
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

const mapDispatchToProps = (dispatch) => {
	return {
		postEditFilmAdminTask: (params) => dispatch(postEditFilmAdminAction(params)),
	};
};

export default connect(null, mapDispatchToProps)(EditFilm)
