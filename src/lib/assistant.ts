import type { Locale } from "@/i18n/locale";
import { fallback, topics, type Topic } from "@/data/assistant";

/**
 * Keyword matcher for the on-site assistant. No network, no model: the visitor's
 * message is normalised and scored against each topic's keys, and the best
 * topic answers. Nothing outside `data/assistant.ts` can be said.
 */

const OPEN_EVENT = "velhoura:open-assistant";

/** Opens the chat from anywhere (hero characters, buttons). */
export function openAssistant(persona: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: persona }));
}

export function onOpenAssistant(handler: (persona: string) => void): () => void {
  const listener = (e: Event) => handler(String((e as CustomEvent).detail ?? ""));
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

function normalise(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9€\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type Reply = {
  topic: string | null;
  text: string;
  next: string[];
  contact: boolean;
};

function score(topic: Topic, padded: string, locale: Locale) {
  let total = 0;
  for (const raw of topic.keys[locale]) {
    const key = normalise(raw);
    if (!key) continue;
    // Short keys must be whole words ("app", "ok"); longer ones match a word start.
    const hit =
      key.length <= 3 ? padded.includes(` ${key} `) : padded.includes(` ${key}`);
    if (hit) total += key.length;
  }
  return total;
}

export function answer(message: string, locale: Locale): Reply {
  const padded = ` ${normalise(message)} `;
  let best: Topic | null = null;
  let bestScore = 0;
  for (const topic of topics) {
    const s = score(topic, padded, locale);
    if (s > bestScore) {
      best = topic;
      bestScore = s;
    }
  }
  if (!best) {
    return { topic: null, text: fallback[locale], next: fallback.next, contact: true };
  }
  return {
    topic: best.id,
    text: best.answer[locale],
    next: best.next ?? [],
    contact: Boolean(best.contact),
  };
}

/** Answer for a topic chosen from a quick reply. */
export function answerTopic(id: string, locale: Locale): Reply {
  const topic = topics.find((t) => t.id === id);
  if (!topic) return answer(id, locale);
  return {
    topic: topic.id,
    text: topic.answer[locale],
    next: topic.next ?? [],
    contact: Boolean(topic.contact),
  };
}
