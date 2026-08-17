import { renderMascotIcon } from "../icons/mascot.js";
import { uiIcons } from "../icons/ui.js";

const els = {};

const chatInputClasses =
  "min-w-0 flex-1 rounded-[14px] border-none bg-[var(--card)] px-3 py-2.5 text-[0.86rem] text-[var(--text)] outline-none placeholder:text-[var(--muted)]";

function mascot(sizeClasses) {
  return `<span class="inline-flex shrink-0 ${sizeClasses}" aria-hidden="true">${renderMascotIcon()}</span>`;
}

function renderLinks(links = []) {
  if (!links.length) return "";

  return `
    <div class="mt-2 flex flex-wrap gap-1.5">
      ${links
        .map(
          (link) => `
            <a
              href="${link.url}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 rounded-full border border-[rgba(var(--accent-rgb),0.35)] bg-[rgba(var(--accent-rgb),0.12)] px-2.5 py-[5px] text-[0.75rem] font-semibold text-[var(--text)] no-underline transition duration-150 hover:-translate-y-px hover:bg-[rgba(var(--accent-rgb),0.22)]"
            >
              ${link.label} ${uiIcons.arrow}
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

export function mountChatWidget() {
  const root = document.createElement("div");
  root.className = "chat-widget";

  root.innerHTML = `
    <button
      id="chat-toggle"
      class="chat-fab fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-[max(16px,env(safe-area-inset-right))] z-[61] grid h-[58px] w-[58px] cursor-pointer place-items-center rounded-full border border-white/[0.14] bg-[radial-gradient(circle_at_32%_28%,#a78bfa,#6d28d9_60%,#312e81)] shadow-[0_16px_40px_rgba(76,29,149,0.45),inset_0_1px_rgba(255,255,255,0.25)] transition duration-200 hover:-translate-y-[3px] hover:shadow-[0_20px_50px_rgba(76,29,149,0.55),inset_0_1px_rgba(255,255,255,0.3)] active:scale-[0.94] sm:bottom-[22px] sm:right-[22px]"
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="chat-panel"
      aria-label="Abrir el asistente de Jhon"
    >
      <span class="pointer-events-none absolute inset-0 animate-[chat-fab-pulse_2.6s_ease-out_infinite] rounded-[inherit] bg-[rgba(139,92,246,0.45)]" aria-hidden="true"></span>
      ${mascot("h-[26px] w-[30px]")}
    </button>

    <section
      id="chat-panel"
      class="chat-panel invisible fixed inset-0 z-[62] flex h-dvh w-screen origin-bottom-right translate-y-[18px] flex-col overflow-hidden rounded-none border border-[var(--border)] bg-[var(--background)] bg-[linear-gradient(180deg,var(--card),var(--background)_60%)] opacity-0 shadow-[0_30px_70px_rgba(0,0,0,0.45),inset_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[22px] transition-[opacity,transform,visibility] duration-[220ms] sm:inset-auto sm:bottom-[92px] sm:right-[22px] sm:h-auto sm:w-[min(380px,calc(100vw-32px))] sm:max-h-[min(600px,calc(100dvh-130px))] sm:translate-y-[14px] sm:scale-[0.96] sm:rounded-[22px]"
      role="dialog"
      aria-label="Asistente de Jhon"
      aria-hidden="true"
    >
      <header class="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-4 pb-[14px] pt-[calc(16px+env(safe-area-inset-top))]">
        <div class="flex items-center gap-2.5">
          ${mascot("h-[26px] w-[30px]")}
          <div>
            <p class="m-0 text-[0.92rem] font-bold tracking-[-0.01em] text-[var(--text)]">Jhon's Assistant</p>
            <p class="mt-[2px] flex items-center gap-[5px] text-[0.72rem] text-[var(--muted)]">
              <span class="h-1.5 w-1.5 rounded-full bg-[#22c55e] shadow-[0_0_0_3px_rgba(34,197,94,0.18)]" aria-hidden="true"></span>En línea
            </p>
          </div>
        </div>

        <button
          id="chat-close"
          class="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[var(--border)] bg-transparent text-[var(--text)] transition duration-200 hover:rotate-90 hover:bg-[var(--card-hover)] [&_svg]:h-[15px] [&_svg]:w-[15px]"
          type="button"
          aria-label="Cerrar asistente"
        >
          ${uiIcons.close}
        </button>
      </header>

      <div id="chat-messages" class="flex flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-[18px]" role="log" aria-live="polite" aria-atomic="false"></div>

      <form
        id="chat-form"
        class="flex shrink-0 items-center gap-2 border-t border-[var(--border)] p-3 pb-[calc(12px+env(safe-area-inset-bottom))] focus-within:rounded-2xl focus-within:ring-2 focus-within:ring-[rgba(var(--accent-rgb),0.3)]"
        autocomplete="off"
      >
        <input
          id="chat-input"
          class="${chatInputClasses}"
          type="text"
          name="message"
          placeholder="Escribe un mensaje..."
          aria-label="Escribe tu mensaje para el asistente"
        />
        <button
          id="chat-send"
          class="grid h-[38px] w-[38px] shrink-0 cursor-pointer place-items-center rounded-full border-none bg-[linear-gradient(145deg,#a78bfa,#6d28d9)] text-white transition duration-200 hover:enabled:-translate-y-0.5 hover:enabled:scale-[1.04] active:enabled:scale-[0.92] disabled:cursor-default disabled:opacity-40 [&_svg]:h-4 [&_svg]:w-4"
          type="submit"
          aria-label="Enviar mensaje"
          disabled
        >
          ${uiIcons.send}
        </button>
      </form>
    </section>
  `;

  document.body.append(root);

  els.root = root;
  els.toggle = root.querySelector("#chat-toggle");
  els.panel = root.querySelector("#chat-panel");
  els.close = root.querySelector("#chat-close");
  els.messages = root.querySelector("#chat-messages");
  els.form = root.querySelector("#chat-form");
  els.input = root.querySelector("#chat-input");
  els.send = root.querySelector("#chat-send");

  return els;
}

export function scrollMessagesToBottom() {
  els.messages.scrollTo({ top: els.messages.scrollHeight, behavior: "smooth" });
}

const bubbleShadow = "shadow-[0_8px_20px_rgba(0,0,0,0.1)]";
const dotClasses =
  "h-1.5 w-1.5 rounded-full bg-[var(--soft)] [animation:chat-typing-bounce_1.1s_ease-in-out_infinite] [&:nth-child(2)]:[animation-delay:0.15s] [&:nth-child(3)]:[animation-delay:0.3s]";

export function appendMessage({ role, text, links = [] }) {
  const isUser = role === "user";

  const wrapper = document.createElement("div");
  wrapper.className = `flex max-w-[88%] gap-2 [animation:chat-msg-in_260ms_ease_both] ${
    isUser ? "flex-row-reverse self-end" : "self-start"
  }`;

  const bubbleClasses = isUser
    ? `rounded-[16px_16px_4px_16px] border border-[rgba(var(--accent-rgb),0.35)] bg-[rgba(var(--accent-rgb),0.16)] px-[13px] py-2.5 ${bubbleShadow}`
    : `rounded-[16px_16px_16px_4px] border border-[var(--border)] bg-[var(--card)] px-[13px] py-2.5 ${bubbleShadow}`;

  wrapper.innerHTML = `
    ${role === "bot" ? mascot("mt-[3px] h-[19px] w-[22px]") : ""}
    <div class="${bubbleClasses}">
      <p class="m-0 text-[0.86rem] leading-[1.5] text-[var(--text)]">${text}</p>
      ${renderLinks(links)}
    </div>
  `;

  els.messages.append(wrapper);
  scrollMessagesToBottom();

  return wrapper;
}

export function appendQuickReplies(questions, onSelect) {
  if (!questions?.length) return null;

  const wrapper = document.createElement("div");
  wrapper.className = "ml-[30px] flex flex-wrap gap-[7px]";

  questions.forEach((question) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "cursor-pointer rounded-full border border-[var(--border)] bg-[var(--card)] px-[13px] py-[7px] text-[0.78rem] font-semibold text-[var(--text)] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(var(--accent-rgb),0.4)] hover:bg-[rgba(var(--accent-rgb),0.14)]";
    button.textContent = question;
    button.addEventListener("click", () => onSelect(question));
    wrapper.append(button);
  });

  els.messages.append(wrapper);
  scrollMessagesToBottom();

  return wrapper;
}

