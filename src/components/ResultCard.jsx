import { rgbToHex } from '../utils/colorUtils'

function ResultCard({ targetColor, pickedColor, score, round }) {
  const targetHex = rgbToHex(targetColor)
  const pickedHex = rgbToHex(pickedColor)
  const label = score >= 80 ? { text: 'GREAT!', color: '#22c55e' } : score >= 60 ? { text: 'GOOD', color: '#eab308' } : { text: 'MISS', color: '#ef4444' }

  return (
    <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '2rem', width: '320px', margin: '0 auto', textAlign: 'center', border: '1px solid #2a2a2a' }}>
      <p style={{ color: '#555', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1.2rem' }}>ROUND {round} RESULT</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '10px', backgroundColor: targetHex, margin: '0 auto' }} />
          <p style={{ color: '#555', fontSize: '0.75rem', marginTop: '8px' }}>TARGET</p>
          <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{targetHex}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#333', fontSize: '1.5rem' }}>vs</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '10px', backgroundColor: pickedHex, margin: '0 auto' }} />
          <p style={{ color: '#555', fontSize: '0.75rem', marginTop: '8px' }}>YOUR PICK</p>
          <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{pickedHex}</p>
        </div>
      </div>
      <p style={{ fontSize: '3rem', fontWeight: 'bold', color: label.color }}>{score}%</p>
      <p style={{ color: label.color, letterSpacing: '3px', fontSize: '0.9rem', marginTop: '4px' }}>{label.text}</p>
    </div>
  )
}

export default ResultCard
