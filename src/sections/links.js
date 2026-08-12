import { links } from "../data/links.js";
import { renderBrandIcon, brandIconClass } from "../icons/brands.js";
import { uiIcons } from "../icons/ui.js";

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

function render() {
  return `
    <section class="links-section" aria-label="Enlaces">
      ${links.map((link) => (link.featured ? renderFeaturedLink(link) : renderStandardLink(link))).join("")}
    </section>
  `;
}

export default { render };
