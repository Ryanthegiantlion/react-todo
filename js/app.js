(function (window) {
	'use strict';

	var Todo = React.createClass({
		handleDestroy: function() {
			this.props.onDestroy(this.props);
		},
	  	render: function() {
		    return (
		      	<li className={this.props.isCompleted ? "completed":""} data-id={this.props.id}>
					<div className="view">
						<input className="toggle" type="checkbox" checked={this.props.isCompleted} />
						<label>{this.props.children}</label>
						<button className="destroy" onClick={this.handleDestroy}></button>
					</div>
					<input className="edit" value="Create a TodoMVC template" />
				</li>
		    );
	  }
	});

	var TodoList = React.createClass({
		handleDestroy: function(item) {
			console.log(item);
			this.props.onDestroy(item);
		},
	  	render: function() {
	  		var todoNodes = this.props.todos.map(function(todo) {
	  			return (
	  				<Todo key={todo.id} isCompleted={todo.isCompleted} onDestroy={this.handleDestroy} id={todo.id}>{todo.text}</Todo>
	  			)
	  		}.bind(this));
	    	return (
		      	<section className="main">
					<input className="toggle-all" type="checkbox" />
					<ul className="todo-list">
						{todoNodes}
					</ul>
				</section>
	    );
	  }
	});

	var Footer = React.createClass({
	  render: function() {
	    return (
			<footer className="footer">
				<span className="todo-count"><strong>0</strong> item left</span>
				<ul className="filters">
					<li>
						<a className="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<button className="clear-completed">Clear completed</button>
			</footer>
	      )
	  }
	});

	var Header = React.createClass({
		getInitialState: function() {
			return {text:""};
		},
		handleTodoAdd: function(e) {
			console.log('form todo add');
			var newTodo = { text: e.target.value, isCompleted: false };
			this.props.onTodoAdd(newTodo);
			this.setState({text:""});
		},
		handleChange: function(e) {
			console.log('la change');
			this.setState({text: e.target.value});
		},
		handleKeyPress: function(e) {
			console.log('la enter');
			if (e.key === 'Enter') {
	      		this.handleTodoAdd(e)
	      	}
		},
	 	render: function() {
	    	return (
	      		<header className="header">
				<h1>todos</h1>
				<input className="new-todo" placeholder="What needs to be done?" autofocus onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.text} />
				</header>
	    	);
	  	}
	});

	var TodoBox = React.createClass({
		getInitialState: function() {
			return { todos: [{id: 1, text:"Todo1", isCompleted: true}, {id: 2, text:"Todo2", isCompleted: false}] };
		},
		handleTodoAdd: function(newTodo) {
			console.log('box todo add');
			var currentTodos = this.state.todos;
			var lastId = currentTodos[currentTodos.length-1].id;
			var newTodos = currentTodos.concat([{ id: lastId+1, text: newTodo.text, isCompleted: newTodo.isCompleted }]);
			console.log(newTodos);
			this.setState({todos: newTodos});
		},
		handleDestroy: function(item) {
			var currentTodos = this.state.todos;
			var newTodos = currentTodos.filter(function(todo) { return todo.id != item.id });
			this.setState({ todos: newTodos });
		},
  		render: function() {
  			console.log('todo box render');
    		return (
    			<section className="todoapp">
	      			<Header onTodoAdd={this.handleTodoAdd} />
	      			<TodoList todos={this.state.todos} onDestroy={this.handleDestroy}/>
	      			<Footer />
	      		</section>
    		);
  		}
	});

	ReactDOM.render(
	  	<TodoBox />,
	  	document.getElementById('Content')
	);


})(window);
