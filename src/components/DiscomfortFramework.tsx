/* eslint-disable react-refresh/only-export-components -- data/content module, no components exported. */
import type { DiscomfortPrompt } from "../types";

/**
 * The Seek Discomfort Framework — the "content pool" for high-vulnerability,
 * high-friction assignments.
 *
 * These are deliberately heavier than the standard Archive Assignments: they
 * trade the safe, five-minute capture for the awkward, terrifying, real one.
 * Each prompt names its own resistance so the UI can say the quiet part out
 * loud — growth lives on the other side of the discomfort.
 */
export const DISCOMFORT_PROMPTS: ReadonlyArray<DiscomfortPrompt> = [
  {
    id: "d01",
    pillar: "Raw Stories",
    text: "Call them right now. No text warning. Ask them: “What is one thing you think I don’t understand about your life?” Sit with the silence that follows.",
    friction: "It feels easier to text first. Don’t. Let the call be unannounced.",
  },
  {
    id: "d02",
    pillar: "Simple Things",
    text: "Sit with them in absolute silence for 2 full minutes without looking at your phone. Observe the rhythm of their breathing.",
    friction: "Two minutes of silence will feel like an hour. Let it.",
  },
  {
    id: "d03",
    pillar: "Life Appreciation",
    text: "Apologize for that specific, unresolved tension from three years ago. Bring it up first. Don’t defend yourself.",
    friction: "Every instinct will tell you to explain your side. Resist it.",
  },
  {
    id: "d04",
    pillar: "Raw Stories",
    text: "Ask to record them telling the story of the hardest year they ever lived through. Push past the initial “Oh, nobody wants to hear that” excuse.",
    friction: "They’ll deflect first. The real story is on the other side of the deflection.",
  },
];

/** Micro-copy for the Courage Commitment gate shown before a prompt is revealed. */
export const COURAGE_COMMITMENT = {
  kicker: "Courage Commitment",
  line: "Growth lives on the other side of this 2-minute awkward phone call.",
  sub: "This one is meant to feel like too much. That’s the point. Choose the hard path on purpose.",
  accept: "I accept the awkwardness. Show me.",
} as const;

/** The "Seek Discomfort" variant of the daily Human Check-In reminder. */
export const DISCOMFORT_REMINDER = {
  standard: {
    label: "Human Check-In",
    body: "Notice one small thing your person does today — the way they hold a mug, the sound of the door. Capture it before it’s ordinary.",
  },
  discomfort: {
    label: "Human Check-In · Discomfort Mode",
    body: "It feels weird to tell them you love them out of nowhere. Do it anyway. Send the text right now. Let it be awkward.",
  },
} as const;
