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

	function getTodoIndexFromId(todoId) {
		var out
		for (var i in todoList) {
			var todo = todoList[i]
			console.log('i: ', i)
			console.log('todo: ', todo)
			if (todo.id === todoId) {
				out = i
				break
			}
		}
		console.log('i: ', out)
		return out
	}

	this.generateId = function(digits=15) {
		var id = ''
		for(var i = 0; i < digits; i++) {
			id += String(Math.floor(Math.random() * 9))
		}
		return id
	}

	// Clear todos function for debugging
	this.clearFirstTodo = function (callback) {
		console.log('Attempting to clear first TODO')
		$.ajax({
			method: 'DELETE',
			url: baseUrl + `/0`,
		})
			.then(function (res) {
				console.log(res)
				console.log('DELETE successful.')
				callback()
			})
			.fail(logError)
	}

	this.getTodoCount = function() {
		return todoList.length
	}

	this.getTodos = function (draw) {
		$.get(baseUrl)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				console.log('response to getTodo: ', res)
				if (res.length > 0) {
					console.log(typeof res[0].completed)
				}
				todoList = res
				console.log('todoList: ', todoList, ' length: ', todoList.length)
				if (res.length > 0) {
					console.log(typeof todoList[0].completed)
				}
				draw(todoList)
			})
			.fail(logError)
	}

	this.addTodo = function (todo, callback) {
		console.log('todo: ', todo)
		console.log(typeof todo.completed)
		// WHAT IS THIS FOR???
		$.post(baseUrl, todo)
			.then(function (res) { // <-- WHAT DO YOU DO AFTER CREATING A NEW TODO?
				console.log('response to addTodo: ', res)
				console.log(typeof todo.completed)
				callback()
			})
			.fail(logError)
	}

	this.toggleTodoStatus = function (todoId, callback) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList
		var i = getTodoIndexFromId(todoId)
		var todo = todoList[i]
		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed
		console.log('before: ', todo.completed)
		todo.completed = !todo.completed
		console.log('after: ', todo.completed)
		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + i,
			data: JSON.stringify(todo)
		})
			.then(function (res) {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
				console.log('response to toggleTodoStatus: ', res)
				callback()
			})
			.fail(logError)
	}

	this.removeTodo = function (todoId, callback) {
		// Umm this one is on you to write.... It's also unique, like the ajax call above. The method is a DELETE
		var i = getTodoIndexFromId(todoId)

		$.ajax({
			method: 'DELETE',
			url: baseUrl + '/' + i,
		})
			.then(function (res) {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
				console.log('response to toggleTodoStatus: ', res)
				callback()
			})
			.fail(logError)
	}

}
