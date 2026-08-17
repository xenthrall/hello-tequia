import {
  siPhp,
  siLaravel,
  siFilament,
  siLivewire,
  siTailwindcss,
  siReact,
  siTypescript,
  siVite,
  siSupabase,
  siPostgresql,
} from "simple-icons";

// Proyectos mostrados en la sección de projects.
// Cada proyecto requiere { title, description, technologies }.
// `url` es opcional y `featured: true` destaca visualmente el proyecto.
// `technologies` contiene objetos { name, icon } usando Simple Icons.
export const projects = [
  {
    title: "Nexo",
    description: "Plataforma modular para la gestión educativa.",
    url: "https://nexo.tequia.dev/",
    technologies: [
      { name: "PHP", icon: siPhp },
      { name: "Laravel", icon: siLaravel },
      { name: "Filament", icon: siFilament },
      { name: "Livewire", icon: siLivewire },
      { name: "Tailwind CSS", icon: siTailwindcss },
    ],
    featured: true,
  },

  {
    title: "Faro",
    description:
      "Sistema de gestión para pequeños negocios, construido con infraestructura de costo mínimo.",
    url: "https://xenthrall.github.io/faro/public",
    technologies: [
      { name: "React", icon: siReact },
      { name: "TypeScript", icon: siTypescript },
      { name: "Vite", icon: siVite },
      { name: "Supabase", icon: siSupabase },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Tailwind CSS", icon: siTailwindcss },
    ],
    featured: true,
  },

  {
    title: "Atlas",
    description:
      "Plataforma modular que sirve como base para desarrollar proyectos, ideas y herramientas.",
    url: null,
    technologies: [
      { name: "PHP", icon: siPhp },
      { name: "Laravel", icon: siLaravel },
    ],
  },
];