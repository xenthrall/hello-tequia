import { intents, fallbackResponse } from "./chatbot-data.js";

// Palabras/frases de 4 caracteres o menos solo cuentan como coincidencia si
// aparecen como palabra completa, para evitar falsos positivos (p.ej. "sena"
// dentro de "enseña").
const WHOLE_WORD_MAX_LENGTH = 4;

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchIntent(message) {
  const normalizedMessage = normalize(message);
  if (!normalizedMessage) return null;

  const messageWords = normalizedMessage.split(" ");

  let bestIntent = null;
  let bestScore = 0;

  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalize(keyword);

      const isMatch =
        normalizedKeyword.length <= WHOLE_WORD_MAX_LENGTH
          ? messageWords.includes(normalizedKeyword)
          : normalizedMessage.includes(normalizedKeyword);

      if (isMatch && normalizedKeyword.length > bestScore) {
        bestScore = normalizedKeyword.length;
        bestIntent = intent;
      }
    }
  }

  return bestIntent;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MIN_DELAY_MS = 450;
const MAX_DELAY_MS = 900;

// FASE 1: motor de respuestas 100% local, basado en coincidencia de
// keywords sobre `intents` (chatbot-data.js). No hace llamadas de red.
//
// FASE 2 (futuro): este archivo es el único punto que debería cambiar para
// delegar en un proveedor de IA. `chatbot.js` y `chatbot-ui.js` no necesitan
// modificarse porque siguen consumiendo `respond(message)` con el mismo
// contrato de salida. Por ejemplo:
//
//   export async function respond(message) {
//     const res = await fetch("https://mi-worker.tequia.dev/chat", {
//       method: "POST",
//       body: JSON.stringify({ message }),
//     });
//     return res.json(); // { text, links?, quickReplies? }
//   }
//
export async function respond(message) {
  // El pequeño delay simula latencia de red para que el typing indicator
  // se sienta natural, y para que el contrato ya sea "async" desde ahora.
  const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
  await wait(delay);

  const intent = matchIntent(message);

  if (!intent) {
    return { ...fallbackResponse };
  }

  return {
    id: intent.id,
    text: intent.response,
    links: intent.links ?? [],
    quickReplies: intent.quickReplies ?? [],
  };
}
