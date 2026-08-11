import { siWhatsapp, siGithub } from "simple-icons";

// Enlaces mostrados en la sección de links.
// Para agregar un enlace nuevo, agrega un objeto a este arreglo con al
// menos { title, url }. `icon` es opcional (usa un icono de simple-icons);
// sin `icon` se muestra la inicial del título. `featured: true` usa la
// tarjeta destacada en vez de una tarjeta estándar.
export const links = [
  {
    title: "Instagram",
    description: "Sígueme y conoce lo que estoy construyendo",
    url: "https://instagram.com/tequia.dev",
    featured: true,
  },
  {
    title: "WhatsApp",
    url: "https://wa.me/573248213023",
    icon: siWhatsapp,
  },
  {
    title: "tequia.dev",
    url: "https://tequia.dev",
  },
  {
    title: "GitHub",
    url: "https://github.com/xenthrall",
    icon: siGithub,
  },
];
