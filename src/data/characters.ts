/**
 * The two partners as one on-site character: a single figure of Oriol and Ian
 * together for the hero, and one face crop for the chat. The chat speaks for
 * both of them.
 */

export type Character = {
  id: string;
  name: string;
  role: { es: string; en: string };
  /** Full-length cut-out with transparent background. */
  figure: string;
  figureSize: { width: number; height: number };
  /** Square crop of both faces, for the chat. */
  face: string;
};

export const duo: Character = {
  id: "duo",
  name: "Oriol e Ian",
  role: { es: "Socios · Diseño y desarrollo", en: "Partners · Design & development" },
  figure: "/team/duo.webp",
  figureSize: { width: 760, height: 1172 },
  face: "/team/duo-face.webp",
};

/** Characters currently on the site. */
export const characters: Character[] = [duo];
