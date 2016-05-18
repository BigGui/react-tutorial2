
var TodoHeader = React.createClass({
	getInitialState: function () {
		return {val: ''};
	},

	handleChange: function(event) {
		this.setState({val: event.target.value});
	},

	add: function(event) {
		event.preventDefault();

		this.props.add(this.state.val);
		this.setState({val: ''});

		console.log("Ajout !");
	},

	render: function() {
		return (
	        <header id="header">
	          <h1>todos</h1>
	          <form onSubmit={this.add}>
	          	<input id="new-todo"	onChange={this.handleChange}
	          							value={this.state.val}
	          							placeholder="What needs to be done?" autofocus />
	          </form>
	        </header>
		);
	}
});


var TodoFooter = React.createClass({
	render: function() {
		return (
	        <footer id="footer">
	          <span id="todo-count"><strong>{this.props.nbLeft}</strong> item left</span>
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

	toggle: function() {
		this.props.toggle(this.props.itemId);
	},

	render: function() {

		var classStr = '';

		if (this.props.todo.completed) classStr += 'completed';

		return (
            <li className={classStr}>
              <div className="view">
                <input onClick={this.toggle} className="toggle" type="checkbox" checked={this.props.todo.completed} />
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

	toggleItem: function(itemId) {
		this.state.todos[itemId].completed = !this.state.todos[itemId].completed;
		this.setState({todos: this.state.todos});
	},

	addItem: function(value) {
		this.state.todos.push({ name: value, completed: false});
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
				<TodoItem todo={todo} itemId={i} delete={self.deleteItem} toggle={self.toggleItem} />
			);
		});

		var nbLeft = this.state.todos.filter(function(elem){ return !elem.completed }).length;

		return (
			<div>
				<TodoHeader add={this.addItem} />
				<section id="main">
		          <input id="toggle-all" type="checkbox" />
		          <label htmlFor="toggle-all">Mark all as complete</label>
		          <ul id="todo-list">
		            {rows}
		          </ul>
		        </section>
				<TodoFooter nbLeft={nbLeft} />
	        </div>
		);
	}
});


ReactDOM.render(<TodoList />, document.getElementById("todoapp"));