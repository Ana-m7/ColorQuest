import { useRef, useEffect, useState, useCallback } from 'react'
import { rgbToHex } from '../utils/colorUtils'

function ColorPicker({ onColorChange }) {
  const squareRef = useRef(null)
  const hueRef = useRef(null)

  const [hue, setHue] = useState(180)
  const [squarePos, setSquarePos] = useState({ x: 0.5, y: 0.5 })
  const [isDraggingSquare, setIsDraggingSquare] = useState(false)
  const [isDraggingHue, setIsDraggingHue] = useState(false)

  const SQUARE_SIZE = 320
  const HUE_HEIGHT = 320
  const HUE_WIDTH = 32

  function hslToRgb(h, s, l) {
    s /= 100; l /= 100
    const k = n => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255)
    }
  }

  function getColorFromPos(x, y, h) {
    const s = x * 100
    const l = 100 - y * 50 - 50 + y * 50
    const lightness = (1 - y) * 50 + 50 * (1 - x)
    // proper HSV to RGB
    const saturation = x * 100
    const value = (1 - y) * 100
    return hsvToRgb(h, saturation, value)
  }

  function hsvToRgb(h, s, v) {
    s /= 100; v /= 100
    const i = Math.floor(h / 60) % 6
    const f = h / 60 - Math.floor(h / 60)
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    const rgb = [
      [v, t, p], [q, v, p], [p, v, t],
      [p, q, v], [t, p, v], [v, p, q]
    ][i]
    return {
      r: Math.round(rgb[0] * 255),
      g: Math.round(rgb[1] * 255),
      b: Math.round(rgb[2] * 255)
    }
  }

  const emitColor = useCallback((x, y, h) => {
    const color = hsvToRgb(h, x * 100, (1 - y) * 100)
    onColorChange(color)
  }, [onColorChange])

  // Square drag
  function handleSquareMouseDown(e) {
    setIsDraggingSquare(true)
    updateSquare(e)
  }

  function updateSquare(e) {
    const rect = squareRef.current.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))
    setSquarePos({ x, y })
    emitColor(x, y, hue)
  }

  // Hue drag
  function handleHueMouseDown(e) {
    setIsDraggingHue(true)
    updateHue(e)
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
    function onMouseUp() {
      setIsDraggingSquare(false)
      setIsDraggingHue(false)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDraggingSquare, isDraggingHue, hue, squarePos])

  const currentColor = hsvToRgb(hue, squarePos.x * 100, (1 - squarePos.y) * 100)
  const hex = rgbToHex(currentColor)
  const hueColor = `hsl(${hue}, 100%, 50%)`

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{
        color: '#aaa',
        letterSpacing: '2px',
        fontSize: '0.85rem',
        marginBottom: '1.5rem'
      }}>
        PICK THE COLOUR YOU SAW
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'flex-start' }}>

        {/* Hue Strip */}
        <div
          ref={hueRef}
          onMouseDown={handleHueMouseDown}
          style={{
            width: `${HUE_WIDTH}px`,
            height: `${HUE_HEIGHT}px`,
            borderRadius: '8px',
            background: 'linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
            cursor: 'pointer',
            position: 'relative',
            flexShrink: 0,
            userSelect: 'none'
          }}
        >
          {/* Hue indicator */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: `${(hue / 360) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '0 0 4px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            background: hueColor
          }} />
        </div>

        {/* Colour Square */}
        <div
          ref={squareRef}
          onMouseDown={handleSquareMouseDown}
          style={{
            width: `${SQUARE_SIZE}px`,
            height: `${SQUARE_SIZE}px`,
            borderRadius: '12px',
            position: 'relative',
            cursor: 'crosshair',
            background: `hsl(${hue}, 100%, 50%)`,
            userSelect: 'none',
            overflow: 'hidden'
          }}
        >
          {/* White gradient left to right */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, white, transparent)',
            borderRadius: '12px'
          }} />
          {/* Black gradient bottom */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent, black)',
            borderRadius: '12px'
          }} />

          {/* Picker dot */}
          <div style={{
            position: 'absolute',
            left: `${squarePos.x * 100}%`,
            top: `${squarePos.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '0 0 4px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            background: hex
          }} />
        </div>

      </div>

      {/* Colour preview */}
      <div style={{
        marginTop: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          backgroundColor: hex,
          border: '2px solid #333',
          boxShadow: `0 0 16px ${hex}`
        }} />
        <p style={{ color: '#ccc', letterSpacing: '3px', fontSize: '1rem' }}>{hex}</p>
      </div>
    </div>
  )
}

export default ColorPicker