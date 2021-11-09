import React, { useState, useEffect } from 'react'
import { Col, DatePicker, Row, Spin, Table, Select } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getInfoMovieShowtimeAdminAction, postAddShowTimesAction } from '../../../redux/actions'
import './InfoMovieShowtimes.css'
import { convertLinkYoutubeToEmbed } from '../../../helpers';
const { Option } = Select;
function InfoMovieShowtimes({ match, listInfoMovieShowtime, getInfoMovieShowtimeAdminTask, postAddShowTimesTask }) {
	const MaPhim = match.params?.maPhim;

	console.log("listInfoMovieShowtime: ", listInfoMovieShowtime.data)

	const [listInfoMovieShowtimeState, setListInfoMovieShowtimeState] = useState(listInfoMovieShowtime.data);

	const {
		biDanh,
		// danhGia,
		heThongRapChieu,
		hinhAnh,
		// maNhom,
		maPhim,
		moTa,
		ngayKhoiChieu,
		tenPhim,
		trailer,
	} = listInfoMovieShowtimeState;

	useEffect(() => {
		getInfoMovieShowtimeAdminTask({ MaPhim: MaPhim })
	}, [getInfoMovieShowtimeAdminTask, MaPhim])

	useEffect(() => {
		setListInfoMovieShowtimeState(listInfoMovieShowtime.data)
	}, [listInfoMovieShowtime])


	const [checkClickAddLichChieuPhim, setCheckClickAddLichChieuPhim] = useState(false)


	const [addLichChieuPhim, setAddLichChieuPhim] = useState({
		maPhim: MaPhim,
		ngayChieuGioChieu: "",
		maRap: 0,
		giaVe: 0
	})

	function onChangeSelectMaRap(value) {
		setAddLichChieuPhim({
			...addLichChieuPhim,
			maRap: value
		})
	}

	function handleChangeInput(e) {
		const { name, value } = e.target;
		setAddLichChieuPhim({
			...addLichChieuPhim,
			[name]: value,
		});
	}

	function onChange(value, dateString) {
		// console.log('Selected Time: ', value);
		// console.log('Formatted Selected Time: ', dateString);
		setAddLichChieuPhim({
			...addLichChieuPhim,
			ngayChieuGioChieu: dateString
		})
	}

	function onOk(value) {
		// console.log('onOk: ', value);
	}



	const columnSystemCinema = [
		{
			title: '#',
			dataIndex: 'STT',
			key: 'STT',
		},
		{
			title: 'Mã hệ thống rạp',
			dataIndex: 'maHeThongRap',
			key: 'maHeThongRap',
		},
		{
			title: 'Tên hệ thống rạp',
			dataIndex: 'tenHeThongRap',
			key: 'tenHeThongRap',
		},
		{
			title: 'Logo',
			dataIndex: 'logo',
			key: 'logo',
		},
	]

	const columnChildCinema = [
		{
			title: '#',
			dataIndex: 'STT',
			key: 'STT',
		},
		{
			title: 'Mã cụm rạp',
			dataIndex: 'maCumRap',
			key: 'maCumRap',
		},
		{
			title: 'Tên cụm rạp',
			dataIndex: 'tenCumRap',
			key: 'tenCumRap',
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'hinhanh',
			key: 'hinhanh',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
		}
	]

	const [lichChieuPhimState, setLichChieuPhimState] = useState({
		display: false,
		content: []
	})

	function renderListCinemaSystem() {
		return heThongRapChieu?.map((itemSystemCinema, indexSystemCinema) => {
			return {
				key: indexSystemCinema,
				STT: indexSystemCinema + 1,
				maHeThongRap: itemSystemCinema.maHeThongRap,
				tenHeThongRap: itemSystemCinema.tenHeThongRap,
				logo: (
					<div className="wrapper-info-movie-item-image">
						<img src={itemSystemCinema.logo} alt={itemSystemCinema.tenHeThongRap} />
					</div>
				),
				childCinema: itemSystemCinema?.cumRapChieu?.map((itemChildCinema, indexChildCinema) => {
					return {
						key: indexChildCinema,
						STT: indexChildCinema + 1,
						maCumRap: itemChildCinema.maCumRap,
						tenCumRap: itemChildCinema.tenCumRap,
						hinhanh: (
							<div className="wrapper-info-movie-item-image">
								<img src={itemChildCinema.hinhanh} alt={itemChildCinema.tenCumRap} />
							</div>
						),

						action: (
							<div>
								<button
									className="d-inline-block bg-button pt-1 pb-1"
									onClick={() => {
										setLichChieuPhimState({
											display: true,
											content: itemChildCinema.lichChieuPhim
										})
									}}
								>
									Xem lịch chiếu phim
								</button>
							</div>
						)
					}
				})
			}
		})

	}

	const columnFilm = [
		{
			title: '#',
			dataIndex: 'STT',
			key: 'STT',
		},
		{
			title: 'Mã rạp',
			dataIndex: 'maRap',
			key: 'maRap',
		},
		{
			title: 'Tên rạp',
			dataIndex: 'tenRap',
			key: 'tenRap',
		},
		{
			title: 'Mã lịch chiếu',
			dataIndex: 'maLichChieu',
			key: 'maLichChieu',
		},
		{
			title: 'Ngày lịch chiếu',
			dataIndex: 'ngayChieuGioChieu',
			key: 'ngayChieuGioChieu',
		},
		{
			title: 'Thời lượng (phút)',
			dataIndex: 'thoiLuong',
			key: 'thoiLuong',
		},
		{
			title: 'Giá vé (VND)',
			dataIndex: 'giaVe',
			key: 'giaVe',
		}
	]



	function renderListLichChieuPhim() {
		return lichChieuPhimState.content.map((item, index) => {
			return {
				key: index,
				STT: index + 1,
				maRap: item.maRap,
				tenRap: item.tenRap,
				maLichChieu: item.maLichChieu,
				ngayChieuGioChieu: item.ngayChieuGioChieu,
				thoiLuong: item.thoiLuong,
				giaVe: item.giaVe
			}
		})
	}

	function renderMaRap() {
		return lichChieuPhimState.content.map((item, index) => {
			return (
				<Option key={index} value={item.maRap}>{item.maRap}</Option>
			)
		})
	}


	return (
		<>
			{lichChieuPhimState.display && (

				<div className="position-fixed-top-0-left-0 wrapper-model-info-movie bg-blur-gray ">
					<div className="content-model-info-movie bg-white">
						<div className="model-info-movie-header">
							<h3>Thông tin lịch chiếu</h3>
							<button
								className="d-inline-block"
								onClick={() => {
									setLichChieuPhimState({
										display: false,
										content: []
									})
								}}
							>X</button>
						</div>
						<div style={{ marginBottom: "20px" }}>
							<button
								className="d-inline-block bg-button"
								style={{ padding: "6px 12px" }}
								onClick={() => {
									setCheckClickAddLichChieuPhim(true)

									setLichChieuPhimState({
										...lichChieuPhimState,
										display: false,

									})
								}}
							>
								Thêm lịch chiếu
							</button>
						</div>

						<Table
							dataSource={renderListLichChieuPhim()}
							columns={columnFilm}
						/>
					</div>
				</div>
			)}
			{checkClickAddLichChieuPhim && (
				<div className="position-fixed-top-0-left-0 wrapper-model-info-movie bg-blur-gray ">
					<div className="content-model-info-movie bg-white">
						<h1>Thêm lịch chiếu phim</h1>
						<div className="form-groups">
							<label htmlFor="codeRap" className="form-label"> Ngày khởi chiếu </label>
							<Select
								showSearch
								id="codeRap"
								style={{ width: 200 }}
								optionFilterProp="children"
								onChange={onChangeSelectMaRap}
								defaultValue="1111"
							>
								<Option value="1111">Chọn mã rạp</Option>
								{renderMaRap()}
							</Select>
						</div>
						<div className="form-groups" >
							<label htmlFor="ngayChieuGioChieu" className="form-label"> Ngày khởi chiếu </label>
							<DatePicker
								showTime
								format={"DD/MM/YYYY HH:mm:ss"}
								id="ngayChieuGioChieu"
								name="ngayChieuGioChieu"
								onChange={onChange}
								onOk={onOk}
							/>

							{/* {errorFormState.tenPhim.length > 0 && (
								<small className="input-error">
									{errorFormState.tenPhim}
								</small>
							)} */}
						</div>

						<div className="form-groups" >
							<label htmlFor="giaVe" className="form-label"> Giá vé </label>
							<input
								className="form-input"
								type="number"
								id="giaVe"
								name="giaVe"
								// value={addLichChieuPhim.giaVe}
								onChange={(e) => {
									handleChangeInput(e)
								}}
								placeholder=""
							/>
							{/* {errorFormState.tenPhim.length > 0 && (
								<small className="input-error">
									{errorFormState.tenPhim}
								</small>
							)} */}
						</div>
						<Row>
							<Col md={12}>
								<button className="bg-button-danger" onClick={() => setCheckClickAddLichChieuPhim(false)}>Hủy</button>
							</Col>
							<Col md={12}>
								<button
									className="bg-button"
									onClick={() => {
										postAddShowTimesTask(addLichChieuPhim)
									}}
								> Thêm</button>
							</Col>
						</Row>
					</div>

				</div>
			)
			}
			<div className="wrapper-info-movie">
				<div className="info-movie-header bg-white">
					<div className="wrapper-breadcrumb">
						<ul className="content-breadcrumb">
							<li>
								<Link to="/manage-film" > Manage Film </Link>
							</li>
							<li> {'>'} </li>
							<li>
								Info about movie showtime
							</li>
						</ul>
					</div>
					{/* <button
						className="d-inline-block bg-button btn-create-user"
						onClick={handleSubmitEditFilm}
					>
						Cập nhật phim
					</button> */}
				</div>
				<div className="info-movie-main bg-white">
					<h1>Thông tin bộ phim</h1>

					<Row>
						<Col md={12}>
							<p className="attr-film">Mã phim: <span>{maPhim}</span> </p>
						</Col>
						<Col md={12}>
							<p className="attr-film">Ngày khởi chiếu: <span>{ngayKhoiChieu}</span> </p>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<p className="attr-film">Tên phim: <span>{tenPhim}</span> </p>
						</Col>
						<Col md={12}>
							<p className="attr-film">Bí danh: <span>{biDanh}</span> </p>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							<p className="attr-film">Mô tả: <span>{moTa}</span> </p>
						</Col>

					</Row>
					<Row>
						<Col md={8}>
							<p className="attr-film">Hình ảnh </p>
							<div className="wrapper-info-movie-image">
								<img src={hinhAnh} alt={tenPhim} />
							</div>
						</Col>
						<Col md={16}>
							<p className="attr-film">Trailer</p>
							<Spin spinning={listInfoMovieShowtime.load}>
								<div className="wrapper-info-movie-iframe">
									<iframe title={tenPhim} src={convertLinkYoutubeToEmbed(trailer || "")} />
								</div>
							</Spin>

						</Col>

					</Row>

				</div>
				<div className="wrapper-table-info-movie bg-white">
					<h1>Thông tin rạp chiếu phim</h1>
					{/* <Table dataSource={[]} columns={columnSystemCinema} loading={listInfoMovieShowtime.load} /> */}
					<Table
						loading={listInfoMovieShowtime.load}
						columns={columnSystemCinema}
						expandable={{
							expandedRowRender: record => (
								<Table
									pagination={false}
									columns={columnChildCinema}
									dataSource={record.childCinema}
								/>
							),
						}}
						dataSource={renderListCinemaSystem()}
					/>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	const { listInfoMovieShowtime } = state.manageFilmReducer;
	return {
		listInfoMovieShowtime: listInfoMovieShowtime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getInfoMovieShowtimeAdminTask: (params) => dispatch(getInfoMovieShowtimeAdminAction(params)),
		postAddShowTimesTask: (params) => dispatch(postAddShowTimesAction(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoMovieShowtimes);
