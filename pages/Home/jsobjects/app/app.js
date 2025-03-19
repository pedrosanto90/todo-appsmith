export default {

	async createAccount() {
					return await CreateUser.run()
					.then(() => emailNewAccount.run())
					.then(() => {showAlert('Account Created', 'success')})
					.then(() => {closeModal(create_account.name)})
  },
	async login() {
		await Login.run()
		storeValue('user_id', Login.data.user_id)
		storeValue('userEmail', Login.data.userEmail)
		storeValue('userName', Login.data.name)
		storeValue('lastName', Login.data.last_name)
		storeValue('jwt_token', Login.data.access_token)
		return closeModal(login.name)
		.then(() => {navigateTo('Todos')})
		.then(() => {showAlert('Logged', 'success')})
	}
}