export function showTypingIndicator() {
  const wrapper = document.createElement("div");
  wrapper.className = "flex max-w-[88%] gap-2 self-start";

  wrapper.innerHTML = `
    ${mascot("mt-[3px] h-[19px] w-[22px]")}
    <div
      class="flex items-center gap-1 rounded-[16px_16px_16px_4px] border border-[var(--border)] bg-[var(--card)] px-[14px] py-[13px] ${bubbleShadow}"
      role="status"
      aria-label="El asistente está escribiendo"
    >
      <span class="${dotClasses}"></span><span class="${dotClasses}"></span><span class="${dotClasses}"></span>
    </div>
  `;

  els.messages.append(wrapper);
  scrollMessagesToBottom();

  return wrapper;
}

export function removeNode(node) {
  node?.remove();
}

export function openPanel() {
  els.panel.classList.add("is-open");
  els.panel.setAttribute("aria-hidden", "false");
  els.toggle.setAttribute("aria-expanded", "true");
  els.toggle.classList.add("is-active");
  els.toggle.setAttribute("aria-label", "Cerrar el asistente de Jhon");

  window.requestAnimationFrame(() => els.input.focus());
}

export function closePanel() {
  els.panel.classList.remove("is-open");
  els.panel.setAttribute("aria-hidden", "true");
  els.toggle.setAttribute("aria-expanded", "false");
  els.toggle.classList.remove("is-active");
  els.toggle.setAttribute("aria-label", "Abrir el asistente de Jhon");

  els.toggle.focus();
}

export function isPanelOpen() {
  return els.panel.classList.contains("is-open");
}

export function setSendEnabled(enabled) {
  els.send.disabled = !enabled;
}
