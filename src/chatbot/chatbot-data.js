import { socialLinks } from "../data/social-links.js";
import { links } from "../data/links.js";

function findUrl(list, predicate) {
  return list.find(predicate)?.url;
}

const whatsappUrl = findUrl(socialLinks, (item) => item.name === "WhatsApp");
const githubUrl = findUrl(socialLinks, (item) => item.name === "GitHub");
const instagramUrl = findUrl(socialLinks, (item) => item.name === "Instagram");
const websiteUrl = findUrl(links, (item) => item.title === "tequia.dev");

const contactLinks = whatsappUrl ? [{ label: "Escribir por WhatsApp", url: whatsappUrl }] : [];

// Preguntas mostradas como botones al abrir el chat.
export const openingQuickReplies = [
  "¿Qué hace Jhon?",
  "¿Qué tecnologías utiliza?",
  "¿Qué proyectos está construyendo?",
  "¿Cómo puedo contactarlo?",
];

// Sugerencias mostradas cuando no se reconoce la pregunta.
export const fallbackQuickReplies = ["¿Qué tecnologías utiliza?", "¿Qué proyectos tiene?", "¿Qué hace Jhon?"];

export const fallbackResponse = {
  id: "fallback",
  text: "No estoy seguro de cómo responder eso todavía. Puedes preguntarme sobre los proyectos, experiencia, tecnologías, servicios o formas de contacto de Jhon.",
  links: [],
  quickReplies: fallbackQuickReplies,
};

// Cada intent define palabras/frases clave y una respuesta fija.
// `links` (opcional) se muestra como chips debajo del mensaje.
// `quickReplies` (opcional) sugiere preguntas de seguimiento.
export const intents = [
  {
    id: "is_jhon",
    keywords: ["eres jhon", "tu eres jhon", "eres tu jhon", "eres un bot", "eres una ia", "eres real", "quien eres"],
    response: "No, soy el asistente virtual de Jhon. Estoy aquí para ayudarte a conocer su trabajo, proyectos y servicios.",
  },
  {
    id: "greeting",
    keywords: ["hola", "hey", "buenas", "hi", "hello", "saludos", "que tal", "buenos dias", "buenas tardes", "buenas noches"],
    response: "¡Hola! Soy el asistente de Jhon. Pregúntame sobre sus proyectos, experiencia, tecnologías o formas de contacto.",
    quickReplies: openingQuickReplies,
  },
  {
    id: "about",
    keywords: [
      "que hace jhon",
      "a que se dedica",
      "quien es jhon",
      "sobre jhon",
      "que haces",
      "a que te dedicas",
      "presentate",
    ],
    response:
      "Jhon es desarrollador de software y constructor de productos digitales. Trabaja principalmente con PHP y Laravel, con experiencia en aplicaciones web, sistemas empresariales, APIs y arquitecturas modulares.",
  },
  {
    id: "skills",
    keywords: ["tecnologia", "tecnologias", "stack", "lenguajes", "herramientas", "con que trabaja", "con que programa", "que usa"],
    response:
      "Jhon trabaja principalmente con PHP y Laravel. También usa Livewire, Filament, Tailwind CSS, JavaScript, MySQL, PostgreSQL, Docker y Git.",
  },
  {
    id: "laravel",
    keywords: ["laravel"],
    response:
      "Sí, Laravel es su framework principal. Lo combina con Livewire y Filament para construir aplicaciones y sistemas empresariales completos.",
  },
  {
    id: "experience",
    keywords: ["experiencia", "donde ha trabajado", "trabajo previo", "empresa", "operacion sistemica"],
    response:
      "Jhon trabajó como desarrollador Full Stack Laravel en Operación Sistémica S.A.S., participando en el diseño, desarrollo y evolución de un ERP empresarial modular construido con Laravel, Filament y MySQL. Sus responsabilidades incluyeron desarrollo de módulos de negocio, APIs, integraciones externas y arquitectura modular.",
  },
  {
    id: "education",
    keywords: ["estudios", "formacion academica", "educacion", "sena", "ingles", "donde estudio"],
    response:
      "Jhon es Tecnólogo en Análisis y Desarrollo de Software por el SENA. Actualmente también estudia inglés en Smart Academy, en un programa que va desde nivel A1 hasta C1.",
  },
  {
    id: "atlas",
    keywords: ["atlas"],
    response:
      "Atlas es una plataforma base orientada a construir sistemas modulares y altamente extensibles. Funciona como base tecnológica para distintos productos, con foco en arquitectura modular, extensibilidad, reutilización, multi-tenancy y sistemas empresariales.",
  },
  {
    id: "cronosena",
    keywords: ["cronosena", "crono sena"],
    response:
      "CronoSENA es una plataforma orientada a la gestión académica y administrativa de instituciones de formación técnica. Está construida sobre Atlas como plataforma base, y uno de sus primeros objetivos es un MVP de gestión documental y articulación con educación media.",
  },
  {
    id: "projects",
    keywords: ["proyectos", "que construye", "en que trabaja", "que esta construyendo", "que esta creando"],
    response:
      "Actualmente Jhon está construyendo Atlas, una plataforma base modular, y CronoSENA, un sistema de gestión académica y administrativa para instituciones de formación.",
    quickReplies: ["Cuéntame de Atlas", "¿Qué es CronoSENA?"],
  },
  {
    id: "services",
    keywords: ["servicios", "que ofrece", "en que puede ayudar", "que puedes hacer", "que puede hacer"],
    response:
      "Jhon puede ayudar con desarrollo de aplicaciones web, desarrollo con Laravel, APIs, sistemas empresariales, ERPs, arquitectura modular, integración de servicios, MVPs y automatización de procesos.",
    quickReplies: ["¿Cómo puedo contactarlo?"],
  },
  {
    id: "availability",
    keywords: ["disponible", "disponibilidad", "cuando puede empezar", "tiene tiempo"],
    response: "No tengo información sobre su disponibilidad actual. Puedes contactarlo directamente para consultarlo.",
    links: contactLinks,
  },
  {
    id: "contact",
    keywords: [
      "contacto",
      "contactar",
      "como te contacto",
      "como lo contacto",
      "hablar con jhon",
      "contratar",
      "contratarlo",
      "cotizar",
      "presupuesto",
      "precio",
    ],
    response: "Puedes contactarme directamente para hablar sobre tu proyecto y revisar cómo puedo ayudarte.",
    links: contactLinks,
  },
  {
    id: "github",
    keywords: ["github", "repositorio", "repositorios", "codigo"],
    response: "Puedes encontrar sus proyectos en GitHub.",
    links: githubUrl ? [{ label: "Ver GitHub", url: githubUrl }] : [],
  },
  {
    id: "instagram",
    keywords: ["instagram"],
    response: "Puedes seguir su contenido en Instagram.",
    links: instagramUrl ? [{ label: "Ver Instagram", url: instagramUrl }] : [],
  },
  {
    id: "website",
    keywords: ["sitio web", "pagina web", "tequia.dev", "web principal"],
    response: "Su sitio principal es tequia.dev.",
    links: websiteUrl ? [{ label: "Visitar tequia.dev", url: websiteUrl }] : [],
  },
  {
    id: "thanks",
    keywords: ["gracias", "thank you", "thanks", "muchas gracias"],
    response: "¡De nada! Si quieres saber algo más sobre Jhon, aquí estoy.",
  },
];
