import { create } from 'zustand'

// Create Zustand store for managing todos
// This is our global state - no prop drilling needed!
export const useTodoStore = create((set) => ({
  // State: array of todos
  todos: [],

  // We'll add actions (functions) in TODO 2
}))
