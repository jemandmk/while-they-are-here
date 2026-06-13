import type {
  ChecklistItem,
  Pillar,
  ReflectionPrompt,
  SensoryAnchor,
  WeeklyBeat,
} from "../types";

/** Content pillars (SOP §1). */
export const PILLARS: ReadonlyArray<{
  readonly num: string;
  readonly name: Pillar;
  readonly body: string;
}> = [
  {
    num: "01",
    name: "Life Appreciation",
    body: "Active, present-tense gratitude. Moving the conversation from retrospective grief to proactive documentation, and immediate, actionable engagement.",
  },
  {
    num: "02",
    name: "Simple Things",
    body: "Sensory mapping. Hyper-focusing on the minute details — structural sounds, ambient backgrounds, physical micro-habits, and uncurated environmental textures.",
  },
  {
    num: "03",
    name: "Raw Stories",
    body: "Radical authenticity. Zero over-production. Archival aesthetics over pristine ones — no sterile lighting, no heavily staged scenes.",
  },
];

/** The three sensory anchors of the "Core Dichotomy of Human Sensory Loss" (SOP §2). */
export const SENSORY_ANCHORS: ReadonlyArray<SensoryAnchor> = [
  {
    id: "olfactory",
    label: "The Olfactory Anchor",
    kicker: "Smell · un-digitizable",
    title: "The Olfactory Anchor — Smell",
    body: "The strongest emotional trigger, yet entirely un-digitizable. You cannot record it, so preserve the environment around it: the kitchen on a Sunday, the coat that still holds their day. Capture the room before it disappears.",
    position: { leftPct: 22, topPct: 40 },
  },
  {
    id: "voice",
    label: "The Vanishing Voice",
    kicker: "Sound · fades fastest",
    title: "The Vanishing Voice — Sound",
    body: "The exact pitch of a laugh, a verbal tic, the cadence of speech — these fade far faster than a face. Protocol Alpha: lay the phone face-down in the middle of the table and let the chatter, the clinking, the unprompted pauses record themselves.",
    position: { leftPct: 52, topPct: 62 },
  },
  {
    id: "texture",
    label: "The Mundane Texture",
    kicker: "Habit · emotional currency",
    title: "The Mundane Texture — Habit",
    body: "The heavy drag of footsteps, the specific ritual of making morning coffee. Micro-habits hold more emotional currency than any curated pose. Film the movement, not the portrait.",
    position: { leftPct: 80, topPct: 38 },
  },
];

/** The Standard Weekly Production Engine (SOP §3). */
export const WEEKLY_BEATS: ReadonlyArray<WeeklyBeat> = [
  {
    id: "spark",
    day: "Monday",
    vehicle: "The Spark",
    pillar: "Raw Stories",
    concept:
      "Deliver an unedited, deeply human, relatable artifact — an old voice note, a handwritten recipe, a closeup of something already worn by use.",
    directive:
      "Minimal editing. No smooth filters or graphic intros. Let the native sound design pull the weight.",
  },
  {
    id: "science",
    day: "Wednesday",
    vehicle: "The Science",
    pillar: "Simple Things",
    concept:
      "Deconstruct the cognitive science behind why we miss specific elements — like the olfactory highway that routes smell straight to memory.",
    directive:
      "Direct-to-camera delivery or deep text carousels. The hook must challenge a normal assumption.",
  },
  {
    id: "ritual",
    day: "Friday",
    vehicle: "The Ritual",
    pillar: "Life Appreciation",
    concept:
      "Provide a specific, actionable weekend assignment to execute with loved ones — simple enough for anyone to do in five minutes.",
    directive:
      "Urgent, encouraging, clear call-to-action. High visual focus on actual execution.",
  },
];

/** Archive Assignment prompts for the roulette (SOP §3–4 field directives). */
export const REFLECTION_PROMPTS: ReadonlyArray<ReflectionPrompt> = [
  { id: "r01", pillar: "Life Appreciation", text: "Look at your partner's or parent's hands doing something they always do today. Capture the movement — not the pose." },
  { id: "r02", pillar: "Simple Things", text: "Place your phone face-down on the dinner table tonight. Record five minutes of nothing in particular: the clinking, the half-sentences, the silence." },
  { id: "r03", pillar: "Raw Stories", text: "Ask the oldest person you love about a smell from their childhood home. Don't film their face — film them remembering." },
  { id: "r04", pillar: "Life Appreciation", text: "Record a 60-second voice memo of someone making coffee. Keep the background chaos. Send it to no one — just keep it." },
  { id: "r05", pillar: "Simple Things", text: "Capture the exact sound of your front door opening when they come home. You'll forget it faster than you think." },
  { id: "r06", pillar: "Raw Stories", text: "Find a recipe written in their handwriting. Film your finger following the lines as you read it aloud." },
  { id: "r07", pillar: "Life Appreciation", text: "Catch the specific way they say your name. One take, unprompted, in the middle of an ordinary sentence." },
  { id: "r08", pillar: "Simple Things", text: "Film the worn spot — the chair, the mug, the stair they always take two at a time. Let the object tell the story." },
  { id: "r09", pillar: "Raw Stories", text: "Sit beside them, not across. Ask about a 'lost' memory no one talks about anymore. Let the pauses stay in." },
  { id: "r10", pillar: "Life Appreciation", text: "Record the drag of their footsteps down the hall. Tomorrow it's just a sound; in a decade it's the whole house." },
];

/** Reusable Production Execution Checklist (SOP §5). */
export const CHECKLIST: ReadonlyArray<ChecklistItem> = [
  { id: "pillar", label: "Pillar Verification", description: "Does this explicitly hit Life Appreciation, Simple Things, or Raw Stories?" },
  { id: "sensory", label: "Sensory Check", description: "Does it highlight a real sensory anchor — sound, smell, touch, a habit — not a general concept?" },
  { id: "overload", label: "Production Overload", description: "Is the editing stripped back enough to feel like found footage, not an ad?" },
  { id: "actionability", label: "Actionability Metric", description: "Could an average person execute this in 5 minutes this weekend?" },
];
