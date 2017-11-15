function TodoController() {
	// new up the TodoService that has already been configured for your use
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again
	var todoService = new TodoService()

	// Id-independent clear button for server debug
	this.clearFirstTodo =  function() {
		todoService.clearFirstTodo(getTodos)
	}

	// Use this getTodos function as your callback for all other edits
	function getTodos(){
		//FYI DONT EDIT ME :)
		todoService.getTodos(drawTodos)
	}

	function updateTodoCount() {
		document.getElementById('todo-count').innerText = todoService.getTodoCount()
		document.getElementById('completed-count').innerText = todoService.getCompletedTodoCount()
	}

	function drawTodos(todos) {
		//WHAT IS MY PURPOSE?
		//BUILD YOUR TODO TEMPLATE HERE
		updateTodoCount()
		var elem = document.getElementById('todo')
		var template = ''
		var completedCount = 0
		//DONT FORGET TO LOOP
		for (var i in todos) {
			var todo = todos[i]
			todo.completed = [false, 'false'].includes(todo.completed) ? false : true // Temporary fix for string values for todo.completed when first adding list item
			var statusClass = todo.completed ? "completed-item" : ""
			var toggleButtonIcon = todo.completed ? '<i class="fa fa-check-square fa-2x" aria-hidden="true"></i>' :
													'<i class="fa fa-square fa-2x" aria-hidden="true"></i>'
			
			template += `
						<div class="flex v-center h-space-between">
							<div class="flex text-wrap">
								<p class="${statusClass}"><span id="todo-${todo.id}"><span></p>
							</div>
							<div class="flex v-center h-center">
								<button class="btn btn-alt btn-main" onclick="app.controllers.todoController.toggleTodoStatus('${todo.id}')">${toggleButtonIcon}</button>
								<button class="btn btn-alt btn-delete" onclick="app.controllers.todoController.removeTodo('${todo.id}')"><i class="fa fa-minus-square fa-2x" aria-hidden="true"></i></button>
							</div>
						</div>
						`
		}
		elem.innerHTML = template

		// Input Sanitization:
		
		for (var i in todos) {
			var todo = todos[i]
			document.getElementById(`todo-${todo.id}`).innerText = `${todo.description}`
		}
		console.log('todoList after draw: ', todos)
		
	}

	this.addTodoFromForm = function (event) {
		event.preventDefault() // <-- hey this time its a freebie don't forget this
		console.log('Todo form submitted.')
		// TAKE THE INFORMATION FORM THE FORM
		var form = event.target
		var todo = {
			// DONT FORGET TO BUILD YOUR TODO OBJECT
			id: todoService.generateId(),
			description: form.description.value,
			completed: false
		}
		console.log('Todo to add: ', todo)
		//PASSES THE NEW TODO TO YOUR SERVICE
		//DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
		//YOU SHOULDN'T NEED TO CHANGE THIS
		form.description.value = "" // Clear text input
		todoService.addTodo(todo, getTodos)
		                         //^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT
	}

	this.toggleTodoStatus = function (todoId) {
		// asks the service to edit the todo status
		todoService.toggleTodoStatus(todoId, getTodos)
		// YEP THATS IT FOR ME
	}

	this.removeTodo = function (todoId) {
		// ask the service to run the remove todo with this id
		todoService.removeTodo(todoId, getTodos)
		// ^^^^ THIS LINE OF CODE PROBABLY LOOKS VERY SIMILAR TO THE toggleTodoStatus
	}

	// IF YOU WANT YOUR TODO LIST TO DRAW WHEN THE PAGE FIRST LOADS WHAT SHOULD YOU CALL HERE???
	getTodos()
	//Debug:
	//this.clearFirstTodo()
}
