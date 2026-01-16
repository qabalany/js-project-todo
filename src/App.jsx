import styled from 'styled-components'
import { useTodoStore } from './store/useTodoStore'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { TodoStats } from './components/TodoStats'

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, #1e3a5f 0%, #2d1b4e 50%, #1a1a2e 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: drift 20s linear infinite;
  }

  @keyframes drift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
`

const Card = styled.main`
  background: ${props => props.$isDark 
    ? 'rgba(30, 41, 59, 0.4)' 
    : 'rgba(255, 255, 255, 0.25)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(255, 255, 255, 0.3)'};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  width: 100%;
  max-width: 700px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`

const Header = styled.div`
  background: ${props => props.$isDark
    ? 'linear-gradient(135deg, rgba(71, 118, 230, 0.3) 0%, rgba(142, 84, 233, 0.3) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)'};
  backdrop-filter: blur(10px);
  padding: 40px 30px 30px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Title = styled.h1`
  margin: 0 0 20px 0;
  font-size: 32px;
  font-weight: 300;
  color: ${props => props.$isDark ? '#ffffff' : '#2c3e50'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-shadow: ${props => props.$isDark ? '0 2px 10px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
`

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }
`

const Content = styled.div`
  padding: 30px;
`

const ClipboardIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
)

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export const App = () => {
  const isDarkMode = useTodoStore((state) => state.isDarkMode)
  const toggleTheme = useTodoStore((state) => state.toggleTheme)

  return (
    <AppContainer $isDark={isDarkMode}>
      <Card $isDark={isDarkMode}>
        <Header $isDark={isDarkMode}>
          <ThemeToggle 
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </ThemeToggle>
          <Title $isDark={isDarkMode}>
            <ClipboardIcon /> Walk the Walk
          </Title>
          <TodoStats />
        </Header>
        <Content>
          <TodoForm />
          <TodoList />
        </Content>
      </Card>
    </AppContainer>
  )
}
