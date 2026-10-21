/**
 * Opens the contact modal from anywhere in the tree without prop-drilling or
 * a context provider — `ContactModal` mounts once in the root layout and
 * listens for this event. A plain DOM CustomEvent is enough for a single
 * global on/off switch; reaching for a state library would be overkill here.
 */
const OPEN_EVENT = "velhoura:open-contact-modal";

/** Optional starting values for the form, for openers that know the context. */
export type ContactPrefill = {
  projectType?: string;
  message?: string;
  /**
   * Which form to show — a plan or a service (see `data/formTopics.ts`).
   * Without one the general project questionnaire opens.
   */
  topic?: string;
};

/** Opens the form for one plan or service. */
export function openContactTopic(topic: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { topic } }));
}

/**
 * Takes no arguments on purpose: it is handed straight to `onClick` in
 * several places, and the click event must not be mistaken for a prefill.
 */
export function openContactModal() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function openContactModalWith(prefill: ContactPrefill) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: prefill }));
}

export function onOpenContactModal(
  handler: (prefill?: ContactPrefill) => void,
): () => void {
  const listener = (e: Event) =>
    handler((e as CustomEvent<ContactPrefill | undefined>).detail ?? undefined);
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}
