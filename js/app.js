(function (window) {
	'use strict';

	var Todo = React.createClass({
		handleDestroy: function() {
			this.props.onDestroy(this.props);
		},
		handleComplete: function() {
			this.props.onComplete(this.props);
		},
	  	render: function() {
		    return (
		      	<li className={this.props.isCompleted ? "completed":""} data-id={this.props.id}>
					<div className="view">
						<input className="toggle" type="checkbox" checked={this.props.isCompleted} onClick={this.handleComplete}/>
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
			this.props.onDestroy(item);
		},
		handleComplete: function(item) {
			console.log(item);
			this.props.onComplete(item);
		},
		handleToggleAll: function() {
			this.props.onToggleAll();
		},
	  	render: function() {
	  		var todoNodes = this.props.todos.map(function(todo) {
	  			return (
	  				<Todo key={todo.id} isCompleted={todo.isCompleted} onDestroy={this.handleDestroy} onComplete={this.handleComplete} id={todo.id}>{todo.text}</Todo>
	  			)
	  		}.bind(this));
	    	return (
		      	<section className="main">
					<input className="toggle-all" type="checkbox" onClick={this.handleToggleAll}/>
					<ul className="todo-list">
						{todoNodes}
					</ul>
				</section>
	    );
	  }
	});

	var Footer = React.createClass({
		handleChangeFilter: function(e) {
			this.props.onChangeFilter($(e.target).attr('data-filter'));
		},
		handleClearCompleted: function() {
			this.props.onClearCompleted();
		},
	  	render: function() {
	  		var clearButton;
	  		if (this.props.itemsLeft > 0) {
	  			clearButton = <button className="clear-completed" onClick={this.handleClearCompleted}>Clear completed</button>
	  		} else {
	  			clearButton = undefined
	  		}
	    	return (
				<footer className="footer">
					<span className="todo-count"><strong>{this.props.itemsLeft}</strong> item left</span>
					<ul className="filters">
						<li>
							<a className={this.props.showing=="all"?"selected":""} href="#/" data-filter="all" onClick={this.handleChangeFilter}>All</a>
						</li>
						<li>
							<a className={this.props.showing=="active"?"selected":""} href="#/active" data-filter="active" onClick={this.handleChangeFilter}>Active</a>
						</li>
						<li>
							<a className={this.props.showing=="completed"?"selected":""} href="#/completed" data-filter="completed" onClick={this.handleChangeFilter}>Completed</a>
						</li>
					</ul>
					{clearButton}		
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
			return { todos: [{id: 1, text:"Todo1", isCompleted: true}, {id: 2, text:"Todo2", isCompleted: false}], showing: "all" };
		},
		handleTodoAdd: function(newTodo) {
			console.log('box todo add');
			var currentTodos = this.state.todos;
			if (currentTodos.length > 0) {
				var lastId = currentTodos[currentTodos.length-1].id; 
			}
			else {
				var lastId = 1;
			}
			var newTodos = currentTodos.concat([{ id: lastId+1, text: newTodo.text, isCompleted: newTodo.isCompleted }]);
			console.log(newTodos);
			this.setState({todos: newTodos, showing: this.state.showing});
		},
		handleDestroy: function(item) {
			var currentTodos = this.state.todos;
			var newTodos = currentTodos.filter(function(todo) { return todo.id != item.id });
			this.setState({ todos: newTodos, showing: this.state.showing });
		},
		handleComplete: function(item) {
			var currentTodos = this.state.todos;
			var index = currentTodos.findIndex(function(todo) { return todo.id == item.id });
			currentTodos[index].isCompleted = !item.isCompleted;
			this.setState({ todos: currentTodos, showing: this.state.showing });
		},
		handleChangeFilter: function(showing) {
			console.log('showing');
			this.setState({todos: this.state.todos, showing: showing})
		},
		handleClearCompleted: function() {
			var currentTodos = this.state.todos;
			var newTodos = currentTodos.filter(function(todo) { return todo.isCompleted == false});
			this.setState({ todos: newTodos, showing: this.state.showing });
		},
		handleToggleAll: function() {
			var itemsLeft = this.itemsLeft();
			var currentTodos = this.state.todos;
			if (itemsLeft > 0) {
				currentTodos.forEach(function(item) { item.isCompleted = true });
			}
			else {
				currentTodos.forEach(function(item) { item.isCompleted = false });
			}
			this.setState({ todos: currentTodos, showing: this.state.showing });
		},
		getShowingTodos:function() {
			if (this.state.showing == "all")
			{
				console.log('all');
				return this.state.todos;
			}
			else if (this.state.showing == "completed")
			{
				console.log('completed');
				return this.state.todos.filter(function(item) { return item.isCompleted == true });
			}
			else if (this.state.showing == "active")
			{
				console.log('active');
				return this.state.todos.filter(function(item) { return item.isCompleted == false });
			}
		},
		itemsLeft: function() {
			return this.state.todos.filter(function(item) { return item.isCompleted == false }).length;
		},
  		render: function() {
  			console.log('todo box render');
    		return (
    			<section className="todoapp">
	      			<Header onTodoAdd={this.handleTodoAdd} />
	      			<TodoList todos={this.getShowingTodos()} onDestroy={this.handleDestroy} onComplete={this.handleComplete} onToggleAll={this.handleToggleAll}/>
	      			<Footer onChangeFilter={this.handleChangeFilter} itemsLeft={this.itemsLeft()} onClearCompleted={this.handleClearCompleted} showing={this.state.showing}/>
	      		</section>
    		);
  		}
	});

	ReactDOM.render(
	  	<TodoBox />,
	  	document.getElementById('Content')
	);


})(window);
