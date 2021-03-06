import React, { useState } from 'react'
import { Col, Row, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { postAddFilmAdminAction } from '../../../redux/actions'
// import axios from 'axios';
// import { URL, URL_API } from '../../../constants';
import './AddFilm.css'
// import { openNotificationWithIcon } from '../../../helpers';

function AddFilm({ postAddFilmAdminTask }) {

	const [valueFormState, setValueFormState] = useState({
		maPhim: 0,
		tenPhim: "",
		biDanh: "",
		trailer: "",
		hinhAnh: "https://movie0706.cybersoft.edu.vn/hinhanh/1_gp01.jpg",
		moTa: "",
		maNhom: "GP01",
		ngayKhoiChieu: "",
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

	function handleChangeInput(e) {
		const { name, value } = e.target;
		setValueFormState({
			...valueFormState,
			[name]: value,
		});
	}

	function onChange(value, dateString) {
		// console.log('Selected Time: ', value);
		console.log('Formatted Selected Time: ', dateString);
		setValueFormState({
			...valueFormState,
			ngayKhoiChieu: dateString
		})
	}

	function onOk(value) {
		// console.log('onOk: ', value);
	}

	const [valueImageState, setValueImageState] = useState({
		File: "",
		tenFile: valueFormState.tenPhim,
		tenphim: "",
		manhom: "GP01"
	})

	console.log("valueImageState: ", valueImageState)

	// function handleChangeImage(e) {
	// 	console.log("chonhinhAnh: ", e.target.files[0])
	// 	setValueImageState({

	// 		File: e.target.files[0],
	// 		tenFile: e.target.files[0].name,
	// 		tenphim: valueFormState.tenPhim,
	// 		manhom: "GP01"
	// 	})
	// }

	function handleSubmitAddFilm() {
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
			errorValue.tenPhim = "Vui l??ng nh???p t??n phim c???a b???n";
		} else {
			errorValue.tenPhim = "";
		}

		if (valueFormState.biDanh === "") {
			isValue = false;
			errorValue.biDanh = "Vui l??ng nh???p b?? danh c???a b???n";
		}
		else {
			errorValue.biDanh = "";
		}

		if (valueFormState.trailer === "") {
			isValue = false;
			errorValue.trailer = "Vui l??ng g???n link youtube c???a b???n";
		} else {
			errorValue.trailer = "";
		}

		if (valueFormState.hinhAnh === "") {
			isValue = false;
			errorValue.hinhAnh = "Vui l??ng ch???n h??nh ???nh tr?????c khi th??m c???a b???n";
		} else {
			errorValue.hinhAnh = "";
		}

		if (valueFormState.moTa === "") {
			isValue = false;
			errorValue.moTa = "Vui l??ng nh???p m?? t??? b??? phim c???a b???n";
		} else {
			errorValue.moTa = "";
		}

		if (valueFormState.ngayKhoiChieu === "") {
			isValue = false;
			errorValue.ngayKhoiChieu = "Vui l??ng ch???n ng??y kh???i chi???u c???a b???n";
		} else {
			errorValue.ngayKhoiChieu = "";
		}

		if (isValue) {
			setErrorFormState({ ...errorValue });
			postAddFilmAdminTask(valueFormState);
		} else {
			setErrorFormState({ ...errorValue });
		}
	}

	return (
		<>
			<div className="wrapper-add-film">
				<div className="add-film-header bg-white">
					<div className="wrapper-breadcrumb">
						<ul className="content-breadcrumb">
							<li>
								<Link to="/manage-film" > Manage Film </Link>
							</li>
							<li> {'>'} </li>
							<li>
								Add User
							</li>
						</ul>
					</div>
					<button
						className="d-inline-block bg-button btn-create-user"
						onClick={handleSubmitAddFilm}
					>
						T???o phim
					</button>
				</div>
				<div className="add-film-main bg-white">
					<Row gutter={[16, 16]}>
						<Col md={12}>
							<div className="form-groups" >
								<label htmlFor="tenPhim" className="form-label"> T??n phim </label>
								<input
									className="form-input"
									type="text"
									id="tenPhim"
									name="tenPhim"
									value={valueFormState.tenPhim}
									onChange={(e) => {
										setValueImageState({
											...valueImageState,
											tenphim: e.target.value
										})
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
								<label htmlFor="biDanh" className="form-label"> B?? danh </label>
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
								<label htmlFor="ngayKhoiChieu" className="form-label"> Ng??y kh???i chi???u </label>
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
						{/* <Col md={12}>
							<div className="form-groups" >
								<label htmlFor="chonhinhAnh" className="form-label">Ch???n h??nh ???nh </label>
								<input
									// className="form-input"
									type="file"
									id="chonhinhAnh"
									onChange={handleChangeImage}
								/>
								<button className="bg-button pt-1 pb-1" onClick={() => {
									if (valueImageState.tenFile.length > 0) {
										let data = new FormData();
										data.append('FILE', valueImageState.File, valueImageState.tenFile);
										data.append('tenphim', valueImageState.tenphim);
										data.append('manhom', valueImageState.manhom);
										axios.post(URL + URL_API.API_UPLOAD_IMAGE_FILM, data)
											.then(res => {
												console.log("res: " + JSON.stringify(res));
											})
											.catch(err => {
												openNotificationWithIcon('error', err?.response?.data, 10)
											})
									}
								}} >G???i</button>
								{errorFormState.hinhAnh.length > 0 && (
									<small className="input-error">
										{errorFormState.hinhAnh}
									</small>
								)}
							</div>
						</Col> */}
						<Col md={12}>
							<div className="form-groups" >
								<label htmlFor="hinhAnh" className="form-label"> Link h??nh ???nh sau khi ch???n ???nh </label>
								<input
									className="form-input"
									type="text"
									id="hinhAnh"
									name="hinhAnh"
									value={valueFormState.hinhAnh}
									onChange={handleChangeInput}
									disabled
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
								<label htmlFor="moTa" className="form-label"> M?? t??? </label>
								<textarea
									style={{ height: "130px" }}
									className="form-input"
									id="moTa"
									name="moTa"
									value={valueFormState.moTa}
									onChange={handleChangeInput}
									placeholder="H??y vi???t g?? ???? ..."
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
		postAddFilmAdminTask: (params) => dispatch(postAddFilmAdminAction(params)),
	};
};

export default connect(null, mapDispatchToProps)(AddFilm)