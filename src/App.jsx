import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { TodoStats } from './components/TodoStats'

export const App = () => {
  return (
    <main>
      <h1>Todo App with Zustand</h1>
      <TodoStats />
      <TodoForm />
      <TodoList />
    </main>
  )
}
