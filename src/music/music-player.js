import { uiIcons } from "../icons/ui.js";
import { enterCinema, pauseCinema } from "../cinema/cinema.js";

const CATALOG_URL = "/music.json";
const BUTTON_ID = "music-toggle";

// El reproductor no conoce ningún nombre de archivo: siempre resuelve la
// canción a partir del catálogo público. Si music.json crece a varias
// canciones, por ahora se sigue usando la primera como pista inicial.
async function loadFirstTrack() {
  try {
    const response = await fetch(CATALOG_URL);
    if (!response.ok) return null;

    const catalog = await response.json();
    if (!Array.isArray(catalog) || catalog.length === 0) return null;

    const [track] = catalog;
    return track?.src ? track : null;
  } catch {
    return null;
  }
}

export async function initMusicPlayer() {
  const button = document.querySelector(`#${BUTTON_ID}`);
  if (!button) return;

  const track = await loadFirstTrack();

  if (!track) {
    button.disabled = true;
    return;
  }

  const audio = new Audio(track.src);
  audio.preload = "none";

  function setPlaying(isPlaying) {
    button.classList.toggle("is-playing", isPlaying);
    button.classList.toggle("text-[var(--accent)]", isPlaying);
    button.classList.toggle("border-[rgba(var(--accent-rgb),0.4)]", isPlaying);
    button.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música");
    button.innerHTML = isPlaying ? uiIcons.musicPause : uiIcons.musicNote;

    // El avatar reacciona globalmente al estado de reproducción, sin que
    // este módulo necesite conocer su estructura (mismo patrón que
    // "light-mode" para el tema).
    document.documentElement.classList.toggle("music-playing", isPlaying);

    // La música dispara el modo cine: se desvanece toda la UI y la
    // mascota narra el portafolio. Al pausar, el cine se congela en su
    // lugar (para leer con calma) en vez de cerrarse — salir del todo es
    // una acción explícita del usuario (botón "X"/Escape dentro del cine).
    if (isPlaying) {
      enterCinema();
    } else {
      pauseCinema();
    }
  }

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    setPlaying(false);
  });

  audio.addEventListener("error", () => {
    button.disabled = true;
    setPlaying(false);
  });

  button.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // El navegador rechazó play() (p.ej. sin interacción previa).
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  });
}
