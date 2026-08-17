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
          class="grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text)] backdrop-blur-[10px] transition duration-200 hover:-translate-y-[3px] hover:border-[rgba(var(--accent-rgb),0.38)] hover:bg-[rgba(var(--accent-rgb),0.16)] hover:text-white [&_svg]:h-5 [&_svg]:w-5"
        >
          ${renderBrandIcon(icon)}
        </a>
      `
    )
    .join("");
}

function render() {
  return `
    <section class="flex flex-col items-center text-center">

      <div class="mb-4 grid h-[92px] w-[92px] place-items-center overflow-hidden rounded-full border border-white/[0.18] bg-[linear-gradient(145deg,#303030,#181818)] shadow-[0_20px_50px_rgba(0,0,0,0.45),inset_0_1px_rgba(255,255,255,0.12)] sm:h-[104px] sm:w-[104px]">
        <img src="${profile.avatar}" alt="${profile.name}" class="h-full w-full object-cover" />
      </div>

      <h1 class="m-0 text-[clamp(1.7rem,5vw,2rem)] font-[750] leading-[1.1] tracking-[-0.045em] text-[var(--text)]">${profile.name}</h1>

      <p class="mt-[7px] text-sm font-medium text-[var(--muted)]">${profile.role}</p>

      <p class="mt-2.5 w-[min(100%,460px)] max-w-[330px] text-[0.84rem] leading-[1.55] text-[var(--muted)] sm:max-w-none sm:text-[0.9rem]">${profile.description}</p>


      <!-- Social links -->
      <nav class="mt-[18px] flex gap-[11px]" aria-label="Redes sociales">
        ${renderSocialLinks()}
      </nav>

    </section>
  `;
}

export default { render };
