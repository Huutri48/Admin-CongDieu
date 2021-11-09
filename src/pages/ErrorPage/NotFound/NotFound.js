import { Button, Result } from 'antd'
import React from 'react'
import history from '../../../utils/history';

function NotFound() {
	const infoAdminLocal = JSON.parse(localStorage.getItem("infoAdmin"));
	return (
		<>
			<Result
				status="404"
				title="404"
				subTitle="Xin lỗi, trang này không tồn tại"
				extra={(infoAdminLocal && infoAdminLocal.accessToken !== "")
					? <Button type="primary" onClick={() => history.push('/dashboard')}>Quay về trang chủ</Button>
					: <Button type="primary" onClick={() => history.push('/login')}>Quay về trang chủ</Button>
				}
			/>
		</>
	)
}

export default NotFound
