// Controlador del modo cine: monta la capa una sola vez (mismo patrón que
// mountChatWidget en chatbot/chatbot-ui.js).
//
// music-player.js dispara dos acciones distintas:
//   - enterCinema()  cuando la música empieza a sonar (o se reanuda).
//   - pauseCinema()  cuando la música se pausa: la capa NO se oculta, se
//                     congela en el capítulo actual (útil para leer con
//                     calma), y las animaciones en bucle se detienen.
// El botón "X" (o Escape) dentro de la propia capa llama a exitCinema(),
// que oculta la capa, regresa al portafolio normal y pausa la música: la
// música solo suena mientras el modo cine está presente.
import { renderBrandIcon } from "../icons/brands.js";
import { uiIcons } from "../icons/ui.js";
import { renderMascot } from "./mascot-expressions.js";
import { openingScript, loopScript } from "./cinema-script.js";

const TYPE_SPEED_MS = 22;
const MIN_RESUME_MS = 600;

const els = {};
let mounted = false;
let isShown = false; // la capa está visible (corriendo o congelada)
let isRunning = false; // el secuenciador está avanzando capítulos

let currentScript = openingScript;
let chapterIndex = -1;
let currentChapterText = "";

let advanceTimer = null;
let typewriterTimer = null;
let activeWindowStartedAt = 0;
let activeWindowMs = 0;
let savedRemainingMs = null;

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function onKeydown(event) {
  if (event.key === "Escape") exitCinema();
}

function typeText(el, text) {
  clearInterval(typewriterTimer);
  el.textContent = "";
  let i = 0;

  typewriterTimer = setInterval(() => {
    i += 1;
    el.textContent = text.slice(0, i);

    if (i >= text.length) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
    }
  }, TYPE_SPEED_MS);
}

function retriggerAnimation(el, className) {
  if (!el) return;
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}

