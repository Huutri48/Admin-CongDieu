import React, { useEffect } from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux';
import { getListInfoSystemCinemaAdminAction } from '../../redux/actions';
import './ManageCinema.css'
function ManageCinema({ listInfoSystemCinema, getListInfoSystemCinemaAdminTask }) {

	useEffect(() => {
		getListInfoSystemCinemaAdminTask()
	}, [getListInfoSystemCinemaAdminTask])

	const columns = [
		{
			title: '#',
			dataIndex: 'STT',
			key: 'STT',
		},
		{
			title: 'Mã Hệ thống rạp',
			dataIndex: 'maHeThongRap',
			key: 'maHeThongRap',
		},
		{
			title: 'Tên Hệ thống rạp',
			dataIndex: 'tenHeThongRap',
			key: 'tenHeThongRap',
		},
		{
			title: 'Bí danh',
			dataIndex: 'biDanh',
			key: 'biDanh',
		},
		{
			title: 'Logo',
			dataIndex: 'logo',
			key: 'logo',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
		},
	];

	return (
		<>
			<div className="wrapper-cinema">
				<div className="manager-cinema-header bg-white">
					<h3>Manage Film</h3>
					{/* <button
						className="d-inline-block bg-button"
						onClick={() => history.push('/manage-film/add-film')}
					>Thêm film</button> */}
				</div>
				<div className="wrapper-table">
					<Table
						dataSource={[]}
						columns={columns}
					// loading={listUser.load} 
					/>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	const { listInfoSystemCinema } = state.manageCinemaReducer;
	return {
		listInfoSystemCinema: listInfoSystemCinema,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getListInfoSystemCinemaAdminTask: () => dispatch(getListInfoSystemCinemaAdminAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCinema);

