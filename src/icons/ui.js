import tablerPlayerPlay from "@tabler/icons/outline/player-play.svg?raw";
import tablerPlayerPause from "@tabler/icons/outline/player-pause.svg?raw";

// Los SVG de @tabler/icons traen width/height fijos (24) y sin
// aria-hidden; los adaptamos al mismo patrón que el resto de estos
// iconos (tamaño lo decide el contenedor, decorativos para lectores
// de pantalla).
function fromTabler(svg) {
  return svg.replace(/\s(width|height)="24"/g, "").replace("<svg", '<svg aria-hidden="true" focusable="false"');
}

// Iconos propios de la interfaz (no son iconos de marca).
// Usan stroke/fill="currentColor" para adaptarse a dark/light mode.
export const uiIcons = {
  theme: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 3v2M12 19v2M5.64 5.64l1.42 1.42M16.94 16.94l1.42 1.42M3 12h2M19 12h2M5.64 18.36l1.42-1.42M16.94 7.06l1.42-1.42"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8" />
    </svg>
  `,
  arrow: "↗",
  menu: "⋮",
  musicNote: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M9 17V5.5l9-2v11.5"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="6.5" cy="17" r="2.5" stroke="currentColor" stroke-width="1.8" />
      <circle cx="15.5" cy="15" r="2.5" stroke="currentColor" stroke-width="1.8" />
    </svg>
  `,
  musicPause: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
    </svg>
  `,
  close: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  `,
  send: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4 12 20 5l-6.5 16-2.5-6.5L4 12Z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
  `,
  // De @tabler/icons: se usan para el control de reproducir/pausar dentro
  // del modo cine, donde un ícono de "play" claro comunica mejor "reanudar"
  // que reutilizar el ícono de nota musical del botón real.
  playerPlay: fromTabler(tablerPlayerPlay),
  playerPause: fromTabler(tablerPlayerPause),
};
