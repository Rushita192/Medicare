export const Authentication = {
	saveToken(authtoken) {
		localStorage.setItem('token', authtoken);
	},

	getToken() {
		const authtoken = localStorage.getItem('token');
		return authtoken;
	},

	saveRole(role) {
		localStorage.setItem('role', role);
	},

	getRole() {
		const role = localStorage.getItem('role');
		return role;
	},

	removeToken() {
		localStorage.clear();
		localStorage.removeItem('token');
	},
};
