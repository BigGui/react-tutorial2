
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


var TodoItem = React.createClass({
	delete: function() {
		this.props.delete(this.props.itemId);
	},

	render: function() {

		var classStr = '';

		if (this.props.todo.completed) classStr += 'completed';

		return (
            <li className={classStr}>
              <div className="view">
                <input className="toggle" type="checkbox" checked />
                <label>{this.props.todo.name}</label>
                <button onClick={this.delete} className="destroy"></button>
              </div>
              <input className="edit" value="Create a TodoMVC template" />
            </li>
		);
	}
});


var TodoList = React.createClass({

	deleteItem: function(itemId) {
		this.state.todos.splice(itemId, 1);
		this.setState({todos: this.state.todos});
	},

	getInitialState: function() {

		return { todos: [
			{ name: "Faire la vaisselle", completed: true },
			{ name: "Faire le ménage", completed: false }
		]};

	},

	render: function() {

		var self = this;

		var rows = this.state.todos.map(function(todo, i) {
			return (
				<TodoItem todo={todo} itemId={i} delete={self.deleteItem} />
			);
		});

		return (
			<div>
				<TodoHeader />
				<section id="main">
		          <input id="toggle-all" type="checkbox" />
		          <label htmlFor="toggle-all">Mark all as complete</label>
		          <ul id="todo-list">
		            {rows}
		          </ul>
		        </section>
				<TodoFooter />
	        </div>
		);
	}
});


ReactDOM.render(<TodoList />, document.getElementById("todoapp"));