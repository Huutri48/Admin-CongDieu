import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import { connect } from "react-redux";
import { Table } from 'antd';
import { Link } from 'react-router-dom'
import {
	getListFilmAdminAction,
	getListFilmAdminByDateAction,
	deleteFilmAdminAction,
} from "../../redux/actions"
import { DatePicker } from 'antd';
import "./ManageFilm.css"
import history from '../../utils/history';
import axios from 'axios';
import { URL, URL_API } from '../../constants';
import { openNotificationWithIcon } from '../../helpers';

const { RangePicker } = DatePicker;

function ManageFilm({ listFilm, getListFilmAdminTask, getListFilmAdminByDateTask, deleteFilmAdminTask }) {

	const [listFilmState, setListFilmState] = useState(listFilm.data)
	const [valueDateState, setValueDateState] = useState({
		tuNgay: '',
		denNgay: ''
	})

	useEffect(() => {
		getListFilmAdminTask();

	}, [getListFilmAdminTask]);

	useEffect(() => {
		setListFilmState(listFilm.data)
	}, [listFilm]);

	const columns = [
		{
			title: '#',
			dataIndex: 'STT',
			key: 'STT',
		},
		{
			title: 'Tên phim',
			dataIndex: 'tenPhim',
			key: 'tenPhim',
		},
		{
			title: 'Bí danh',
			dataIndex: 'biDanh',
			key: 'biDanh',
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'hinhAnh',
			key: 'hinhAnh',
		},
		{
			title: 'Ngày khởi chiếu',
			dataIndex: 'ngayKhoiChieu',
			key: 'ngayKhoiChieu',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			width: '180px',
		},
	];

	const [getInfoByClickState, setGetInfoByClickState] = useState({
		display: false,
		info: {}
	})

	function renderListFilm() {
		return listFilmState.map((item, index) => {
			return {
				key: index,
				STT: index + 1,
				tenPhim: item.tenPhim,
				biDanh: item.biDanh,
				hinhAnh: (
					<div className="manage-film-item-image">
						<img src={item.hinhAnh} alt={item.tenPhim} />
					</div>
				),
				ngayKhoiChieu: item.ngayKhoiChieu,
				action: (
					<>
						<div className="action-manage-film-top">

							<Link to={{
								pathname: "/manage-film/edit-film",
								state: { dataFilm: item }
							}}>
								<button
									className="d-inline-block bg-edit"
									title="Chỉnh sữa"
								// style={{ marginRight: "12px" }}

								>
									<i className="far fa-edit"></i>
								</button>
							</Link>

							<button
								className="d-inline-block bg-delete"
								title="Xóa"
								onClick={() => { deleteFilmAdminTask({ MaPhim: item.maPhim }) }}
							>
								<i className="far fa-trash"></i>
							</button>
							<button
								className="d-inline-block bt-upload"
								title="Upload"
								onClick={() => {
									setGetInfoByClickState({
										display: true,
										info: { item }
									})
									setValueChangeImage({
										...valueChangeImage,
										tenphim: item.tenPhim
									})
								}}
							>
								<i className="far fa-upload"></i>
							</button>
						</div>
						<div className="action-manage-film-bottom">
							<Link to={'/manage-film/info-about-movie-showtime/' + item.maPhim}>
								<button className="w-100"> Thông tin lịch chiếu </button>
							</Link>
						</div>

					</>
				)
			}
		})
	}

	const [valueChangeImage, setValueChangeImage] = useState({
		File: "",
		tenfile: "",
		tenphim: "",
		manhom: "GP01"
	});

	function handleChangeImage(e) {
		setValueChangeImage({
			...valueChangeImage,
			File: e.target.files[0],
			tenfile: e.target.files[0].name
		})
	}

	function handleDatePickerChange(date, dateString) {
		setValueDateState({
			tuNgay: dateString[0],
			denNgay: dateString[1]
		})
	}

	return (
		<>
			{getInfoByClickState.display && (

				<div className="position-fixed-top-0-left-0 wrapper-model-edit bg-blur-gray ">
					<div className="content-model-edit bg-white">
						<h3> Thay đổi hình ảnh của phim </h3>
						<Row>
							<Col md={24}>
								<div className="form-groups" style={{ width: "95%" }}>
									<label htmlFor="chonhinhanh" className="form-label"> Hình ảnh </label>
									<input
										className="form-input"
										type="file"
										id="chonhinhanh"
										onChange={handleChangeImage}
										placeholder=""
									/>
									{/* {errorFormState.chonhinhanh.length > 0 && (
										<small className="input-error">
											{errorFormState.chonhinhanh}
										</small>
									)} */}
								</div>
							</Col>
						</Row>
						<Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
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
									onClick={() => {
										if (valueChangeImage.tenfile.length > 0) {
											let data = new FormData();
											console.log("alo: ", valueChangeImage.File, valueChangeImage.tenfile, valueChangeImage.tenphim, valueChangeImage.manhom)
											data.append('File', valueChangeImage.File, valueChangeImage.tenfile);
											//  data.append('tenfile', valueChangeImage.tenfile)
											data.append('tenphim', valueChangeImage.tenphim);
											data.append('manhom', valueChangeImage.manhom);
											axios.post(URL + URL_API.API_UPLOAD_IMAGE_FILM, data, {
												headers: {
													"Content-Type": "multipart/form-data",
												},
											})
												.then(res => {
													setValueChangeImage({
														dispatch: false,
														File: "",
														tenfile: "",
														tenphim: "",
														manhom: "GP01"
													})
													// openNotificationWithIcon('success', res.data, 10)
													setGetInfoByClickState({ display: false, info: {} })
													// window.location.reload();
												})
												.catch(err => {
													openNotificationWithIcon('error', err?.response?.data, 10)
												})
										}
									}}
								>
									OK</button>
							</Col>
						</Row>
					</div>
				</div>
			)}
			<div className="wrapper-manage-user">
				<div className="manager-user-header bg-white">
					<h3>Manage Film</h3>
					<button
						className="d-inline-block bg-button"
						onClick={() => history.push('/manage-film/add-film')}
					>Thêm film</button>
				</div>
				<div className="wrapper-action">
					<Row>
						<Col md={14}>
						</Col>
						<Col md={10}>
							<div className="wrapper-field-input">
								<RangePicker
									format={"DD/MM/YYYY"}
									onChange={(date, dateString) => handleDatePickerChange(date, dateString)}
								/>
								<button
									className="d-inline-block bg-button"
									style={{ margin: "0 12px" }}
									onClick={() => { getListFilmAdminByDateTask({ valueDateState: valueDateState }) }}
								>
									<i className="fas fa-sync-alt"></i>
								</button>
								<button
									className="d-inline-block bg-button-danger"
									onClick={getListFilmAdminTask}
								>Hủy</button>
							</div>
						</Col>
					</Row>

				</div>
				<div className="wrapper-table">
					<Table dataSource={renderListFilm()} columns={columns} loading={listFilm.load} />
				</div>
			</div>
		</ >
	)
}

const mapStateToProps = (state) => {
	const { listFilm } = state.manageFilmReducer;
	return {
		listFilm: listFilm,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getListFilmAdminTask: () => dispatch(getListFilmAdminAction()),
		getListFilmAdminByDateTask: (params) => dispatch(getListFilmAdminByDateAction(params)),
		deleteFilmAdminTask: (params) => dispatch(deleteFilmAdminAction(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageFilm);
