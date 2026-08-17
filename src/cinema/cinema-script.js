// Guion del modo cine: capítulos que narran la historia de Jhon mientras
// suena la música. Reutiliza los datos reales del portafolio (perfil,
// proyectos, contacto) en vez de duplicarlos; el resto de la prosa
// (trayectoria, formación, cierre) es texto curado nuevo con voz de
// narrador, distinta de las respuestas utilitarias del chatbot.
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { contact } from "../data/contact.js";
import { socialLinks } from "../data/social-links.js";

const whatsappUrl = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`;
const githubUrl = socialLinks.find((item) => item.name === "GitHub")?.url;

const introChapter = {
  id: "intro",
  kind: "intro",
  expression: "curious",
  pose: "center",
  kicker: "",
  title: "Bienvenido a la historia de",
  body: profile.name,
  duration: 4600,
};

const roleChapter = {
  id: "role",
  kind: "fact",
  expression: "proud",
  pose: "center",
  kicker: "Quién es",
  title: profile.name,
  body: profile.role,
  duration: 5200,
};

const missionChapter = {
  id: "mission",
  kind: "fact",
  expression: "thoughtful",
  pose: "center",
  kicker: "Su misión",
  title: "Construir con propósito",
  body: profile.description,
  duration: 6400,
};

const experienceChapter = {
  id: "experience",
  kind: "fact",
  expression: "focused",
  pose: "center",
  kicker: "Su trayectoria",
  title: "Operación Sistémica S.A.S.",
  body: "Como desarrollador Full Stack Laravel, diseñó y evolucionó un ERP empresarial modular: módulos de negocio, APIs e integraciones construidas con Laravel, Filament y MySQL.",
  duration: 6800,
};

const educationChapter = {
  id: "education",
  kind: "fact",
  expression: "graduate",
  pose: "center",
  kicker: "Su formación",
  title: "Tecnólogo en Análisis y Desarrollo de Software",
  body: "Formado en el SENA. Hoy también estudia inglés en Smart Academy, avanzando de nivel A1 hacia C1.",
  duration: 6200,
};

const skillsChapter = {
  id: "skills",
  kind: "skills",
  expression: "energetic",
  pose: "center",
  kicker: "Su stack",
  title: "Las herramientas de siempre",
  body: "PHP y Laravel como base, acompañados de Livewire, Filament, Tailwind CSS, JavaScript, MySQL, PostgreSQL, Docker y Git.",
  chips: ["PHP", "Laravel", "Livewire", "Filament", "Tailwind CSS", "JavaScript", "MySQL", "PostgreSQL", "Docker", "Git"],
  duration: 6600,
};

const projectChapters = projects.map((project, index) => ({
  id: `project-${project.title.toLowerCase()}`,
  kind: "project",
  expression: project.url ? "presenting" : "building",
  pose: index % 2 === 0 ? "corner-left" : "corner-right",
  kicker: project.featured ? "Proyecto destacado" : "Proyecto",
  title: project.title,
  body: project.description,
  project,
  duration: 6600,
}));

const closingChapter = {
  id: "closing",
  kind: "outro",
  expression: "friendly",
  pose: "center",
  kicker: "¿Y ahora?",
  title: "¿Construimos algo juntos?",
  body: "Si tienes una idea, un proyecto o simplemente quieres saludar, Jhon está a un mensaje de distancia.",
  ctas: [
    whatsappUrl ? { label: "Escribir por WhatsApp", url: whatsappUrl } : null,
    githubUrl ? { label: "Ver GitHub", url: githubUrl } : null,
  ].filter(Boolean),
  duration: 7200,
};

// Se reproduce una sola vez por sesión (incluye la apertura).
export const openingScript = [
  introChapter,
  roleChapter,
  missionChapter,
  experienceChapter,
  educationChapter,
  skillsChapter,
  ...projectChapters,
  closingChapter,
];

// Mientras la música siga sonando, el modo cine repite este bucle
// (sin repetir la apertura) hasta que se pause.
export const loopScript = [
  roleChapter,
  missionChapter,
  experienceChapter,
  educationChapter,
  skillsChapter,
  ...projectChapters,
  closingChapter,
];
