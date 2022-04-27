export class Todos extends React.Component {
  onAddTodo = (ev) => {
    ev.preventDefault()
    const { onAddTodo } = this.props
    onAddTodo(ev.target[0].value)
  }
  render() {
    const { info, onRemoveTodo, onFinishTodo } = this.props
    return (
      <div className="todos">
        <div className="todo-header">
          <h3>{info.todoHeading}</h3>
        </div>
        <form className="todo-input" onSubmit={this.onAddTodo}>
          <input type="text" placeholder="Todo here..." />
          <button type="submit" className="plus">
            <i className="fa fa-plus"></i>
          </button>
        </form>
        <ul className="todo-list">
          {info.todos.map((todo) => (
            <li key={todo.id} className="todo">
              <span
                onClick={() => onFinishTodo(todo.id)}
                className={todo.isDone ? 'todo-txt todo-done' : 'todo-txt'}
              >
                {todo.txt}
              </span>
              <i
                onClick={() => onRemoveTodo(todo.id)}
                className="fa fa-times fa-lg delete-todo"
              ></i>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
