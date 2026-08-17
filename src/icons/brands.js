// Convierte un objeto de icono de simple-icons (siGithub, siInstagram, ...)
// en un <svg> accesible que hereda su color desde CSS vía currentColor.
export function renderBrandIcon(icon) {
  return `
    <svg viewBox="0 0 24 24" role="img" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="${icon.path}" />
    </svg>
  `;
}

// Color de marca puntual por icono (p.ej. WhatsApp en su verde característico).
// Los slugs sin entrada aquí simplemente heredan el color del texto.
const brandAccentColors = {
  whatsapp: "text-[#25d366]",
};

export function brandIconAccentClass(icon) {
  return brandAccentColors[icon.slug] ?? "";
}
