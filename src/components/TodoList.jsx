import TodoItem from './TodoItem';

export default function TodoList({ todos, toggleTodo, editTodo, deleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        현재 선택된 조건에 맞는 할 일이 없습니다.
      </div>
    );
  }

  return (
    <ul className="list-none p-0 m-0">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
