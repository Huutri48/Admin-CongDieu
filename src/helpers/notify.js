import { notification } from 'antd';
export const openNotificationWithIcon = (type, notify, duration) => {
	notification[type]({
		message: '',
		description: notify,
		duration: duration
	});
};