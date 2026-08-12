import { siWhatsapp } from "simple-icons";
import { initForm } from "@formspree/ajax";

import { contact } from "../data/contact.js";
import { renderBrandIcon } from "../icons/brands.js";

const whatsappContactUrl = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`;

function renderContactField({ id, name, label, type, required, optional, autocomplete, placeholder }) {
  const isTextarea = type === "textarea";

  const fieldClass = `w-full ${isTextarea ? "resize-none" : ""} rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-transparent focus:ring-2 focus:ring-[rgb(var(--accent-rgb)/0.5)] aria-invalid:border-[var(--danger)] aria-invalid:focus:ring-[rgb(var(--danger-rgb)/0.4)]`;

  const fieldMarkup = isTextarea
    ? `<textarea
        id="${id}"
        name="${name}"
        rows="4"
        ${required ? "required" : ""}
        data-fs-field
        placeholder="${placeholder ?? ""}"
        class="${fieldClass}"
      ></textarea>`
    : `<input
        id="${id}"
        name="${name}"
        type="${type}"
        ${autocomplete ? `autocomplete="${autocomplete}"` : ""}
        ${required ? "required" : ""}
        data-fs-field
        placeholder="${placeholder ?? ""}"
        class="${fieldClass}"
      />`;

  return `
    <div>
      <label for="${id}" class="mb-1.5 block text-xs font-medium text-[var(--muted)]">
        ${label}${optional ? ` <span class="text-[var(--soft)]">(opcional)</span>` : ""}
      </label>

      ${fieldMarkup}

      <p
        data-fs-error="${name}"
        aria-live="polite"
        class="mt-1 hidden text-xs text-[var(--danger)] data-[fs-active]:block"
      ></p>
    </div>
  `;
}

function render() {
  const fields = [
    {
      id: "contact-name",
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
      autocomplete: "name",
      placeholder: "Tu nombre",
    },
    {
      id: "contact-email",
      name: "email",
      label: "Correo electrónico",
      type: "email",
      required: true,
      autocomplete: "email",
      placeholder: "tu@correo.com",
    },
    {
      id: "contact-phone",
      name: "phone",
      label: "Teléfono",
      type: "tel",
      optional: true,
      autocomplete: "tel",
      placeholder: "+57 300 000 0000",
    },
    {
      id: "contact-message",
      name: "message",
      label: "Mensaje",
      type: "textarea",
      required: true,
      placeholder: "Cuéntame sobre tu idea, proyecto o colaboración",
    },
  ];

  return `
    <section class="mt-8" aria-label="Contacto">
      <h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--soft)]">
        Contacto
      </h2>

      <div class="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-6">
        <h3 class="text-base font-semibold text-[var(--text)]">¿Tienes una idea? Conversemos.</h3>

        <p class="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Si estás pensando en construir una aplicación, producto digital o herramienta y buscas
          un desarrollador para llevarla a la realidad, cuéntame sobre ella.
        </p>

        <div
          data-fs-success
          aria-live="polite"
          class="mt-5 hidden items-center gap-2 rounded-xl border border-[rgb(var(--success-rgb)/0.3)] bg-[rgb(var(--success-rgb)/0.12)] px-4 py-3 text-sm text-[var(--success)] data-[fs-active]:flex"
        >
          ¡Gracias por tu mensaje! Te responderé pronto.
        </div>

        <div
          data-fs-error
          aria-live="polite"
          class="mt-5 hidden items-center gap-2 rounded-xl border border-[rgb(var(--danger-rgb)/0.3)] bg-[rgb(var(--danger-rgb)/0.12)] px-4 py-3 text-sm text-[var(--danger)] data-[fs-active]:flex"
        >
          Ocurrió un error al enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.
        </div>

        <form id="contact-form" class="mt-5 flex flex-col gap-4">
          ${fields.map((field) => renderContactField(field)).join("")}

          <button
            type="submit"
            data-fs-submit-btn
            class="group mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#6d28d9] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <span class="group-disabled:hidden">Enviar mensaje</span>

            <span class="hidden items-center gap-2 group-disabled:inline-flex" aria-hidden="true">
              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Enviando...
            </span>
          </button>
        </form>
      </div>

      <div class="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-center shadow-[0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-6">
        <p class="text-sm text-[var(--muted)]">¿Prefieres algo más directo?</p>

        <a
          href="${whatsappContactUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-hover)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[#25d366]/40 sm:w-auto"
        >
          <span class="text-[#25d366] [&_svg]:h-4 [&_svg]:w-4">${renderBrandIcon(siWhatsapp)}</span>
          Hablar por WhatsApp
        </a>
      </div>
    </section>
  `;
}

function init() {
  initForm({
    formElement: "#contact-form",
    formId: contact.formspreeId,
    useDefaultStyles: false,
  });
}

export default { render, init };
