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

var TodoFilter = React.createClass({

	filterAction: function(event) {
		this.props.filterChange(this.props.filter);
	},

	render: function() {
		return (
			<li>
              <a className={this.props.selected ? 'selected' : ''} onClick={this.filterAction} href={"#/" + (this.props.filter === "All" ? "" : this.props.filter) }>{this.props.filter}</a>
            </li>
		);
	}
});

var TodoFooter = React.createClass({
	clearCompleted: function(event) {
		event.preventDefault();
		this.props.clearCompleted();
	},

	render: function() {

		var self = this;

		var filters = this.props.filters.map(function(filter, i){
			return <TodoFilter filter={filter} key={i} selected={filter === self.props.currentFilter} filterChange={self.props.filterChange} />
		});

		return (
	        <footer id="footer">
	          <span id="todo-count"><strong>{this.props.nbLeft}</strong> item left</span>
	          <ul id="filters">
	            {filters}
	          </ul>
	          <button id="clear-completed" onClick={this.clearCompleted}>Clear completed ({this.props.nbCompleted})</button>
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
		var todo = this.props.todo,
			classStr = '';

		if (todo.completed) classStr += 'completed';

		return (
            <li className={classStr}>
              <div className="view">
                <input onChange={this.toggle} className="toggle" type="checkbox" checked={todo.completed} />
                <label>{todo.name}</label>
                <button onClick={this.delete} className="destroy"></button>
              </div>
              <input className="edit" value="" />
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

	filterChange: function(filter) {
		this.setState({currentFilter: filter});
	},

	clearCompleted: function() {
		this.setState({todos: this.state.todos.filter(function(elem) { return !elem.completed})});
	},

	getInitialState: function() {

		return {
			todos: [
				{ name: "Faire la vaisselle", completed: true },
				{ name: "Faire le ménage", completed: false }
			],
			filters: ["All", "Active", "Completed"],
			currentFilter: "All"
		};

	},

	render: function() {

		var self = this;

		var rows = this.state.todos
				.filter(function(elem){
					switch(self.state.currentFilter) {
						case "Active" :
							return !elem.completed;
							
						case "Completed" :
							return elem.completed;

						default:
							return true;
					}
				})
				.map(function(todo, i) {
					return (
						<TodoItem todo={todo} key={i} itemId={i} delete={self.deleteItem} toggle={self.toggleItem} />
					);
				});

		var nbLeft = this.state.todos.filter(function(elem){ return !elem.completed }).length;

		var nbCompleted = this.state.todos.filter(function(elem){ return elem.completed }).length;

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
				<TodoFooter	nbLeft={nbLeft}
							nbCompleted={nbCompleted}
							filters={this.state.filters}
							currentFilter={this.state.currentFilter}
							filterChange={this.filterChange}
							clearCompleted={this.clearCompleted} />
	        </div>
		);
	}
});


ReactDOM.render(<TodoList />, document.getElementById("todoapp"));