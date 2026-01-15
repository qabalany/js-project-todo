import { useTodoStore } from '../store/useTodoStore'

export const TodoStats = () => {
  const todos = useTodoStore((state) => state.todos)
  const getUncompletedCount = useTodoStore((state) => state.getUncompletedCount)

  const totalCount = todos.length
  const uncompletedCount = getUncompletedCount()

  return (
    <div>
      <p>Total: {totalCount} tasks</p>
      <p>Remaining: {uncompletedCount} tasks</p>
    </div>
  )
}
