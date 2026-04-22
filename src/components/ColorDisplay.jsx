import { useEffect, useRef, useState } from 'react'
import { rgbToHex } from '../utils/colorUtils'

function ColorDisplay({ color, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(10)
  const calledRef = useRef(false)

  useEffect(() => {
    setTimeLeft(10)
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimeout(onTimeUp, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [color])

  const hex = rgbToHex(color)

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '2px' }}>
        MEMORISE THIS COLOUR
      </p>
      <div style={{
        width: '260px',
        height: '260px',
        borderRadius: '16px',
        backgroundColor: hex,
        margin: '0 auto',
        boxShadow: `0 0 60px ${hex}`,
      }} />
      <p style={{ marginTop: '1.2rem', fontSize: '1rem', color: '#ccc', letterSpacing: '3px' }}>
        {hex}
      </p>
      <p style={{ marginTop: '0.5rem', fontSize: '2rem', fontWeight: 'bold' }}>
        {timeLeft}s
      </p>
    </div>
  )
}

export default ColorDisplay