/**
 * The studio's two partners as on-site characters. Each has a cut-out figure
 * for the hero and a face for the chat. Add Ian by dropping his images in
 * `public/team/` and filling `ian` in — the hero and the chat pick it up.
 */

export type Character = {
  id: string;
  name: string;
  role: { es: string; en: string };
  /** Full-length cut-out with transparent background. */
  figure: string;
  /** Square head crop for the chat. */
  face: string;
};

export const oriol: Character = {
  id: "oriol",
  name: "Oriol",
  role: { es: "Socio · Diseño y desarrollo", en: "Partner · Design & development" },
  figure: "/team/oriol.webp",
  face: "/team/oriol-face.webp",
};

/** Characters currently on the site. */
export const characters: Character[] = [oriol];
