/**
 * ⚠ PENDING — social proof. Everything here must be real: actual clients,
 * actual numbers, actual reviews (with permission to quote them).
 *
 * Every list starts empty on purpose, and `ProofSection` renders nothing at
 * all until at least one entry exists. Fill an array and its block appears.
 */

export type Result = {
  /** The figure, as it should read: "+40 %", "#1", "3×". */
  value: string;
  /** What it measures, in one line. */
  label: string;
  client: string;
};

export type Review = {
  quote: string;
  author: string;
  /** Business or role, optional. */
  role?: string;
  /** Link to the original review (Google, etc.), optional. */
  href?: string;
};

/** Businesses that have worked with the studio, by name. */
export const clients: string[] = [];

export const results: Result[] = [];

export const reviews: Review[] = [];

export const hasProof =
  clients.length > 0 || results.length > 0 || reviews.length > 0;
