import styled from 'styled-components'
import { useTodoStore } from '../store/useTodoStore'
import { TodoItem } from './TodoItem'

const ListContainer = styled.div`
  margin-top: 8px;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(44, 62, 80, 0.6)'};
`

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
`

const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.9)' : '#2c3e50'};
  font-weight: 300;
  text-shadow: ${props => props.$isDark ? '0 2px 5px rgba(0, 0, 0, 0.2)' : 'none'};
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(44, 62, 80, 0.7)'};
  text-shadow: ${props => props.$isDark ? '0 1px 3px rgba(0, 0, 0, 0.2)' : 'none'};
`

const ClipboardCheckIcon = ({ isDark }) => (
  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <polyline points="9 11 12 14 16 10" stroke="rgba(100, 255, 180, 0.6)" strokeWidth="2"/>
  </svg>
)

export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos)
  const isDarkMode = useTodoStore((state) => state.isDarkMode)

  if (todos.length === 0) {
    return (
      <EmptyState $isDark={isDarkMode}>
        <EmptyIcon><ClipboardCheckIcon isDark={isDarkMode} /></EmptyIcon>
        <EmptyTitle $isDark={isDarkMode}>No tasks yet.</EmptyTitle>
        <EmptyText $isDark={isDarkMode}>Add a new one to get started!</EmptyText>
      </EmptyState>
    )
  }

  return (
    <ListContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ListContainer>
  )
}
