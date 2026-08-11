import { respond } from "./chatbot-engine.js";
import { openingQuickReplies } from "./chatbot-data.js";
import {
  mountChatWidget,
  appendMessage,
  appendQuickReplies,
  showTypingIndicator,
  removeNode,
  openPanel,
  closePanel,
  isPanelOpen,
  setSendEnabled,
} from "./chatbot-ui.js";

async function handleUserMessage(rawMessage) {
  const message = rawMessage.trim();
  if (!message) return;

  appendMessage({ role: "user", text: message });

  const typingIndicator = showTypingIndicator();
  const reply = await respond(message);
  removeNode(typingIndicator);

  appendMessage({ role: "bot", text: reply.text, links: reply.links });

  if (reply.quickReplies?.length) {
    appendQuickReplies(reply.quickReplies, handleUserMessage);
  }
}

function showWelcomeMessage() {
  appendMessage({
    role: "bot",
    text: "Hola, soy el asistente de Jhon. Pregúntame sobre sus proyectos, experiencia, tecnologías o formas de contacto.",
  });

  appendQuickReplies(openingQuickReplies, handleUserMessage);
}

export function initChatbot() {
  const els = mountChatWidget();
  let hasGreeted = false;

  function toggle() {
    if (isPanelOpen()) {
      closePanel();
      return;
    }

    openPanel();

    if (!hasGreeted) {
      hasGreeted = true;
      showWelcomeMessage();
    }
  }

  els.toggle.addEventListener("click", toggle);
  els.close.addEventListener("click", closePanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isPanelOpen()) {
      closePanel();
    }
  });

  els.input.addEventListener("input", () => {
    setSendEnabled(els.input.value.trim().length > 0);
  });

  els.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = els.input.value;
    if (!message.trim()) return;

    els.input.value = "";
    setSendEnabled(false);

    handleUserMessage(message);
  });
}
