// Mascota del asistente: la misma ilustración pixel-art del favicon y de la
// tarjeta destacada de Instagram (ver .pixel-head/.pixel-eye/.pixel-mouth en
// style.css), reconstruida como SVG escalable para reutilizarla como
// identidad visual de "Jhon's Assistant" en cualquier tamaño.
let instances = 0;

export function renderMascotIcon() {
  const gradientId = `mascot-gradient-${instances++}`;

  return `
    <svg viewBox="30 17 120 105" role="img" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="55%" stop-color="#7c3aed" />
          <stop offset="100%" stop-color="#4c1d95" />
        </linearGradient>
      </defs>
      <polygon
        points="35,41 57,41 57,22 76.8,22 76.8,41 103.2,41 103.2,22 123,22 123,41 145,41 145,99.9 125.2,99.9 125.2,117 105.4,117 105.4,101.8 74.6,101.8 74.6,117 54.8,117 54.8,99.9 35,99.9"
        fill="url(#${gradientId})"
        stroke="#c4b5fd"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
      <rect x="58" y="67" width="19" height="19" fill="#09090b" />
      <rect x="103" y="67" width="19" height="19" fill="#09090b" />
      <rect x="75" y="101" width="30" height="8" fill="#09090b" />
    </svg>
  `;
}
