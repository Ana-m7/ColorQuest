import { useRef, useEffect, useState, useCallback } from 'react'
import { rgbToHex } from '../utils/colorUtils'

function ColorPicker({ onColorChange }) {
  const squareRef = useRef(null)
  const hueRef = useRef(null)
  const [hue, setHue] = useState(180)
  const [squarePos, setSquarePos] = useState({ x: 0.5, y: 0.5 })
  const [isDraggingSquare, setIsDraggingSquare] = useState(false)
  const [isDraggingHue, setIsDraggingHue] = useState(false)

  function hsvToRgb(h, s, v) {
    s /= 100; v /= 100
    const i = Math.floor(h / 60) % 6
    const f = h / 60 - Math.floor(h / 60)
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    const rgb = [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]][i]
    return { r: Math.round(rgb[0]*255), g: Math.round(rgb[1]*255), b: Math.round(rgb[2]*255) }
  }

  const emitColor = useCallback((x, y, h) => {
    onColorChange(hsvToRgb(h, x * 100, (1 - y) * 100))
  }, [onColorChange])

  function updateSquare(e) {
    const rect = squareRef.current.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))
    setSquarePos({ x, y })
    emitColor(x, y, hue)
  }

  function updateHue(e) {
    const rect = hueRef.current.getBoundingClientRect()
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))
    const newHue = Math.round(y * 360)
    setHue(newHue)
    emitColor(squarePos.x, squarePos.y, newHue)
  }

  useEffect(() => {
    function onMouseMove(e) {
      if (isDraggingSquare) updateSquare(e)
      if (isDraggingHue) updateHue(e)
    }
    function onMouseUp() { setIsDraggingSquare(false); setIsDraggingHue(false) }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDraggingSquare, isDraggingHue, hue, squarePos])

  const currentColor = hsvToRgb(hue, squarePos.x * 100, (1 - squarePos.y) * 100)
  const hex = rgbToHex(currentColor)
  const SIZE = 280

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#aaa', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        PICK THE COLOUR YOU SAW
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'flex-start' }}>

        {/* Hue strip */}
        <div
          ref={hueRef}
          onMouseDown={(e) => { setIsDraggingHue(true); updateHue(e) }}
          style={{
            width: '32px', height: `${SIZE}px`, borderRadius: '8px',
            cursor: 'pointer', position: 'relative', flexShrink: 0, userSelect: 'none',
            background: 'linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
          }}>
          <div style={{
            position: 'absolute', left: '50%', top: `${(hue / 360) * 100}%`,
            transform: 'translate(-50%, -50%)', width: '18px', height: '18px',
            borderRadius: '50%', border: '3px solid white',
            boxShadow: '0 0 4px rgba(0,0,0,0.8)', pointerEvents: 'none',
            background: `hsl(${hue}, 100%, 50%)`
          }} />
        </div>

        {/* Gradient square */}
        <div
          ref={squareRef}
          onMouseDown={(e) => { setIsDraggingSquare(true); updateSquare(e) }}
          style={{
            width: `${SIZE}px`, height: `${SIZE}px`, borderRadius: '12px',
            position: 'relative', cursor: 'crosshair',
            background: `hsl(${hue}, 100%, 50%)`, userSelect: 'none', overflow: 'hidden'
          }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, white, transparent)', borderRadius: '12px' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, black)', borderRadius: '12px' }} />
          <div style={{
            position: 'absolute', left: `${squarePos.x * 100}%`, top: `${squarePos.y * 100}%`,
            transform: 'translate(-50%, -50%)', width: '16px', height: '16px',
            borderRadius: '50%', border: '3px solid white',
            boxShadow: '0 0 4px rgba(0,0,0,0.8)', pointerEvents: 'none', background: hex
          }} />
        </div>

        {/* Picked colour preview — same size as gradient */}
        <div style={{
          width: `${SIZE}px`, height: `${SIZE}px`, borderRadius: '12px',
          backgroundColor: hex, flexShrink: 0,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          paddingBottom: '12px'
        }}>
          <div style={{
            background: 'rgba(0,0,0,0.6)', borderRadius: '6px',
            padding: '4px 10px'
          }}>
            <p style={{ color: '#fff', letterSpacing: '2px', fontSize: '0.9rem', fontFamily: 'monospace' }}>
              {hex}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ColorPicker