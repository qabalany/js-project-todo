import { create } from 'zustand'

// Get initial theme from localStorage or default to dark
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  return savedTheme === 'light' ? false : true
}

// Zustand store - keeps all todos in one place
export const useTodoStore = create((set, get) => ({
  // All todos go here
  todos: [],

  // Theme state (get from localStorage or default to dark)
  isDarkMode: getInitialTheme(),

  // Toggle theme and save to localStorage
  toggleTheme: () => set((state) => {
    const newMode = !state.isDarkMode
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
    return { isDarkMode: newMode }
  }),

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
