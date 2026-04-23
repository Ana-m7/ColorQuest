import { useState } from 'react'
import { randomColor, colorSimilarity } from './utils/colorUtils'
import ColorDisplay from './components/ColorDisplay'
import RoundTracker from './components/RoundTracker'
import ColorPicker from './components/ColorPicker'
import ResultCard from './components/ResultCard'
import GameOver from './components/GameOver'
import './index.css'

const TOTAL_ROUNDS = 5

function App() {
  const [phase, setPhase] = useState('home')
  const [targetColor, setTargetColor] = useState(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [pickedColor, setPickedColor] = useState({ r: 255, g: 255, b: 255 })
  const [scores, setScores] = useState([])
  const [lastScore, setLastScore] = useState(null)
  const [targetColors, setTargetColors] = useState([])
  const [pickedColors, setPickedColors] = useState([])

  function startGame() {
  setCurrentRound(1)
  setScores([])
  setTargetColors([])
  setPickedColors([])
  setLastScore(null)
  setPickedColor({ r: 128, g: 128, b: 128 })
  setTargetColor(randomColor())
  setPhase('memorise')
}

  function handleTimeUp() {
    setPhase('guess')
  }

  function handleVerify() {
  const score = colorSimilarity(targetColor, pickedColor)
  setLastScore(score)
  setScores(prev => [...prev, score])
  setTargetColors(prev => [...prev, targetColor])
  setPickedColors(prev => [...prev, pickedColor])
  setPhase('result')
}

  function handleNext() {
    if (currentRound >= TOTAL_ROUNDS) {
      setPhase('gameover')
    } else {
      setCurrentRound(prev => prev + 1)
      setTargetColor(randomColor())
      setLastScore(null)
      setPhase('memorise')
    }
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
          <ColorPicker onColorChange={setPickedColor} />
          <button onClick={handleVerify} style={{
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
            Verify
          </button>
        </>
      )}

      {phase === 'result' && (
        <>
          <RoundTracker currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />
          <ResultCard
            targetColor={targetColor}
            pickedColor={pickedColor}
            score={lastScore}
            round={currentRound}
          />
          <button onClick={handleNext} style={{
            marginTop: '1.5rem',
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
            {currentRound >= TOTAL_ROUNDS ? 'See Results' : 'Next Round →'}
          </button>
        </>
      )}

      {phase === 'gameover' && (
  <GameOver scores={scores} targetColors={targetColors} pickedColors={pickedColors} onRestart={startGame} />
)}

    </div>
  )
}

export default App