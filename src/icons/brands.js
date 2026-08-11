// Convierte un objeto de icono de simple-icons (siGithub, siInstagram, ...)
// en un <svg> accesible que hereda su color desde CSS vía currentColor.
export function renderBrandIcon(icon) {
  return `
    <svg viewBox="0 0 24 24" role="img" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="${icon.path}" />
    </svg>
  `;
}

// Clase CSS derivada del slug del icono (p.ej. "github" -> "github-icon"),
// usada para permitir branding puntual por icono en style.css.
export function brandIconClass(icon) {
  return `${icon.slug}-icon`;
}
