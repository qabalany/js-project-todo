import styled from 'styled-components'
import { useTodoStore } from '../store/useTodoStore'

const StatsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const StatCircle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
`

const CircleWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
`

const ProgressSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
`

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${props => props.$isDark
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.3)'};
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`

const Label = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`

const CircularProgress = ({ percent, color }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <ProgressSvg width="90" height="90">
      {/* Background circle */}
      <circle
        cx="45"
        cy="45"
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="4"
      />
      {/* Progress circle */}
      <circle
        cx="45"
        cy="45"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </ProgressSvg>
  );
};

export const TodoStats = () => {
  const todos = useTodoStore((state) => state.todos)
  const getUncompletedCount = useTodoStore((state) => state.getUncompletedCount)
  const isDarkMode = useTodoStore((state) => state.isDarkMode)

  const totalCount = todos.length
  const uncompletedCount = getUncompletedCount()
  const completedCount = totalCount - uncompletedCount
  
  // Calculate percentages for progress rings
  const completedPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const remainingPercent = totalCount > 0 ? (uncompletedCount / totalCount) * 100 : 0;

  return (
    <StatsContainer>
      <StatCircle>
        <CircleWrapper>
          <CircularProgress 
            percent={100} 
            color="rgba(100, 200, 255, 0.6)" 
          />
          <Circle $isDark={isDarkMode}>{totalCount}</Circle>
        </CircleWrapper>
        <Label $isDark={isDarkMode}>Total Tasks</Label>
      </StatCircle>
      <StatCircle>
        <CircleWrapper>
          <CircularProgress 
            percent={completedPercent} 
            color="rgba(100, 230, 150, 0.8)" 
          />
          <Circle $isDark={isDarkMode}>{completedCount}</Circle>
        </CircleWrapper>
        <Label $isDark={isDarkMode}>Completed Tasks</Label>
      </StatCircle>
      <StatCircle>
        <CircleWrapper>
          <CircularProgress 
            percent={remainingPercent} 
            color="rgba(200, 150, 255, 0.8)" 
          />
          <Circle $isDark={isDarkMode}>{uncompletedCount}</Circle>
        </CircleWrapper>
        <Label $isDark={isDarkMode}>Remaining Tasks</Label>
      </StatCircle>
    </StatsContainer>
  )
}
