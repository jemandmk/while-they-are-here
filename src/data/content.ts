import type { HowToItem, ReminderCopy, TabId, TimeOfDay } from "../types";

/** The three top-level tabs, in display order. */
export const TABS: ReadonlyArray<{ readonly id: TabId; readonly label: string }> = [
  { id: "reminder", label: "The Reminder" },
  { id: "idea", label: "The Idea" },
  { id: "letter", label: "The Open Letter" },
];

/** Copy for "The Reminder", split by time of day. */
export const REMINDER_COPY: Readonly<Record<TimeOfDay, ReminderCopy>> = {
  day: {
    eyebrow: "Morning · Present tense",
    title: "Don't take today for granted.",
    body: "We don't save our best words, our deepest attention, or our archival efforts for a funeral. We deploy them now — in real time — while the people we love are still here to hear them. Today is ordinary. That's exactly why it matters.",
    inputLabel: "Name one person you'll pay attention to today.",
    inputPlaceholder: "Their name, and what you'll notice…",
    actionLabel: "Set today's intention",
  },
  night: {
    eyebrow: "Evening · Before sleep",
    title: "Pause. Appreciate yourself.",
    body: "Before you close your eyes, give yourself one minute. You showed up today — that's enough. Now name one small, ordinary thing from today you're grateful for: a sound, a face, a moment you almost let pass by.",
    inputLabel: "What are you grateful for tonight?",
    inputPlaceholder: "One small, ordinary thing…",
    actionLabel: "Log tonight's gratitude",
  },
};

/** The central reframe for "The Idea" tab. */
export const IDEA_HEADLINE =
  "Today may not be as good — but seeking discomfort changes perspective. The brain can be taught.";

export const IDEA_INTRO =
  "Memory doesn't work the way we think it does. Smell bypasses logic entirely and lands straight in the emotional centers of the brain. The exact pitch of a laugh fades faster than a face. The drag of familiar footsteps down a hall holds more weight than any photograph. None of that gets captured by default — it has to be sought out, on purpose, especially on the days it feels easiest to look away.";

/** Practical, accordion-style "how-to's" derived from the workbook's protocols. */
export const HOW_TOS: ReadonlyArray<HowToItem> = [
  {
    id: "ambient",
    title: "Record the room, not the moment",
    body: "Place your phone face down in the middle of an active, ordinary scene — the dinner table, the kitchen, the car. Don't prompt anyone. Let the clinking, the half-sentences, and the silences record themselves.",
  },
  {
    id: "anti-aesthetic",
    title: "Resist the urge to polish",
    body: "No ring lights, no filters, no staged angles. A wobbly, handheld, slightly-too-long clip of someone making coffee will mean more in ten years than a perfectly composed photo means today.",
  },
  {
    id: "senses",
    title: "Chase the senses you'll lose first",
    body: "Smell can't be recorded — so capture the environment around it instead. Voice fades faster than a face — so keep the verbal tics, not just the words. Habits and routines hold more emotional currency than any pose.",
  },
  {
    id: "weekly-rhythm",
    title: "Give yourself a weekly rhythm",
    body: "Monday: capture something raw and unedited. Wednesday: notice why a small detail moves you. Friday: do one small, actionable thing with someone you love — something simple enough to finish in five minutes.",
  },
  {
    id: "discomfort",
    title: "Do the uncomfortable thing on purpose",
    body: "Call instead of texting. Sit in silence for two full minutes without reaching for your phone. Bring up the unresolved thing first, and don't defend yourself. Ask for the hard story, and don't let the first 'no' end it.",
  },
];

/** Subject line used when composing the "Email to Me" open letter. */
export const OPEN_LETTER_SUBJECT = "An Open Letter — While They're Here";

/** Static framing copy that wraps the user's own words in the emailed letter. */
export const OPEN_LETTER_INTRO =
  "A few words I wrote to myself, while they were still here to matter:";

export const OPEN_LETTER_OUTRO =
  "— Written and sent to myself, on While They're Here.";
