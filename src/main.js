import "./style.css";

import { profile } from "./data/profile.js";
import { socialLinks } from "./data/social-links.js";
import { links } from "./data/links.js";
import { renderBrandIcon, brandIconClass } from "./icons/brands.js";
import { uiIcons } from "./icons/ui.js";

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
          aria-label="Cambiar apariencia"
          id="theme-toggle"
        >
          ${uiIcons.theme}
        </button>

        <button
          class="icon-button"
          type="button"
          aria-label="Compartir perfil"
          id="share-button"
        >
          ${uiIcons.share}
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

// Share button
const shareButton = document.querySelector("#share-button");

shareButton?.addEventListener("click", async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: profile.name,
        text: "Conoce mis proyectos, servicios y enlaces.",
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);

      shareButton.classList.add("copied");

      setTimeout(() => {
        shareButton.classList.remove("copied");
      }, 1500);
    }
  } catch {
    // User cancelled sharing.
  }
});

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
