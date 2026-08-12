import { profile } from "../data/profile.js";
import { socialLinks } from "../data/social-links.js";
import { renderBrandIcon } from "../icons/brands.js";

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

function render() {
  return `
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
  `;
}

export default { render };
