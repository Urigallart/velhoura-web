// Prints a fresh payment code for a client, e.g. VH-7K3P-Q9.
// Put it in the Stripe product's metadata as `code` (see src/lib/payments.ts).
// No 0/O or 1/I/L, so it can be read out over the phone without mistakes.
import { randomInt } from "node:crypto";

const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const pick = (n) => Array.from({ length: n }, () => alphabet[randomInt(alphabet.length)]).join("");
console.log(`VH-${pick(4)}-${pick(2)}`);
