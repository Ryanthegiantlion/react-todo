var Todo = React.createClass({
  render: function() {
    return (
      <li className="todo">
        <input type="checkbox" />
        <span>A todo item</span>  
        <button></button>
      </li>
    );
  }
});


var TodoList = React.createClass({
  render: function() {
    return (
          <ul>
            <Todo />
            <Todo />
          </ul>
      );
  }
});

var TodoForm = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Enter new todo" />
        <input type="submit" />
      </form>
    );
  }
});

var TodoFilter = React.createClass({
  render: function() {
    return (
        <div className="filter">
          <span>2 items left</span>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      )
  }
});

var TodoBox = React.createClass({
  render: function() {
    return (
      <div className="todoBox">
        <h1>Ryans TodoList</h1>
        <TodoForm />
        <TodoList />
        <TodoFilter />
      </div>
    );
  }
});

ReactDOM.render(
  <TodoBox />,
  document.getElementById('content')
);
