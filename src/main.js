import "./style.css";

import { profile } from "./data/profile.js";
import { uiIcons } from "./icons/ui.js";
import { initChatbot } from "./chatbot/chatbot.js";
import { initMusicPlayer } from "./music/music-player.js";
import { renderSections, initSections } from "./sections/index.js";

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


      ${renderSections()}


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

// Section-specific behavior (e.g. contact form submission)
initSections();
