import './index.css'

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', letterSpacing: '4px' }}>ColorQuest</h1>
      <p style={{ color: '#aaa', marginTop: '1rem' }}>
        A color memory game. How sharp is your eye?
      </p>
      <button style={{
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
    </div>
  )
}

export default App
