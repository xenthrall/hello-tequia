import "./style.css";

import { profile } from "./data/profile.js";
import { uiIcons } from "./icons/ui.js";
import { initChatbot } from "./chatbot/chatbot.js";
import { initMusicPlayer } from "./music/music-player.js";
import { initCinema } from "./cinema/cinema.js";
import { renderSections, initSections } from "./sections/index.js";

const iconButtonClasses =
  "grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text)] backdrop-blur-[14px] transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[var(--card-hover)] active:scale-[0.94] disabled:pointer-events-none disabled:cursor-default disabled:opacity-40 sm:h-[42px] sm:w-[42px] [&_svg]:h-[19px] [&_svg]:w-[19px] [&_svg]:animate-[icon-pop_260ms_ease]";

document.querySelector("#app").innerHTML = `
  <main class="page-shell relative isolate min-h-screen overflow-hidden">

    <!-- Background decoration -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute left-1/2 top-[-250px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#8b5cf6] opacity-[0.18] blur-[100px]"></div>
      <div class="absolute bottom-[-180px] right-[-260px] h-[420px] w-[420px] rounded-full bg-[#2563eb] opacity-[0.18] blur-[100px]"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="mx-auto w-[min(100%-24px,520px)] pb-[42px] pt-4 sm:w-[min(100%-32px,680px)] sm:pt-6">

      <!-- Top actions -->
      <header class="mb-[14px] flex items-center justify-center gap-2.5 sm:mb-[18px]">
        <button
          class="${iconButtonClasses}"
          type="button"
          aria-label="Reproducir música"
          id="music-toggle"
        >
          ${uiIcons.musicNote}
        </button>

        <button
          class="${iconButtonClasses}"
          type="button"
          aria-label="Cambiar apariencia"
          id="theme-toggle"
        >
          ${uiIcons.theme}
        </button>
      </header>


      ${renderSections()}


      <!-- Footer -->
      <footer class="mt-9 flex flex-col items-center pb-[14px] text-center text-[0.7rem] text-[var(--muted)] sm:mt-[46px] sm:pb-0">
        <p class="m-0">© ${new Date().getFullYear()} ${profile.name}</p>

        <div class="mt-2 flex gap-[7px]">
          <a href="#" class="text-[var(--soft)] no-underline hover:text-[var(--muted)]">Privacy</a>
          <span>•</span>
          <a href="#" class="text-[var(--soft)] no-underline hover:text-[var(--muted)]">Terms</a>
        </div>

        <span class="mt-3 text-[0.72rem] font-[650] tracking-[0.08em] text-[var(--soft)]">tequia.dev</span>
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

// Modo cine (capa inmersiva que aparece mientras suena la música)
initCinema();

// Section-specific behavior (e.g. contact form submission)
initSections();
