// Generates a random RGB color
export function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

// Converts RGB to HEX string
export function rgbToHex({ r, g, b }) {
  return (
    '#' +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

// Calculates % similarity between two RGB colors (0 to 100)
export function colorSimilarity(c1, c2) {
  // Weighted RGB - human eyes are most sensitive to green, then red, then blue
  const rDiff = c1.r - c2.r
  const gDiff = c1.g - c2.g
  const bDiff = c1.b - c2.b

  const weightedDistance = Math.sqrt(
    0.30 * rDiff * rDiff +
    0.59 * gDiff * gDiff +
    0.11 * bDiff * bDiff
  )

  const maxDistance = Math.sqrt(0.30 * 255 * 255 + 0.59 * 255 * 255 + 0.11 * 255 * 255)

  // Make scoring stricter — square the ratio so small differences matter more
  const ratio = weightedDistance / maxDistance
  return Math.round((1 - ratio * ratio * 0.3 - ratio * 0.7) * 100)
}