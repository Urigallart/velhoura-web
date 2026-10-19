/** How a client project runs, start to finish. Rendered as a scroll-linked track. */

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Escuchamos",
    body: "Hablamos de tu negocio, tus clientes y lo que quieres conseguir. Antes de proponer nada, entendemos dónde estás.",
  },
  {
    index: "02",
    title: "Proponemos",
    body: "Te enviamos un plan por escrito: qué haremos, en qué orden y cuánto cuesta. Sin letra pequeña.",
  },
  {
    index: "03",
    title: "Construimos",
    body: "Diseñamos y desarrollamos por etapas. Ves cada avance y lo revisamos juntos antes de seguir.",
  },
  {
    index: "04",
    title: "Lanzamos y mejoramos",
    body: "Publicamos, medimos cómo responde la gente y ajustamos lo necesario para que siga dando resultado.",
  },
];
