export default {
	init() {
		getTodos.run();
	},
	updateTodo(id, update) {
		data.todos[id] = {...data.todos[id], ...update};
		updateTodoStatus.run();
	},
	editTodo(){
		data.activeTodo = undefined;
	},
	async updatePassword(){
		const password = getUser.data[0].password;
		
		// check password
		const passwordMatch = await dcodeIO.bcrypt.compare(inputOldPassword.text, password);
		if(passwordMatch) {
			// hash the new password
			const salt = await dcodeIO.bcrypt.genSalt(10);
			const hashedPassword = await dcodeIO.bcrypt.hash(inputNewPassword.text, salt);
			return updatePassword.run({newPassword: hashedPassword})
			.then(() => {showAlert('Password Changed', 'success')})
			.then(() => {navigateTo('Home')})
		} else {
			return showAlert('Old Passoword Dont Match', 'error')
		}
	},
	deleteAccount(){
		return deleteAllTodos.run({userId: appsmith.store.userId})
		.then(() => {deleteUser.run({userId: appsmith.store.userId})})
		.then(() => {showAlert("Accound Deleted", 'success')})
		.then(() => {navigateTo('Home')})
	},
	newTodo() {
    storeValue('newUserTodo', addInput.text);

    const dateF = moment(targetDatePicker.selectedDate).format('DD-MM-YYYY');
		console.log(dateF)

    return addTodo.run({ date: dateF})
        .then(() => emailNewTodo.run())
        .then(() => getTodos.run())
        .then(() => {
            addInput.setValue('');
        })
        .then(() => {
            showAlert("Todo Added", 'success');
        })
        .catch(error => {
            console.error("Error adding todo:", error);
            showAlert("Failed to add todo", 'error');
        });
	},
}