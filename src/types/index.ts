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

/**
 * A high-friction "Seek Discomfort" assignment. Extends ReflectionPrompt so it
 * stays compatible with `usePromptRoulette`, and adds the explicit line of
 * internal resistance the user is being asked to lean into.
 */
export interface DiscomfortPrompt extends ReflectionPrompt {
  /** The honest, named resistance — what makes this one hard to start. */
  readonly friction: string;
}

/** Which prompt pool the roulette is currently drawing from. */
export type RouletteMode = "standard" | "discomfort";

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

/** Playback state for the sensory audio engine. */
export type AudioStatus = "idle" | "playing";
