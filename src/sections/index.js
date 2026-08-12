import profileSection from "./profile.js";
import projectsSection from "./projects.js";
import linksSection from "./links.js";
import contactSection from "./contact.js";

// Registro central de las secciones de la página: define su orden y si se
// muestran o no. Para ocultar una sección sin borrar su código, cambia su
// `enabled` a false — no se renderiza ni se inicializa.
export const sections = [
  { id: "profile", enabled: true, ...profileSection },
  { id: "projects", enabled: true, ...projectsSection },
  { id: "links", enabled: true, ...linksSection },
  { id: "contact", enabled: true, ...contactSection },
];

function enabledSections() {
  return sections.filter((section) => section.enabled);
}

// Devuelve el HTML de todas las secciones habilitadas, en orden.
export function renderSections() {
  return enabledSections()
    .map((section) => section.render())
    .join("");
}

// Ejecuta el `init()` de cada sección habilitada que lo tenga (p.ej. el
// formulario de contacto), una vez el HTML ya está montado en el DOM.
export function initSections() {
  enabledSections().forEach((section) => section.init?.());
}
