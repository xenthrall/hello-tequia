import { links } from "../data/links.js";
import { renderBrandIcon, brandIconAccentClass } from "../icons/brands.js";
import { uiIcons } from "../icons/ui.js";

const cardBaseClasses =
  "border border-[var(--border)] text-[var(--text)] no-underline shadow-[0_10px_35px_rgba(0,0,0,0.12),inset_0_1px_rgba(255,255,255,0.035)] backdrop-blur-[18px] transition duration-200 hover:-translate-y-[3px] hover:border-[rgba(255,255,255,0.18)] hover:bg-[var(--card-hover)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.22),inset_0_1px_rgba(255,255,255,0.06)] active:scale-[0.985]";

function renderFeaturedLink(link) {
  return `
    <a
      href="${link.url}"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative block overflow-hidden rounded-2xl bg-[var(--card)] sm:rounded-[18px] ${cardBaseClasses}"
    >
      <div class="relative flex h-[190px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.38),transparent_55%),#030303] sm:h-[210px] before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(120deg,transparent_25%,rgba(255,255,255,0.06),transparent_75%)] before:transition-transform before:duration-700 before:content-[''] group-hover:before:translate-x-full">
        <div class="pixel-art">
          <div class="pixel-head"></div>
          <div class="pixel-eye pixel-eye-left"></div>
          <div class="pixel-eye pixel-eye-right"></div>
          <div class="pixel-mouth"></div>
        </div>
      </div>

      <div class="flex flex-col items-center px-[50px] pb-4 pt-[14px]">
        <span class="text-[0.95rem] font-semibold">${link.title}</span>
        <span class="mt-[3px] hidden text-[0.78rem] text-[var(--muted)] sm:block">${link.description ?? ""}</span>
      </div>

      <span class="absolute right-4 top-[14px] grid h-8 w-8 -translate-x-1 translate-y-1 place-items-center rounded-full bg-white/[0.08] text-[#d4d4d4] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">${uiIcons.arrow}</span>
    </a>
  `;
}

function renderStandardLink(link) {
  const iconMarkup = link.icon
    ? `<div class="mr-[13px] grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.08] sm:h-12 sm:w-12 sm:rounded-[14px] [&_svg]:h-[23px] [&_svg]:w-[23px] ${brandIconAccentClass(link.icon)}">${renderBrandIcon(link.icon)}</div>`
    : `<div class="mr-[13px] grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(145deg,#8b5cf6,#4c1d95)] text-white font-extrabold sm:h-12 sm:w-12 sm:rounded-[14px]">${link.title.charAt(0).toUpperCase()}</div>`;

  return `
    <a
      href="${link.url}"
      target="_blank"
      rel="noopener noreferrer"
      class="relative flex min-h-[64px] items-center rounded-2xl bg-[var(--card)] py-2.5 pl-2.5 pr-[18px] sm:min-h-[70px] sm:rounded-[18px] ${cardBaseClasses}"
    >
      ${iconMarkup}

      <span class="text-[0.94rem] font-[550]">${link.title}</span>

      <span class="ml-auto text-[1.3rem] leading-none text-[#8a8a8a]" aria-hidden="true">${uiIcons.menu}</span>
    </a>
  `;
}

function render() {
  return `
    <section class="mt-[26px] flex flex-col gap-3 sm:mt-[30px]" aria-label="Enlaces">
      ${links.map((link) => (link.featured ? renderFeaturedLink(link) : renderStandardLink(link))).join("")}
    </section>
  `;
}

export default { render };