function renderStageExtra(chapter) {
  if (chapter.kind === "skills" && chapter.chips) {
    return `
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        ${chapter.chips
          .map(
            (chip, i) => `
              <span
                class="cinema-chip rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--text)] backdrop-blur-md sm:text-sm"
                style="--i:${i}"
              >${chip}</span>
            `
          )
          .join("")}
      </div>
    `;
  }

  if (chapter.kind === "project" && chapter.project) {
    const { title, description, technologies, url } = chapter.project;

    return `
      <div class="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-left backdrop-blur-xl sm:p-6">
        <h3 class="text-base font-semibold text-[var(--text)] sm:text-lg">${title}</h3>
        <p class="mt-2 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">${description}</p>
        <div class="mt-4 flex flex-wrap gap-1.5">
          ${technologies
            .map(
              ({ name, icon }) => `
                <span class="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[10px] text-[var(--muted)] [&_svg]:h-3 [&_svg]:w-3">
                  ${renderBrandIcon(icon)}${name}
                </span>
              `
            )
            .join("")}
        </div>
        ${
          url
            ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[rgba(var(--accent-rgb),0.85)] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[var(--accent)] sm:text-sm">Ver proyecto ↗</a>`
            : `<span class="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-2 text-xs text-[var(--soft)]">En construcción</span>`
        }
      </div>
    `;
  }

  if (chapter.kind === "outro" && chapter.ctas?.length) {
    return `
      <div class="flex flex-wrap items-center justify-center gap-3">
        ${chapter.ctas
          .map(
            (cta) => `
              <a
                href="${cta.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-semibold text-[var(--text)] backdrop-blur-md transition hover:bg-[var(--card-hover)] sm:text-sm"
              >${cta.label} ↗</a>
            `
          )
          .join("")}
      </div>
    `;
  }

  return "";
}

function renderChapter(chapter) {
  currentChapterText = chapter.body ?? "";

  els.mascotWrap.innerHTML = renderMascot(chapter.expression);
  els.mascotWrap.className = `cinema-mascot cinema-mascot--${chapter.pose} h-32 w-32 sm:h-44 sm:w-44`;

  els.stageExtra.innerHTML = renderStageExtra(chapter);

  els.kicker.textContent = chapter.kicker ?? "";
  els.title.textContent = chapter.title ?? "";
  typeText(els.typed, currentChapterText);

  retriggerAnimation(els.textBlock, "cinema-text-in");
}

function scheduleAdvance(ms) {
  clearTimeout(advanceTimer);
  activeWindowStartedAt = Date.now();
  activeWindowMs = ms;
  advanceTimer = setTimeout(handleChapterEnd, ms);
}

function handleChapterEnd() {
  let nextIndex = chapterIndex + 1;

  if (nextIndex >= currentScript.length) {
    currentScript = loopScript;
    nextIndex = 0;
  }

  startChapter(nextIndex);
}

function startChapter(index) {
  chapterIndex = index;
  renderChapter(currentScript[index]);
  scheduleAdvance(currentScript[index].duration);
}

function updatePauseToggle() {
  els.pauseToggle.innerHTML = isRunning ? uiIcons.playerPause : uiIcons.playerPlay;
  els.pauseToggle.setAttribute("aria-label", isRunning ? "Pausar música" : "Reanudar música");
}

// Congela el secuenciador donde va: guarda el tiempo restante del capítulo,
// detiene la máquina de escribir (completa el texto) y marca `is-frozen`
// para que las animaciones en bucle (mascota, partículas, chips) se
// detengan vía CSS. La capa permanece visible.
function freeze() {
  if (advanceTimer) {
    const elapsed = Date.now() - activeWindowStartedAt;
    savedRemainingMs = Math.max(MIN_RESUME_MS, activeWindowMs - elapsed);
    clearTimeout(advanceTimer);
    advanceTimer = null;
  }

  if (typewriterTimer) {
    clearInterval(typewriterTimer);
    typewriterTimer = null;
    els.typed.textContent = currentChapterText;
  }

  els.root.classList.add("is-frozen");
  isRunning = false;
  updatePauseToggle();
}

function resumeRunning() {
  els.root.classList.remove("is-frozen");

  if (chapterIndex === -1) {
    startChapter(0);
  } else {
    scheduleAdvance(savedRemainingMs ?? currentScript[chapterIndex].duration);
  }

  isRunning = true;
  updatePauseToggle();
}

function showOverlay() {
  els.root.classList.add("is-open");
  els.root.setAttribute("aria-hidden", "false");
  document.documentElement.classList.add("cinema-active");
  document.addEventListener("keydown", onKeydown);
  isShown = true;
}

function hideOverlay() {
  els.root.classList.remove("is-open");
  els.root.setAttribute("aria-hidden", "true");
  document.documentElement.classList.remove("cinema-active");
  document.removeEventListener("keydown", onKeydown);
  isShown = false;
}

export function mountCinemaLayer() {
  if (mounted) return;
  mounted = true;

  const root = document.createElement("div");
  root.className =
    "cinema-layer invisible fixed inset-0 z-[80] overflow-hidden opacity-0 transition-[opacity,visibility] duration-700";
  root.setAttribute("aria-hidden", "true");

  root.innerHTML = `
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(139,92,246,0.22),transparent_60%),var(--background)]"></div>

    <div class="cinema-particles absolute inset-0" aria-hidden="true">
      ${Array.from({ length: 16 })
        .map((_, i) => `<span class="cinema-particle" style="--i:${i}"></span>`)
        .join("")}
    </div>

    <div class="cinema-letterbox cinema-letterbox-top absolute inset-x-0 top-0"></div>
    <div class="cinema-letterbox cinema-letterbox-bottom absolute inset-x-0 bottom-0"></div>

    <p class="cinema-paused-badge pointer-events-none absolute left-4 top-4 z-10 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--soft)] opacity-0 sm:left-6 sm:top-6">
      Pausado
    </p>

    <div class="absolute right-4 top-4 z-20 flex items-center gap-2 sm:right-6 sm:top-6">
      <button
        type="button"
        class="cinema-pause-toggle grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] backdrop-blur-md transition hover:bg-[var(--card-hover)] hover:text-[var(--text)] [&_svg]:h-4 [&_svg]:w-4"
        aria-label="Pausar música"
      >
        ${uiIcons.playerPause}
      </button>
      <button
        type="button"
        class="cinema-exit grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] backdrop-blur-md transition hover:bg-[var(--card-hover)] hover:text-[var(--text)] [&_svg]:h-4 [&_svg]:w-4"
        aria-label="Salir del modo cine"
      >
        ${uiIcons.close}
      </button>
    </div>

    <div class="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 sm:px-12">
      <div class="flex w-full flex-1 flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
        <div class="cinema-mascot cinema-mascot--center h-32 w-32 sm:h-44 sm:w-44"></div>
        <div class="cinema-stage-extra w-full max-w-xl"></div>
      </div>

      <div class="cinema-text-block w-full max-w-2xl pb-10 text-center sm:pb-16">
        <p class="cinema-kicker mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]"></p>
        <h2 class="cinema-title mb-3 text-2xl font-bold text-[var(--text)] sm:text-4xl"></h2>
        <p class="cinema-body text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          <span class="cinema-typed"></span><span class="cinema-caret"></span>
        </p>
      </div>
    </div>
  `;

  document.body.append(root);

  els.root = root;
  els.mascotWrap = root.querySelector(".cinema-mascot");
  els.stageExtra = root.querySelector(".cinema-stage-extra");
  els.textBlock = root.querySelector(".cinema-text-block");
  els.kicker = root.querySelector(".cinema-kicker");
  els.title = root.querySelector(".cinema-title");
  els.typed = root.querySelector(".cinema-typed");
  els.pauseToggle = root.querySelector(".cinema-pause-toggle");
  els.exitButton = root.querySelector(".cinema-exit");

  // Delega en el botón real: dispara audio.pause()/play(), que a su vez
  // llama pauseCinema()/enterCinema() vía music-player.js.
  els.pauseToggle.addEventListener("click", () => {
    document.querySelector("#music-toggle")?.click();
  });
  els.exitButton.addEventListener("click", exitCinema);
}

export function initCinema() {
  mountCinemaLayer();
}

// La música empezó a sonar (o se reanudó): muestra la capa si estaba
// oculta y (re)arranca el secuenciador desde donde iba.
export function enterCinema() {
  if (!mounted || isRunning || prefersReducedMotion()) return;
  if (!isShown) showOverlay();
  resumeRunning();
}

// La música se pausó: se queda en cinema, congelado, para poder leer con
// calma. No oculta la capa ni toca el portafolio real.
export function pauseCinema() {
  if (!mounted || !isShown || !isRunning) return;
  freeze();
}

// El usuario pidió salir explícitamente (botón "X" o Escape): oculta la
// capa por completo, regresa al portafolio real y pausa la música — la
// música solo debería sonar mientras el modo cine está presente (aunque
// esté congelado).
export function exitCinema() {
  if (!mounted || !isShown) return;

  if (document.documentElement.classList.contains("music-playing")) {
    // Dispara audio.pause() en el reproductor real, que a su vez llama
    // pauseCinema() (congela) antes de que sigamos con hideOverlay().
    document.querySelector("#music-toggle")?.click();
  }

  if (isRunning) freeze();
  hideOverlay();
}
