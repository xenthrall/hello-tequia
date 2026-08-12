import "./style.css";

import { profile } from "./data/profile.js";
import { socialLinks } from "./data/social-links.js";
import { links } from "./data/links.js";
import { projects } from "./data/projects.js";
import { renderBrandIcon, brandIconClass } from "./icons/brands.js";
import { uiIcons } from "./icons/ui.js";
import { initChatbot } from "./chatbot/chatbot.js";
import { initMusicPlayer } from "./music/music-player.js";

function renderSocialLinks() {
  return socialLinks
    .map(
      ({ name, url, icon }) => `
        <a
          href="${url}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${name}"
          class="social-button"
        >
          ${renderBrandIcon(icon)}
        </a>
      `
    )
    .join("");
}

function renderFeaturedLink(link) {
  return `
    <a
      href="${link.url}"
      target="_blank"
      rel="noopener noreferrer"
      class="link-card link-card-featured"
    >
      <div class="featured-image">
        <div class="pixel-art">
          <div class="pixel-head"></div>
          <div class="pixel-eye pixel-eye-left"></div>
          <div class="pixel-eye pixel-eye-right"></div>
          <div class="pixel-mouth"></div>
        </div>
      </div>

      <div class="featured-content">
        <span class="featured-label">${link.title}</span>
        <span class="featured-description">${link.description ?? ""}</span>
      </div>

      <span class="link-arrow">${uiIcons.arrow}</span>
    </a>
  `;
}

function renderStandardLink(link) {
  const iconMarkup = link.icon
    ? `<div class="link-icon ${brandIconClass(link.icon)}">${renderBrandIcon(link.icon)}</div>`
    : `<div class="link-icon brand-icon">${link.title.charAt(0).toUpperCase()}</div>`;

  return `
    <a
      href="${link.url}"
      target="_blank"
      rel="noopener noreferrer"
      class="link-card"
    >
      ${iconMarkup}

      <span>${link.title}</span>

      <span class="link-menu" aria-hidden="true">${uiIcons.menu}</span>
    </a>
  `;
}

function renderLinks() {
  return links
    .map((link) => (link.featured ? renderFeaturedLink(link) : renderStandardLink(link)))
    .join("");
}

function renderProjectTechnologies(technologies) {
  return technologies
    .map(
      ({ name, icon }) => `
        <span
          class="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-[11px] text-[var(--muted)] [&_svg]:h-3 [&_svg]:w-3"
          title="${name}"
        >
          ${renderBrandIcon(icon)}
          ${name}
        </span>
      `
    )
    .join("");
}

function renderProjectCard(project) {
  const tag = project.url ? "a" : "div";
  const linkAttrs = project.url
    ? `href="${project.url}" target="_blank" rel="noopener noreferrer"`
    : "";

  const featuredClasses = project.featured
    ? "border-[rgb(var(--accent-rgb)/0.3)] hover:border-[rgb(var(--accent-rgb)/0.5)]"
    : "border-[var(--border)]";

  return `
    <${tag}
      ${linkAttrs}
      class="group relative flex flex-col gap-3 rounded-2xl border bg-[var(--card)] p-4 text-inherit no-underline shadow-[0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--card-hover)] ${featuredClasses}"
    >
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-sm font-semibold text-[var(--text)]">${project.title}</h3>

        ${
          project.featured
            ? `<span class="shrink-0 text-amber-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.45)]" title="Proyecto destacado">
                <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4" aria-hidden="true" focusable="false">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span class="sr-only">Proyecto destacado</span>
              </span>`
            : ""
        }
      </div>

      <p class="text-xs leading-relaxed text-[var(--muted)]">${project.description}</p>

      <div class="mt-auto flex flex-wrap gap-1.5">
        ${renderProjectTechnologies(project.technologies)}
      </div>

      ${
        project.url
          ? `<span class="absolute bottom-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-[var(--card-hover)] text-[var(--muted)] opacity-0 transition duration-200 group-hover:opacity-100" aria-hidden="true">${uiIcons.arrow}</span>`
          : ""
      }
    </${tag}>
  `;
}

function renderProjects() {
  return projects.map((project) => renderProjectCard(project)).join("");
}

document.querySelector("#app").innerHTML = `
  <main class="page-shell">

    <!-- Background decoration -->
    <div class="background-decoration" aria-hidden="true">
      <div class="glow glow-one"></div>
      <div class="glow glow-two"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="profile-container">

      <!-- Top actions -->
      <header class="top-bar">
        <button
          class="icon-button"
          type="button"
          aria-label="Reproducir música"
          id="music-toggle"
        >
          ${uiIcons.musicNote}
        </button>

        <button
          class="icon-button"
          type="button"
          aria-label="Cambiar apariencia"
          id="theme-toggle"
        >
          ${uiIcons.theme}
        </button>
      </header>


      <!-- Profile -->
      <section class="profile">

        <div class="avatar">
          <img src="${profile.avatar}" alt="${profile.name}" />
        </div>

        <h1>${profile.name}</h1>

        <p class="profile-role">${profile.role}</p>

        <p class="profile-description">${profile.description}</p>


        <!-- Social links -->
        <nav class="social-links" aria-label="Redes sociales">
          ${renderSocialLinks()}
        </nav>

      </section>


      <!-- Projects -->
      <section class="mt-8" aria-label="Proyectos">
        <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--soft)]">
          Proyectos
        </h2>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          ${renderProjects()}
        </div>
      </section>


      <!-- Links -->
      <section class="links-section" aria-label="Enlaces">
        ${renderLinks()}
      </section>


      <!-- Footer -->
      <footer class="footer">
        <p>© ${new Date().getFullYear()} ${profile.name}</p>

        <div class="footer-links">
          <a href="#">Privacy</a>
          <span>•</span>
          <a href="#">Terms</a>
        </div>

        <span class="footer-brand">tequia.dev</span>
      </footer>

    </div>

  </main>
`;

// Theme toggle with persisted preference
const themeToggle = document.querySelector("#theme-toggle");

themeToggle?.addEventListener("click", () => {
  const isLight = document.documentElement.classList.toggle("light-mode");

  try {
    localStorage.setItem("theme", isLight ? "light" : "dark");
  } catch {
    // Storage unavailable (e.g. private browsing).
  }
});

// Jhon's Assistant
initChatbot();

// Music player
initMusicPlayer();
