/** The two founders. */

export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Two-letter monogram used in place of a photo until one exists. */
  monogram: string;
  /** Personal site/portfolio, if there is one. */
  href?: string;
};

export const team: Member[] = [
  {
    id: "founder-01",
    name: "Oriol Gallart",
    role: "Full Stack Developer",
    bio: "Desarrollo full stack de principio a fin — frontend y backend, diseño de interfaz y la arquitectura que lo sostiene. Actualmente ampliando formación con un Máster en IA y Big Data.",
    monogram: "OG",
    href: "https://oriolgallart.vercel.app/",
  },
  {
    id: "founder-02",
    name: "Ian Monfil",
    role: "Fullstack Developer",
    bio: "De reparar hardware a construir producto: sistemas y redes primero, después desarrollo fullstack con React y Next.js en producción en Worldline. Actualmente cursando Ingeniería Informática en Tecnocampus mientras cofunda y desarrolla Velhoura.",
    monogram: "IM",
    href: "https://portfolio-delta-mauve-61.vercel.app/",
  },
];
