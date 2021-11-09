import React from 'react'
import { Redirect, Route } from 'react-router';
import Sidebar from './components/common/Sidebar/Sidebar';

function SidebarLayoutRoute({
	infoAdmin,
	contentSidebar,
	component: Component,
	...rest
}) {
	const infoAdminLocal = JSON.parse(localStorage.getItem("infoAdmin"));
	return (
		<Route
			{...rest}
			render={(matchProps) => {
				if (!infoAdminLocal) {
					sessionStorage.removeItem("infoAdmin");
					return <Redirect to="/login" />;
				} else {
					return (
						<Sidebar>
							<Component {...matchProps} />
						</Sidebar>
					);
				}
			}}
		/>
	);
}

export default SidebarLayoutRoute
