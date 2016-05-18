var TodoList = React.createClass({
	render: function() {
		return (
			<div>
				<TodoHeader />
				<section id="main">
		          <input id="toggle-all" type="checkbox" />
		          <label htmlFor="toggle-all">Mark all as complete</label>
		          <ul id="todo-list">
		            <li className="completed">
		              <div className="view">
		                <input className="toggle" type="checkbox" checked />
		                <label>Create a TodoMVC template</label>
		                <button className="destroy"></button>
		              </div>
		              <input className="edit" value="Create a TodoMVC template" />
		            </li>
		            <li>
		              <div className="view">
		                <input className="toggle" type="checkbox" />
		                <label>Rule the we</label>
		                <button className="destroy"></button>
		              </div>
		            </li>
		          </ul>
		        </section>
				<TodoFooter />
	        </div>
		);
	}
});

var TodoHeader = React.createClass({
	render: function() {
		return (
	        <header id="header">
	          <h1>todos</h1>
	          <input id="new-todo" placeholder="What needs to be done?" autofocus />
	        </header>
		);
	}
});

var TodoFooter = React.createClass({
	render: function() {
		return (
	        <footer id="footer">
	          <span id="todo-count"><strong>1</strong> item left</span>
	          <ul id="filters">
	            <li>
	              <a class="selected" href="#/">All</a>
	            </li>
	            <li>
	              <a href="#/active">Active</a>
	            </li>
	            <li>
	              <a href="#/completed">Completed</a>
	            </li>
	          </ul>
	          <button id="clear-completed">Clear completed (1)</button>
	        </footer>
		);
	}
});

ReactDOM.render(<TodoList />, document.getElementById("todoapp"));