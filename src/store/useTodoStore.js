import { create } from 'zustand'

// Zustand store - keeps all todos in one place
export const useTodoStore = create((set, get) => ({
  // All todos go here
  todos: [],

  // Add new todo to the list
  addTodo: (text) => set((state) => ({
    todos: [
      {
        id: Date.now(), // using timestamp as id
        text: text,
        completed: false
      },
      ...state.todos // newest first
    ]
  })),

  // Toggle between completed and not completed
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  })),

  // Delete todo by id
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  })),

  // Count how many todos are not done yet
  getUncompletedCount: () => {
    const state = get()
    return state.todos.filter((todo) => !todo.completed).length
  }
}))
