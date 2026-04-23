import { rgbToHex } from '../utils/colorUtils'

function GameOver({ scores, targetColors, pickedColors, onRestart }) {
  const safeScores = Array.isArray(scores) ? scores : []

  return (
    <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', letterSpacing: '4px', marginBottom: '2rem' }}>YOUR RESULTS</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
        {safeScores.map((score, i) => {
          const targetHex = targetColors?.[i] ? rgbToHex(targetColors[i]) : '#333'
          const pickedHex = pickedColors?.[i] ? rgbToHex(pickedColors[i]) : '#333'
          return (
            <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #2a2a2a' }}>
              <div style={{ display: 'flex', height: '70px' }}>
                <div style={{ flex: 1, backgroundColor: targetHex, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '6px 10px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>TARGET</span>
                </div>
                <div style={{ flex: 1, backgroundColor: pickedHex, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '6px 10px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>YOUR PICK</span>
                </div>
              </div>
              <div style={{ background: '#1a1a1a', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#555', fontSize: '0.8rem' }}>ROUND {i + 1}</span>
                <div style={{ flex: 1, height: '4px', background: '#222', margin: '0 12px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: score + '%', background: score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444', borderRadius: '4px' }} />
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', minWidth: '40px', textAlign: 'right', color: score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444' }}>{score}%</span>
              </div>
            </div>
          )
        })}
      </div>
      <button onClick={onRestart} style={{ padding: '12px 32px', fontSize: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        Play Again
      </button>
    </div>
  )
}

export default GameOver
