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
  const maxDistance = Math.sqrt(3 * 255 * 255); // max possible distance
  const distance = Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
  return Math.round((1 - distance / maxDistance) * 100);
}