import { useState } from 'react'
import { randomColor } from './utils/colorUtils'
import ColorDisplay from './components/ColorDisplay'
import RoundTracker from './components/RoundTracker'
import './index.css'

const TOTAL_ROUNDS = 5

function App() {
  const [phase, setPhase] = useState('home')
  const [targetColor, setTargetColor] = useState(null)
  const [currentRound, setCurrentRound] = useState(1)

  function startGame() {
    setCurrentRound(1)
    setTargetColor(randomColor())
    setPhase('memorise')
  }

  function handleTimeUp() {
    setPhase('guess')
  }

  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>

      {phase === 'home' && (
        <>
          <h1 style={{ fontSize: '3rem', letterSpacing: '4px' }}>ColorQuest</h1>
          <p style={{ color: '#aaa', marginTop: '1rem' }}>
            A color memory game. How sharp is your eye?
          </p>
          <p style={{ color: '#555', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            5 rounds · 10 seconds each · match the colour from memory
          </p>
          <button onClick={startGame} style={{
            marginTop: '2rem',
            padding: '12px 32px',
            fontSize: '1rem',
            background: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            Start Game
          </button>
        </>
      )}

      {phase === 'memorise' && (
        <>
          <RoundTracker currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />
          <ColorDisplay color={targetColor} onTimeUp={handleTimeUp} />
        </>
      )}

      {phase === 'guess' && (
        <>
          <RoundTracker currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />
          <div>
            <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Now pick the colour you saw!</p>
            <p style={{ color: '#555', marginTop: '0.5rem', fontSize: '0.9rem' }}>
              (colour wheel coming next)
            </p>
          </div>
        </>
      )}

    </div>
  )
}

export default App