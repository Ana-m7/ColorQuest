function GameOver({ scores, onRestart }) {
  const safeScores = Array.isArray(scores) ? scores : []
  const avg = safeScores.length > 0 ? Math.round(safeScores.reduce((a, b) => a + b, 0) / safeScores.length) : 0

  function getVerdict(avg) {
    if (avg >= 80) return { text: '🎨 Colour Master', color: '#22c55e' }
    if (avg >= 60) return { text: '👁️ Sharp Eye', color: '#eab308' }
    return { text: '🎯 Keep Practising', color: '#ef4444' }
  }

  const verdict = getVerdict(avg)

  return (
    <div style={{ textAlign: 'center', maxWidth: '360px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', letterSpacing: '4px', marginBottom: '0.5rem' }}>GAME OVER</h2>
      <p style={{ color: verdict.color, fontSize: '1.1rem', letterSpacing: '2px', marginBottom: '2rem' }}>
        {verdict.text}
      </p>

      <div style={{
        background: '#1a1a1a',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #2a2a2a',
        marginBottom: '1.5rem'
      }}>
        <p style={{ color: '#555', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>
          ROUND SCORES
        </p>
        {safeScores.map((score, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ color: '#555', fontSize: '0.85rem' }}>Round {i + 1}</span>
            <div style={{
              flex: 1,
              height: '4px',
              background: '#222',
              margin: '0 12px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${score}%`,
                background: score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444',
                borderRadius: '4px',
                transition: 'width 0.6s ease'
              }} />
            </div>
            <span style={{
              color: score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              minWidth: '40px',
              textAlign: 'right'
            }}>
              {score}%
            </span>
          </div>
        ))}

        <div style={{
          borderTop: '1px solid #2a2a2a',
          marginTop: '1rem',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span style={{ color: '#aaa', letterSpacing: '2px', fontSize: '0.85rem' }}>AVERAGE</span>
          <span style={{ color: verdict.color, fontWeight: 'bold', fontSize: '1.1rem' }}>{avg}%</span>
        </div>
      </div>

      <button onClick={onRestart} style={{
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
        Play Again
      </button>
    </div>
  )
}

export default GameOver