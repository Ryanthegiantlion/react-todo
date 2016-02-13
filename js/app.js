(function (window) {
	'use strict';

	var Todo = React.createClass({
	  render: function() {
	    return (
	      <li className="completed">
			<div className="view">
				<input className="toggle" type="checkbox" checked />
				<label>Taste JavaScript</label>
				<button className="destroy"></button>
			</div>
			<input className="edit" value="Create a TodoMVC template" />
		</li>
	    );
	  }
	});

	var TodoList = React.createClass({
	  render: function() {
	    return (
	      	<section className="main">
				<input className="toggle-all" type="checkbox" />
				<ul className="todo-list">
					<Todo />
					<Todo />
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
	 	render: function() {
	    	return (
	      		<header className="header">
				<h1>todos</h1>
				<input className="new-todo" placeholder="What needs to be done?" autofocus />
				</header>
	    	);
	  	}
	});

	var TodoBox = React.createClass({
  		render: function() {
    		return (
    			<section className="todoapp">
	      			<Header />
	      			<TodoList />
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
