import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from 'antd'
import history from "../../../utils/history";
import Header from "../Header/Header";

import "./Sidebar.css";

function Sidebar({ children }) {
	const [checkClickState, setCheckClickState] = useState(false)
	return (
		<>
			{checkClickState && (
				<div className="position-fixed-top-0-left-0 wrapper-model-edit bg-blur-gray ">
					<div className="content-model-edit bg-white">
						<h3> Thông báo </h3>
						<p>Bạn có muốn đăng xuất không ?</p>
						<Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
							<Col md={12} className="text-center">
								<button
									className="d-inline-block w-100 bg-button-danger pt-1 pb-1"
									onClick={() => { setCheckClickState(false) }}
								>
									Hủy
								</button>
							</Col>
							<Col md={12} className="text-center">
								<button
									className="d-inline-block w-100 bg-button pt-1 pb-1"
									onClick={() => {
										setCheckClickState(false)
										localStorage.removeItem('infoAdmin')
										history.push('/login')
									}}
								>
									OK</button>
							</Col>
						</Row>
					</div>
				</div>
			)}
			<Header />
			<div className="wrap-sidebar-admin">
				<div className="content-sidebar-left">
					<ul className="menu-sidebar">
						<li className="item-sidebar">
							<NavLink
								to="/dashboard"
								activeClassName="active-link-admin"
								className="link-sidebar"
							>
								<i className="fas fa-database"></i>
								<span className="item-name">Dashboard</span>
							</NavLink>
						</li>
						<li className="item-sidebar">
							<NavLink
								to="/manage-user"
								activeClassName="active-link-admin"
								className="link-sidebar"
							>
								<i className="fas fa-users"></i>
								<span className="item-name">Quản lý người dùng</span>

							</NavLink>
						</li>

						<li className="item-sidebar">
							<NavLink
								to="/manage-film"
								activeClassName="active-link-admin"
								className="link-sidebar"
							>

								<i className="fas fa-film"></i>
								<span className="item-name">Quản lý phim</span>

							</NavLink>
						</li>
						{/* <li className="item-sidebar">
							<NavLink
								to="/manage-cinema"
								activeClassName="active-link-admin"
								className="link-sidebar"
							>

								<i className="fas fa-calendar-alt"></i>
								<span className="item-name">Quản lý lịch chiếu</span>

							</NavLink>
						</li> */}

						<li
							className="item-sidebar item-sidebar-logout"
							onClick={() => {
								setCheckClickState(true)
							}}
						>
							<div className="link-sidebar">
								<i className="fas fa-sign-out-alt"></i>
								<span className="item-name">Đăng xuất</span>
							</div>
						</li>
					</ul>
				</div>
				<div className="content-sidebar-right">{children}</div>
			</div>
		</>
	);
}

export default Sidebar;
