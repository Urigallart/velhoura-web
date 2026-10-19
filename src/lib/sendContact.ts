/**
 * Posts a contact form to `/api/contact`. Shared by the contact modal and the
 * pricing plans' short forms. `openedAt` is when the form was shown: the
 * elapsed time rides along as one of the route's anti-spam checks.
 * Throws with the route's own message (or `fallbackError`) on failure.
 */
export async function sendContact(
  fields: Record<string, unknown>,
  openedAt: number,
  fallbackError: string,
) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, elapsed: Date.now() - openedAt }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? fallbackError);
  }
}
