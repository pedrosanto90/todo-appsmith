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
    try {
        const userData = await get_user.run({ username: login_username.text });
			
				if (!userData || userData.length === 0) {
							showAlert('User not found', 'error');
						return;
					}
			
				storeValue('userId', userData[0]._id)
				storeValue('userName', userData[0].name)
				storeValue('userLastName', userData[0].last_name)
				storeValue('userEmail', userData[0].email)

        const isMatch = await dcodeIO.bcrypt.compare(login_passwd.text, userData[0].password);

        if (isMatch) {
						closeModal(login.name);
						navigateTo('Todos', {}, 'SAME_WINDOW');
            showAlert('Login Ok', 'success');
        } else {
            showAlert('Incorrect username or password', 'error');
            return 1;
        }
    } catch (error) {
        console.error('Login Error:', error);
        showAlert('Something went wrong', 'error');
        return 1;
    }
	}
}