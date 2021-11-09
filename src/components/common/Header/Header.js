import React from 'react'
import { connect } from "react-redux";
// import history from '../../../utils/history'
import "./Header.css";
function Header({ infoAdmin }) {
	const { hoTen } = infoAdmin.data
	return (
		<div className="wrapper-header-admin">
			<div className="content-header-left">
				{/* <h1>CD DEV</h1> */}
				<div className="sign">
					<span className="flicker1">Ci</span>
					<span className="flicker2">ne</span>
					<span className="flicker3">ma</span>
				</div>
			</div>
			<div className="content-header-right">
				<div
					className="content-header-name"
				// onClick={() => { history.push('/profile') }}
				>
					<p>{hoTen}</p>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	const { infoAdmin } = state.authAdminReducer;
	return {
		infoAdmin: infoAdmin,
	};
};

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getListFilmAdminTask: () => dispatch(getListFilmAdminAction()),
// 		getListFilmAdminByDateTask: (params) => dispatch(getListFilmAdminByDateAction(params)),
// 		deleteFilmAdminTask: (params) => dispatch(deleteFilmAdminAction(params)),
// 	};
// };

export default connect(mapStateToProps, null)(Header);
