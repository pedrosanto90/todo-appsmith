export default {

	async hashPassword() {
			const userExist = await get_user.run({username:create_acc_username.text}) 
			const emailExist = await get_email.run({ email:create_acc_email.text})

				if (userExist.length > 0){
					showAlert('User Already Exist', 'error')
					return;
				} 
				else if(emailExist.length > 0) { 
					showAlert('Email Already Exist', 'error')
					return;
				}
				else {
					const salt = await dcodeIO.bcrypt.genSalt(10);
					const hashedPassword = await dcodeIO.bcrypt.hash(create_acc_password.text, salt);

					return await create_user.run({ passwd: hashedPassword })
					.then(() => emailNewAccount.run())
					.then(() => {showAlert('Account Created', 'success')})
					.then(() => {closeModal(create_account.name)})
				}
  },
	async login() {
		storeValue('user_id', Login.data.user_id)
		storeValue('userEmail', Login.data.userEmail)
		storeValue('userName', Login.data.name)
		storeValue('lastName', Login.data.last_name)
		storeValue('jwt_token', Login.data.access_token)
		return Login.run()
		.then(() => {closeModal(login.name)})
		.then(() => {navigateTo('Todos')})
		.then(() => {showAlert('Logged', 'success')})
	}
}