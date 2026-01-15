import { useTodoStore } from '../store/useTodoStore'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos)

  // Show empty state when no todos
  if (todos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
        <p style={{ fontSize: '48px', margin: '0' }}>📝</p>
        <h3 style={{ margin: '10px 0' }}>No todos yet</h3>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Add a task above to get started!</p>
      </div>
    )
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
