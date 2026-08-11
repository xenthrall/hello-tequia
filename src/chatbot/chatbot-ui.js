import { renderMascotIcon } from "../icons/mascot.js";
import { uiIcons } from "../icons/ui.js";

const els = {};

function mascot(sizeClass) {
  return `<span class="chat-mascot ${sizeClass}" aria-hidden="true">${renderMascotIcon()}</span>`;
}

function renderLinks(links = []) {
  if (!links.length) return "";

  return `
    <div class="chat-msg-links">
      ${links
        .map(
          (link) => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="chat-msg-link">
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
      class="chat-fab"
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="chat-panel"
      aria-label="Abrir el asistente de Jhon"
    >
      <span class="chat-fab-pulse" aria-hidden="true"></span>
      ${mascot("chat-mascot-fab")}
    </button>

    <section
      id="chat-panel"
      class="chat-panel"
      role="dialog"
      aria-label="Asistente de Jhon"
      aria-hidden="true"
    >
      <header class="chat-header">
        <div class="chat-header-identity">
          ${mascot("chat-mascot-header")}
          <div>
            <p class="chat-title">Jhon's Assistant</p>
            <p class="chat-subtitle"><span class="chat-status-dot" aria-hidden="true"></span>En línea</p>
          </div>
        </div>

        <button id="chat-close" class="chat-close" type="button" aria-label="Cerrar asistente">
          ${uiIcons.close}
        </button>
      </header>

      <div id="chat-messages" class="chat-messages" role="log" aria-live="polite" aria-atomic="false"></div>

      <form id="chat-form" class="chat-input-row" autocomplete="off">
        <input
          id="chat-input"
          class="chat-input"
          type="text"
          name="message"
          placeholder="Escribe un mensaje..."
          aria-label="Escribe tu mensaje para el asistente"
        />
        <button id="chat-send" class="chat-send" type="submit" aria-label="Enviar mensaje" disabled>
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

export function appendMessage({ role, text, links = [] }) {
  const wrapper = document.createElement("div");
  wrapper.className = `chat-msg chat-msg-${role}`;

  wrapper.innerHTML = `
    ${role === "bot" ? mascot("chat-mascot-msg") : ""}
    <div class="chat-bubble">
      <p>${text}</p>
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
  wrapper.className = "chat-quick-replies";

  questions.forEach((question) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chat-chip";
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
  wrapper.className = "chat-msg chat-msg-bot chat-msg-typing";

  wrapper.innerHTML = `
    ${mascot("chat-mascot-msg")}
    <div class="chat-bubble chat-typing" role="status" aria-label="El asistente está escribiendo">
      <span></span><span></span><span></span>
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
