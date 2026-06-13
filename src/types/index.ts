/**
 * Domain types for "While They're Here".
 *
 * These are the single source of truth for every interactive data state in the
 * app. `any` is never permitted; prefer string-literal unions and `readonly`
 * structures so content data cannot be mutated at runtime.
 */

/** The three foundational content pillars from the SOP. */
export type Pillar = "Life Appreciation" | "Simple Things" | "Raw Stories";

/** The three sensory anchors of the "Core Dichotomy of Human Sensory Loss". */
export type SensoryAnchorId = "olfactory" | "voice" | "texture";

export interface SensoryAnchor {
  readonly id: SensoryAnchorId;
  /** Human-facing node label, e.g. "The Olfactory Anchor". */
  readonly label: string;
  /** Short kicker beneath the label, e.g. "Smell · un-digitizable". */
  readonly kicker: string;
  /** Title shown in the readout when active. */
  readonly title: string;
  /** Body copy drawn from the brand manual. */
  readonly body: string;
  /** Absolute position of the floating node on the desktop stage (%). */
  readonly position: { readonly leftPct: number; readonly topPct: number };
}

/** A single "Archive Assignment" reflection for the roulette. */
export interface ReflectionPrompt {
  readonly id: string;
  readonly pillar: Pillar;
  readonly text: string;
}

/** One row of the Reusable Production Execution Checklist (SOP §5). */
export interface ChecklistItem {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

/** A single beat of the Standard Weekly Production Engine. */
export interface WeeklyBeat {
  readonly id: "spark" | "science" | "ritual";
  readonly day: "Monday" | "Wednesday" | "Friday";
  readonly vehicle: string;
  readonly pillar: Pillar;
  readonly concept: string;
  readonly directive: string;
}

/** A preview "Human Check-In" push notification. */
export interface Nudge {
  readonly title: string;
  readonly body: string;
}

/** Contact method for the Daily Reminder subscription. */
export type ContactMethod = "email" | "phone";

/** Finite states for the subscription form (no boolean soup). */
export type SubscriptionStatus =
  | { readonly kind: "idle" }
  | { readonly kind: "invalid"; readonly message: string }
  | { readonly kind: "subscribed"; readonly contact: string };

/** Playback state for the sensory audio engine. */
export type AudioStatus = "idle" | "playing";
