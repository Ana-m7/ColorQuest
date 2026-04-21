import { useState } from 'react'
import { randomColor } from './utils/colorUtils'
import ColorDisplay from './components/ColorDisplay'
import './index.css'

function App() {
  const [phase, setPhase] = useState('home') // home | memorise | guess
  const [targetColor, setTargetColor] = useState(null)

  function startGame() {
    const color = randomColor()
    setTargetColor(color)
    setPhase('memorise')
  }

  function handleTimeUp() {
    setPhase('guess')
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>

      {phase === 'home' && (
        <>
          <h1 style={{ fontSize: '3rem', letterSpacing: '4px' }}>ColorQuest</h1>
          <p style={{ color: '#aaa', marginTop: '1rem' }}>
            A color memory game. How sharp is your eye?
          </p>
          <button onClick={startGame} style={{
            marginTop: '2rem',
            padding: '12px 32px',
            fontSize: '1rem',
            background: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Start Game
          </button>
        </>
      )}

      {phase === 'memorise' && (
        <ColorDisplay color={targetColor} onTimeUp={handleTimeUp} />
      )}

      {phase === 'guess' && (
        <div>
          <p style={{ color: '#aaa', fontSize: '1.2rem' }}>
            Now pick the colour you saw!
          </p>
          <p style={{ color: '#555', marginTop: '0.5rem' }}>
            (colour wheel coming next)
          </p>
        </div>
      )}

    </div>
  )
}

export default App