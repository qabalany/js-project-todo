import { create } from 'zustand'

// Get initial theme from localStorage or default to dark
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  return savedTheme === 'light' ? false : true
}

// Load todos from localStorage
const loadTodosFromStorage = () => {
  try {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  } catch (error) {
    console.error('Error loading todos from localStorage:', error)
    return []
  }
}

// Save todos to localStorage
const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving todos to localStorage:', error)
  }
}

// Available categories for tasks (Eisenhower Matrix)
export const CATEGORIES = [
  { id: 'urgent-important', label: 'Urgent & Important', color: '#e74c3c', emoji: '🔴', description: 'Do First' },
  { id: 'not-urgent-important', label: 'Important, Not Urgent', color: '#f39c12', emoji: '🟡', description: 'Schedule' },
  { id: 'urgent-not-important', label: 'Urgent, Not Important', color: '#3498db', emoji: '🔵', description: 'Delegate' },
  { id: 'not-urgent-not-important', label: 'Not Urgent or Important', color: '#95a5a6', emoji: '⚪', description: 'Eliminate' }
]

// Zustand store - keeps all todos in one place
export const useTodoStore = create((set, get) => ({
  // All todos go here (load from localStorage on init)
  todos: loadTodosFromStorage(),

  // Theme state (get from localStorage or default to dark)
  isDarkMode: getInitialTheme(),

  // Toggle theme and save to localStorage
  toggleTheme: () => set((state) => {
    const newMode = !state.isDarkMode
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
    return { isDarkMode: newMode }
  }),

  // Add new todo to the list
  addTodo: (text, category = 'not-urgent-not-important') => set((state) => {
    const newTodos = [
      {
        id: Date.now(), // using timestamp as id
        text: text,
        completed: false,
        category: category, // add category to todo
        createdAt: new Date().toISOString() // add timestamp
      },
      ...state.todos // newest first
    ]
    saveTodosToStorage(newTodos)
    return { todos: newTodos }
  }),

  // Toggle between completed and not completed
  toggleTodo: (id) => set((state) => {
    const newTodos = state.todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
    saveTodosToStorage(newTodos)
    return { todos: newTodos }
  }),

  // Delete todo by id
  removeTodo: (id) => set((state) => {
    const newTodos = state.todos.filter((todo) => todo.id !== id)
    saveTodosToStorage(newTodos)
    return { todos: newTodos }
  }),

  // Count how many todos are not done yet
  getUncompletedCount: () => {
    const state = get()
    return state.todos.filter((todo) => !todo.completed).length
  }
}))
