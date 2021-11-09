export default function authHeaderAdmin() {
	const user = JSON.parse(localStorage.getItem('infoAdmin'));
	if (user && user.accessToken) {
		return {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': true,
			Authorization: 'Bearer ' + user.accessToken
		}
	} else {
		return {}
	}
}