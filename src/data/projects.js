import { siPhp, siLaravel, siFilament, siLivewire, siTailwindcss } from "simple-icons";

// Proyectos mostrados en la sección de projects.
// Para agregar un proyecto nuevo, agrega un objeto a este arreglo con al
// menos { title, description, technologies }. `url` es opcional (si es
// null/omitido, la tarjeta no enlaza a ningún sitio). `technologies` es un
// arreglo de { name, icon } usando iconos de simple-icons. `featured: true`
// destaca visualmente la tarjeta.
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
      { name: "Tailwind", icon: siTailwindcss },
    ],
    featured: true,
  },
  {
    title: "Atlas",
    description:
      "Plataforma modular que sirve como base para mis proyectos, ideas y herramientas.",
    url: null,
    technologies: [
      { name: "PHP", icon: siPhp },
      { name: "Laravel", icon: siLaravel },
    ],
  },
];
