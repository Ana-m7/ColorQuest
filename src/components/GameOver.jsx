import { rgbToHex } from '../utils/colorUtils'

function GameOver({ scores, targetColors, pickedColors, onRestart }) {
  const safeScores = Array.isArray(scores) ? scores : []
  const avg = safeScores.length > 0 ? Math.round(safeScores.reduce((a, b) => a + b, 0) / safeScores.length) : 0
  const verdict = avg >= 80 ? { text: 'Colour Master', color: '#22c55e' } : avg >= 60 ? { text: 'Sharp Eye', color: '#eab308' } : { text: 'Keep Practising', color: '#ef4444' }

  return (
    <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto', padding: '0 1rem' }}>
      <h2 style={{ fontSize: '1.5rem', letterSpacing: '4px', marginBottom: '2rem' }}>YOUR RESULTS</h2>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

        {/* Left — round cards */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {safeScores.map((score, i) => {
            const targetHex = targetColors?.[i] ? rgbToHex(targetColors[i]) : '#333'
            const pickedHex = pickedColors?.[i] ? rgbToHex(pickedColors[i]) : '#333'
            return (
              <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #2a2a2a' }}>
                <div style={{ display: 'flex', height: '50px' }}>
                  <div style={{ flex: 1, backgroundColor: targetHex, display: 'flex', alignItems: 'flex-end', padding: '4px 8px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)', padding: '1px 5px', borderRadius: '3px' }}>TARGET</span>
                  </div>
                  <div style={{ flex: 1, backgroundColor: pickedHex, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '4px 8px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)', padding: '1px 5px', borderRadius: '3px' }}>YOUR PICK</span>
                  </div>
                </div>
                <div style={{ background: '#1a1a1a', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#555', fontSize: '0.75rem' }}>ROUND {i + 1}</span>
                  <div style={{ flex: 1, height: '3px', background: '#222', margin: '0 10px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: score + '%', background: score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444', borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontWeight: 'bold', fontSize: '0.85rem', minWidth: '36px', textAlign: 'right', color: score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444' }}>{score}%</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right — average score */}
        <div style={{ width: '180px', flexShrink: 0, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <p style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '2px' }}></p>
          <p style={{ fontSize: '3.5rem', fontWeight: 'bold', color: verdict.color, lineHeight: 1 }}>{avg}</p>
          <p style={{ fontSize: '0.8rem', color: '#555' }}>out of 100</p>
          <div style={{ width: '100%', height: '4px', background: '#222', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: avg + '%', background: verdict.color, borderRadius: '4px', transition: 'width 0.8s ease' }} />
          </div>
          <p style={{ color: verdict.color, fontSize: '0.85rem', letterSpacing: '1px', marginTop: '4px' }}>{verdict.text}</p>
        </div>

      </div>

      <button onClick={onRestart} style={{ marginTop: '2rem', padding: '12px 32px', fontSize: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        Play Again
      </button>
    </div>
  )
}

export default GameOver