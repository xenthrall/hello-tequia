// Versión grande y expresiva de la mascota (misma silueta pixel-art que
// icons/mascot.js, reutilizada como identidad visual), pensada para ser la
// protagonista del modo cine: cada expresión cambia ojos/boca/cejas y a
// veces suma un accesorio (birrete, chispas, engranaje) construido con la
// misma estética geométrica del resto del sitio.
let instances = 0;

const HEAD_POINTS =
  "35,41 57,41 57,22 76.8,22 76.8,41 103.2,41 103.2,22 123,22 123,41 145,41 145,99.9 125.2,99.9 125.2,117 105.4,117 105.4,101.8 74.6,101.8 74.6,117 54.8,117 54.8,99.9 35,99.9";

const EXPRESSIONS = {
  curious: {
    eyes: `
      <rect x="58" y="67" width="19" height="19" fill="#09090b" />
      <rect x="103" y="67" width="19" height="19" fill="#09090b" />
      <rect x="100" y="59" width="22" height="4" fill="#09090b" transform="rotate(-4 111 61)" />
    `,
    mouth: `<rect x="82" y="99" width="16" height="12" fill="#09090b" />`,
  },
  proud: {
    eyes: `
      <rect x="58" y="67" width="19" height="19" fill="#09090b" />
      <rect x="103" y="67" width="19" height="19" fill="#09090b" />
    `,
    mouth: `<rect x="68" y="102" width="44" height="6" rx="3" fill="#09090b" />`,
  },
  thoughtful: {
    eyes: `
      <rect x="58" y="74" width="19" height="6" fill="#09090b" />
      <rect x="103" y="74" width="19" height="6" fill="#09090b" />
      <rect x="54" y="58" width="24" height="4" fill="#09090b" transform="rotate(-8 66 60)" />
    `,
    mouth: `<rect x="83" y="103" width="14" height="4" fill="#09090b" />`,
  },
  focused: {
    eyes: `
      <rect x="56" y="72" width="23" height="8" fill="#09090b" />
      <rect x="101" y="72" width="23" height="8" fill="#09090b" />
    `,
    mouth: `<rect x="76" y="103" width="28" height="4" fill="#09090b" />`,
  },
  graduate: {
    eyes: `
      <rect x="58" y="67" width="19" height="19" fill="#09090b" />
      <rect x="103" y="67" width="19" height="19" fill="#09090b" />
    `,
    mouth: `<rect x="68" y="102" width="44" height="6" rx="3" fill="#09090b" />`,
    extra: `
      <g>
        <rect x="63" y="9" width="54" height="7" fill="#1e1b4b" transform="rotate(-5 90 12)" />
        <rect x="80" y="13" width="20" height="9" fill="#312e81" />
        <rect x="97" y="8" width="3" height="16" fill="#facc15" />
        <rect x="94" y="22" width="9" height="9" fill="#facc15" />
      </g>
    `,
  },
  energetic: {
    eyes: `
      <rect x="60" y="69" width="15" height="15" fill="#09090b" transform="rotate(45 67.5 76.5)" />
      <rect x="105" y="69" width="15" height="15" fill="#09090b" transform="rotate(45 112.5 76.5)" />
    `,
    mouth: `<rect x="72" y="97" width="36" height="15" rx="4" fill="#09090b" />`,
    extra: `
      <g fill="#facc15">
        <rect x="27" y="30" width="8" height="8" transform="rotate(45 31 34)" />
        <rect x="140" y="26" width="7" height="7" transform="rotate(45 143.5 29.5)" />
      </g>
    `,
  },
  presenting: {
    eyes: `
      <rect x="58" y="67" width="19" height="19" fill="#09090b" />
      <rect x="103" y="67" width="19" height="19" fill="#09090b" />
    `,
    mouth: `<rect x="70" y="102" width="40" height="6" rx="3" fill="#09090b" />`,
    extra: `
      <g fill="#c4b5fd">
        <rect x="142" y="40" width="6" height="6" transform="rotate(45 145 43)" />
        <rect x="150" y="55" width="5" height="5" transform="rotate(45 152.5 57.5)" />
      </g>
    `,
  },
  building: {
    eyes: `
      <rect x="58" y="70" width="19" height="13" fill="#09090b" />
      <rect x="103" y="70" width="19" height="13" fill="#09090b" />
    `,
    mouth: `<rect x="80" y="103" width="20" height="4" fill="#09090b" />`,
    extra: `
      <g class="mascot-gear" fill="#a78bfa">
        <rect x="126" y="94" width="12" height="12" />
        <rect x="122" y="98" width="4" height="4" />
        <rect x="138" y="98" width="4" height="4" />
        <rect x="122" y="90" width="4" height="4" />
        <rect x="138" y="90" width="4" height="4" />
        <rect x="130" y="86" width="4" height="4" />
        <rect x="130" y="106" width="4" height="4" />
      </g>
    `,
  },
  friendly: {
    eyes: `
      <rect x="58" y="67" width="19" height="19" fill="#09090b" />
      <rect x="103" y="73" width="19" height="5" fill="#09090b" />
    `,
    mouth: `<rect x="66" y="101" width="48" height="7" rx="3.5" fill="#09090b" />`,
  },
};

export function renderMascot(expression = "curious") {
  const gradientId = `cinema-mascot-gradient-${instances++}`;
  const parts = EXPRESSIONS[expression] ?? EXPRESSIONS.curious;

  return `
    <svg viewBox="10 0 160 130" role="img" aria-hidden="true" focusable="false" class="block h-full w-full">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="55%" stop-color="#7c3aed" />
          <stop offset="100%" stop-color="#4c1d95" />
        </linearGradient>
      </defs>
      <polygon
        points="${HEAD_POINTS}"
        fill="url(#${gradientId})"
        stroke="#c4b5fd"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
      ${parts.eyes}
      ${parts.mouth}
      ${parts.extra ?? ""}
    </svg>
  `;
}
