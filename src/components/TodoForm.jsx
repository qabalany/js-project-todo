import { useState } from 'react'
import styled from 'styled-components'
import { useTodoStore } from '../store/useTodoStore'

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`

const Input = styled.input`
  flex: 1;
  padding: 16px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: ${props => props.$isDark ? '#ffffff' : '#2c3e50'};

  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(44, 62, 80, 0.6)'};
  }
`

const AddButton = styled.button`
  padding: 16px 32px;
  background: ${props => props.$isDark
    ? 'rgba(100, 200, 150, 0.3)'
    : 'rgba(100, 255, 180, 0.4)'};
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${props => props.$isDark
      ? 'rgba(100, 200, 150, 0.4)'
      : 'rgba(100, 255, 180, 0.5)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }
`

export const TodoForm = () => {
  const [input, setInput] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)
  const isDarkMode = useTodoStore((state) => state.isDarkMode)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      addTodo(input.trim())
      setInput('')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        $isDark={isDarkMode}
        aria-label="New task input"
      />
      <AddButton 
        type="submit" 
        $isDark={isDarkMode}
        aria-label="Add new task"
      >
        Add Todo
      </AddButton>
    </Form>
  )
}
