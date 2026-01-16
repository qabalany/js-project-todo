import styled from 'styled-components'
import { useTodoStore } from '../store/useTodoStore'

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 20px;
  margin-bottom: 10px;
  border-radius: 16px;
  background: ${props => {
    if (props.$completed) {
      return props.$isDark
        ? 'rgba(100, 200, 150, 0.15)'
        : 'rgba(200, 255, 200, 0.3)';
    }
    return props.$isDark
      ? 'rgba(100, 150, 200, 0.15)'
      : 'rgba(255, 255, 255, 0.3)';
  }};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s;

  &:hover {
    background: ${props => {
      if (props.$completed) {
        return props.$isDark
          ? 'rgba(100, 200, 150, 0.2)'
          : 'rgba(200, 255, 200, 0.4)';
      }
      return props.$isDark
        ? 'rgba(100, 150, 200, 0.2)'
        : 'rgba(255, 255, 255, 0.4)';
    }};
    transform: translateX(5px);
  }
`

const Checkbox = styled.input`
  width: 22px;
  height: 22px;
  margin-right: 16px;
  cursor: pointer;
  accent-color: ${props => props.$isDark ? '#64c896' : '#4ade80'};
`

const Text = styled.span`
  flex: 1;
  font-size: 16px;
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.9)' : '#2c3e50'};
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  opacity: ${props => props.$completed ? 0.6 : 1};
  text-shadow: ${props => props.$isDark ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};
`

const DeleteButton = styled.button`
  padding: 10px 16px;
  background: rgba(255, 100, 100, 0.2);
  backdrop-filter: blur(10px);
  color: ${props => props.$isDark ? '#ff9999' : '#ffffff'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 100, 100, 0.3);
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid rgba(255, 100, 100, 0.6);
    outline-offset: 2px;
  }
`

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
)

export const TodoItem = ({ todo }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const isDarkMode = useTodoStore((state) => state.isDarkMode)

  return (
    <ItemContainer $completed={todo.completed} $isDark={isDarkMode}>
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        $isDark={isDarkMode}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <Text $completed={todo.completed} $isDark={isDarkMode}>
        {todo.text}
      </Text>
      <DeleteButton 
        onClick={() => removeTodo(todo.id)} 
        $isDark={isDarkMode}
        aria-label={`Delete "${todo.text}"`}
      >
        <TrashIcon />
      </DeleteButton>
    </ItemContainer>
  )
}
