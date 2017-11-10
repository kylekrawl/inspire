function TodoService() {
	// A local copy of your todos
	var todoList = []
	var getterUrl = '//bcw-getter.herokuapp.com/?url=';
	var baseUrl = 'https://inspire-server.herokuapp.com/api/todos/kylekrawl';
	var url = getterUrl + encodeURIComponent(baseUrl)

	function logError(err) {
		console.error('Error: ', err)
		//CAN YOU NOTIFY THE USER IF SOMETHING BREAKS? 
		//do this without breaking the controller/service responsibilities
	}

	this.getTodos = function (draw) {
		$.get(baseUrl)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				console.log('response to getTodo: ', res)
				todoList = JSON.parse(res)
				console.log('todoList: ', todoList, ' length: ', todoList.length)
				draw(todoList)
			})
			.fail(logError)
	}

	//Clear all button for server debug
	this.clearAllTodos = function (callback) {
		$.ajax({
			method: 'DELETE',
			url: baseUrl
		})
			.then(function (res) {
				console.log(res)
				console.log('Deleted.')
				callback()
			})
			.fail(logError)
	}

	this.addTodo = function (todo, callback) {
		console.log('todo: ', todo)
		// WHAT IS THIS FOR???
		$.post(baseUrl, todo)
			.then(function (res) { // <-- WHAT DO YOU DO AFTER CREATING A NEW TODO?
				console.log('response to addTodo: ', res)
				callback()
			})
			.fail(logError)
	}

	this.toggleTodoStatus = function (todoId) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList

		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed

		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + todoId,
			data: JSON.stringify(YOURTODOVARIABLEHERE)
		})
			.then(function (res) {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
			})
			.fail(logError)
	}

	this.removeTodo = function () {
		// Umm this one is on you to write.... It's also unique, like the ajax call above. The method is a DELETE

	}

}
